export interface Template {
  id: string; // A unique identifier
  value: string; // A string to be stored. Can be multilined.
  title: string; // A title for the command
  description: string; // A description for the command
}

export interface TotalStorage {
  templates: Template[];
}

// Sample default config data
export const defaultConfig: TotalStorage = {
  templates: [],
};
