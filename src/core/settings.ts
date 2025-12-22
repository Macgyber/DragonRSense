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
    coordinates: config.get<boolean>("coordinates.enabled", true),
    sizes: config.get<boolean>("coordinates.showSizes", true),
    spritePreview: config.get<boolean>("sprites.hoverPreview", true),
    resourceDiscovery: config.get<boolean>("resources.discovery", true)
  };
}
