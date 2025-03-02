// const { app } = require("electron");
// const { promises: fs } = require("fs");
// const path = require("path");
// const { TotalStorage, defaultConfig, Template } = require("./types");

// export async function ensureConfig(): Promise<{
//   config: typeof TotalStorage;
//   configPath: string;
// }> {
//   // Use the userData directory provided by Electron.
//   const userDataPath = app.getPath("userData");
//   const configDir = path.join(userDataPath, "cxi");
//   const configPath = path.join(configDir, "config.json");

//   // Ensure the config directory exists.
//   try {
//     await fs.access(configDir);
//   } catch (err) {
//     await fs.mkdir(configDir, { recursive: true });
//   }

//   // Check if the config file exists; if not, create it with defaultConfig.
//   try {
//     await fs.access(configPath);
//   } catch (err) {
//     await fs.writeFile(
//       configPath,
//       JSON.stringify(defaultConfig, null, 2),
//       "utf8"
//     );
//   }

//   // Read and return the current configuration.
//   const data = await fs.readFile(configPath, "utf8");
//   const config: typeof TotalStorage = JSON.parse(data);
//   return { config, configPath };
// }

// // Function to read all templates
// export async function readTemplates(
//   configPath: string
// ): Promise<typeof TotalStorage> {
//   const data = await fs.readFile(configPath, "utf8");
//   const config: typeof TotalStorage = JSON.parse(data);
//   return config;
// }

// // Function to add a new template record.
// export async function addTemplate(
//   newTemplate: typeof Template,
//   configPath: string
// ): Promise<(typeof Template)[]> {
//   const data = await fs.readFile(configPath, "utf8");
//   const config: typeof TotalStorage = JSON.parse(data);
//   config.templates.push(newTemplate);
//   await fs.writeFile(configPath, JSON.stringify(config, null, 2), "utf8");
//   return config.templates;
// }

// // Function to edit an existing template record.
// export async function editTemplate(
//   updatedTemplate: typeof Template,
//   configPath: string
// ): Promise<(typeof Template)[]> {
//   const data = await fs.readFile(configPath, "utf8");
//   const config: typeof TotalStorage = JSON.parse(data);
//   const index = config.templates.findIndex(
//     (t: typeof Template) => t.id === updatedTemplate.id
//   );
//   if (index !== -1) {
//     config.templates[index] = updatedTemplate;
//     await fs.writeFile(configPath, JSON.stringify(config, null, 2), "utf8");
//   } else {
//     throw new Error("Template not found");
//   }
//   return config.templates;
// }

// // Function to delete a template record.
// export async function deleteTemplate(
//   templateId: string,
//   configPath: string
// ): Promise<(typeof Template)[]> {
//   const data = await fs.readFile(configPath, "utf8");
//   const config: typeof TotalStorage = JSON.parse(data);
//   config.templates = config.templates.filter(
//     (t: typeof Template) => t.id !== templateId
//   );
//   await fs.writeFile(configPath, JSON.stringify(config, null, 2), "utf8");
//   return config.templates;
// }

// // Function to search for template records based on a search term.
// export async function searchTemplates(
//   searchTerm: string,
//   configPath: string
// ): Promise<(typeof Template)[]> {
//   const data = await fs.readFile(configPath, "utf8");
//   const config: typeof TotalStorage = JSON.parse(data);

//   if (!searchTerm.trim()) {
//     return config.templates;
//   }

//   // Split search term by spaces and join with "|" for OR condition.
//   const tokens = searchTerm.trim().split(/\s+/).filter(Boolean);
//   const pattern = tokens.join("|");
//   const regex = new RegExp(pattern, "i");

//   // Return templates where any of the tokens matches value, title, or description.
//   return config.templates.filter(
//     (template: typeof Template) =>
//       regex.test(template.value) ||
//       regex.test(template.title) ||
//       regex.test(template.description)
//   );
// }

// // Function to search for template records based on a search term.
// export async function getTemplate(
//   id: string,
//   configPath: string
// ): Promise<typeof Template | null> {
//   const data = await fs.readFile(configPath, "utf8");
//   const config: typeof TotalStorage = JSON.parse(data);
//   const template = config.templates.find((t: typeof Template) => t.id === id);
//   return template || null;
// }

// export async function exportTemplates(
//   searchTerm: string,
//   filePath: string,
//   configPath: string
// ) {
//   try {
//     const data = await searchTemplates(searchTerm, configPath);
//     await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
//     return { success: true };
//   } catch (error) {
//     console.error("Error saving JSON file:", error);
//     return { success: false };
//   }
// }

const { app } = require("electron");
const { promises: fs } = require("fs");
const path = require("path");
// const { defaultConfig } = require("./types");

async function ensureConfig() {
  // Use the userData directory provided by Electron.
  const userDataPath = app.getPath("userData");
  const configDir = path.join(userDataPath, "cxi");
  const configPath = path.join(configDir, "config.json");

  // Ensure the config directory exists.
  try {
    await fs.access(configDir);
  } catch (err) {
    await fs.mkdir(configDir, { recursive: true });
  }

  // Check if the config file exists; if not, create it with defaultConfig.
  try {
    await fs.access(configPath);
  } catch (err) {
    await fs.writeFile(
      configPath,
      JSON.stringify({ templates: [] }, null, 2),
      "utf8"
    );
  }

  // Read and return the current configuration.
  const data = await fs.readFile(configPath, "utf8");
  const config = JSON.parse(data);
  return { config, configPath };
}

// Function to read all templates
async function readTemplates(configPath) {
  const data = await fs.readFile(configPath, "utf8");
  const config = JSON.parse(data);
  return config;
}

// Function to add a new template record.
async function addTemplate(newTemplate, configPath) {
  const data = await fs.readFile(configPath, "utf8");
  const config = JSON.parse(data);
  config.templates.unshift(newTemplate);
  await fs.writeFile(configPath, JSON.stringify(config, null, 2), "utf8");
  return config.templates;
}

// Function to edit an existing template record.
async function editTemplate(updatedTemplate, configPath) {
  const data = await fs.readFile(configPath, "utf8");
  const config = JSON.parse(data);
  const index = config.templates.findIndex((t) => t.id === updatedTemplate.id);
  if (index !== -1) {
    config.templates[index] = updatedTemplate;
    await fs.writeFile(configPath, JSON.stringify(config, null, 2), "utf8");
  } else {
    throw new Error("Template not found");
  }
  return config.templates;
}

// Function to delete a template record.
async function deleteTemplate(templateId, configPath) {
  const data = await fs.readFile(configPath, "utf8");
  const config = JSON.parse(data);
  config.templates = config.templates.filter((t) => t.id !== templateId);
  await fs.writeFile(configPath, JSON.stringify(config, null, 2), "utf8");
  return config.templates;
}

// Function to search for template records based on a search term.
async function searchTemplates(searchTerm, configPath) {
  const data = await fs.readFile(configPath, "utf8");
  const config = JSON.parse(data);

  if (!searchTerm.trim()) {
    return config.templates;
  }

  // Split search term by spaces and join with "|" for OR condition.
  const tokens = searchTerm.trim().split(/\s+/).filter(Boolean);
  const pattern = tokens.join("|");
  const regex = new RegExp(pattern, "i");

  // Return templates where any of the tokens matches value, title, or description.
  return config.templates.filter(
    (template) =>
      regex.test(template.value) ||
      regex.test(template.title) ||
      regex.test(template.description)
  );
}

// Function to get a single template record by ID.
async function getTemplate(id, configPath) {
  const data = await fs.readFile(configPath, "utf8");
  const config = JSON.parse(data);
  const template = config.templates.find((t) => t.id === id);
  return template || null;
}

// Function to export templates based on a search term to a file.
async function exportTemplates(searchTerm, filePath, configPath) {
  try {
    const data = await searchTemplates(searchTerm, configPath);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
    return { success: true };
  } catch (error) {
    console.error("Error saving JSON file:", error);
    return { success: false };
  }
}

module.exports = {
  ensureConfig,
  readTemplates,
  addTemplate,
  editTemplate,
  deleteTemplate,
  searchTemplates,
  getTemplate,
  exportTemplates,
};
