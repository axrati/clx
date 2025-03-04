const {
  app,
  BrowserWindow,
  ipcMain,
  globalShortcut,
  dialog,
  screen: electronScreen, // alias 'screen' to 'electronScreen'
  Tray,
  Menu,
} = require("electron");
app.disableHardwareAcceleration();
const path = require("path");
const child_process = require("child_process");
const {
  ensureConfig,
  addTemplate,
  editTemplate,
  deleteTemplate,
  readTemplates,
  searchTemplates,
  getTemplate,
  exportTemplates,
} = require("./configManager");

// Prevent multiple instances
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on("second-instance", () => {
    // Focus the main window if a second instance is launched.
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });

  let mainWindow = null;
  let tray = null;
  let globalConfigPath = "";

  function toggleWindowVisibility() {
    if (mainWindow) {
      if (mainWindow.isVisible()) {
        if (process.platform === "win32") {
          mainWindow.minimize();
        }
        mainWindow.hide();
      } else {
        mainWindow.show();
        mainWindow.focus();
      }
    }
  }

  const executeCommand = (code) => {
    if (process.platform === "win32") {
      child_process.exec(`start cmd.exe /K ${code}`);
    } else if (process.platform === "darwin") {
      let subCode = code.replaceAll('"', '\\"');
      child_process.exec(
        `osascript -e 'tell app "Terminal" to do script "${subCode}"'`
      );
    } else if (process.platform === "linux") {
      // This opens gnome-terminal and runs the command in bash.
      child_process.exec(`gnome-terminal -- bash -c '${code}; exec bash'`);
    }
  };

  function getIconPath() {
    let iconName = "";
    if (process.platform === "win32") {
      iconName = path.join(__dirname, "assets", "icons", "icon.ico");
    } else if (process.platform === "darwin") {
      iconName = path.join(__dirname, "assets", "icons", "icon.icns");
    } else {
      // For Linux (LinuxMint, etc.), use PNG.
      iconName = "icon.png";
    }
    return iconName;
  }

  // Creates the system tray icon and context menu.
  function createTray() {
    const trayIconPath = getIconPath();
    tray = new Tray(trayIconPath);

    // Build a simple context menu.
    const contextMenu = Menu.buildFromTemplate([
      { label: "Show App", click: () => mainWindow?.show() },
      { label: "Quit", click: () => app.quit() },
    ]);
    tray.setToolTip("CLX - CLI Commands Library");
    tray.setContextMenu(contextMenu);
  }

  let cycle = [0, 1, 2, 1];
  let cycleIndex = 0;

  function movePosition() {
    if (mainWindow.isVisible()) {
      const { width } = electronScreen.getPrimaryDisplay().workAreaSize;
      const centerPosition = Math.floor((width - 800) / 2);
      const positions = [0, centerPosition, width - 800];
      cycleIndex = (cycleIndex + 1) % cycle.length;
      mainWindow.setPosition(positions[cycle[cycleIndex]], 0);
    }
  }

  const isDev = process.env.NODE_ENV === "development";
  const devURL = "http://localhost:3000";
  const prodURL = `file://${path.join(__dirname, "dist", "index.html")}`;

  app.whenReady().then(async () => {
    // Ensure configuration exists and store the path globally.
    try {
      const { config, configPath } = await ensureConfig();
      globalConfigPath = configPath;
      // console.log("Config loaded or created:", config);
    } catch (err) {
      // console.error("Error ensuring config:", err);
    }

    // Register a global shortcut (Control+\) to toggle window visibility.
    const shortcutRegistered = globalShortcut.register("Control+\\", () => {
      toggleWindowVisibility();
    });
    globalShortcut.register("Control+Shift+\\", () => {
      // console.log("yoo");
      movePosition();
    });

    globalShortcut.register("Control+Shift+F", () => {
      if (mainWindow && mainWindow.isVisible()) {
        // Toggle full screen mode
        // mainWindow.setFullScreen(!mainWindow.isFullScreen());
        if (mainWindow.isFullScreen()) {
          mainWindow.setFullScreen(false);
          const { height } = electronScreen.getPrimaryDisplay().workAreaSize;
          mainWindow.setSize(800, height);
        } else {
          mainWindow.setFullScreen(true);
        }
      }
    });

    // Create the main window.
    const { width, height } = electronScreen.getPrimaryDisplay().workAreaSize;
    mainWindow = new BrowserWindow({
      width: 800,
      height,
      icon: getIconPath(),
      frame: false,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        devTools: true,
        scrollBounce: true,
        sandbox: false,
      },
    });

    mainWindow.setPosition(0, 0);
    // mainWindow.webContents.openDevTools({ mode: "detach" });
    if (isDev) {
      mainWindow.loadURL(devURL);
    } else {
      mainWindow.loadFile(path.join(__dirname, "dist", "index.html"));
    }
    // mainWindow.loadURL(isDev ? devURL : prodURL);
    mainWindow.on("closed", () => {
      mainWindow = null;
    });

    // Create the system tray icon.
    createTray();
  });

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });

  // --- IPC handlers (unchanged) ---
  ipcMain.handle("config:readTemplates", async () => {
    const data = await readTemplates(globalConfigPath);
    return data.templates;
  });

  ipcMain.handle("config:addTemplate", async (event, newTemplate) => {
    const data = await addTemplate(newTemplate, globalConfigPath);
    return data;
  });

  ipcMain.handle("config:editTemplate", async (event, updatedTemplate) => {
    const data = await editTemplate(updatedTemplate, globalConfigPath);
    return data;
  });

  ipcMain.handle("config:deleteTemplate", async (event, templateId) => {
    const data = await deleteTemplate(templateId, globalConfigPath);
    return data;
  });

  ipcMain.handle("config:searchTemplates", async (event, searchTerm) => {
    const data = await searchTemplates(searchTerm, globalConfigPath);
    return data;
  });

  ipcMain.handle("config:getTemplate", async (event, id) => {
    const data = await getTemplate(id, globalConfigPath);
    return data;
  });

  ipcMain.handle("position:move", async () => {
    movePosition();
  });

  ipcMain.handle("config:export", async (event, searchTerm) => {
    const { canceled, filePath } = await dialog.showSaveDialog({
      title: "Save JSON File",
      defaultPath: "data.json",
      filters: [{ name: "JSON Files", extensions: ["json"] }],
    });
    if (canceled || !filePath) {
      return { success: false, canceled: true };
    }
    exportTemplates(searchTerm, filePath, globalConfigPath)
      .then(() => {
        // console.log("Export success");
      })
      .catch(() => {
        // console.log("Export error");
      });
  });
  ipcMain.handle("execute", async (event, cmd) => {
    executeCommand(cmd);
  });
}
