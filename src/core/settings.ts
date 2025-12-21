import * as vscode from "vscode";

export interface DragonRSenseSettings {
  coordinates: boolean;
  sizes: boolean;
  spritePreview: boolean;
  resourceDiscovery: boolean;
}

export function getSettings(): DragonRSenseSettings {
  const config = vscode.workspace.getConfiguration("dragonrsense");

  return {
    coordinates: config.get<boolean>("coordinates", true),
    sizes: config.get<boolean>("sizes", true),
    spritePreview: config.get<boolean>("spritePreview", true),
    resourceDiscovery: config.get<boolean>("resourceDiscovery", true)
  };
}
