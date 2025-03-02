# clx

An app for managing your library of CLI commands. Helpful for managing things like ssh's to different services without having to remember host names/pem paths.

### Running Locally

```
npm install
npm start
```

### Linux Install / Start / Uninstall

```bash
sudo apt update
# Snap install this build output
npm run build-linux
sudo dpkg -i release/clx_1.0.0_amd64.deb
# Create .desktop file for execution - save this at: /usr/share/applications/clx.desktop
[Desktop Entry]
Version=1.0
Type=Application
Name=CLX
Comment=CLX Command Line Utility
Exec=/usr/bin/clx
Icon=/usr/share/icons/hicolor/256x256/apps/clx.png
Terminal=false
Categories=Utility;Application;

# Start
clx

# Uninstall
sudo dpkg -r clx
```

### Windows export

```bash

# Snap install this build output

```
