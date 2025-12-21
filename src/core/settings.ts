import * as vscode from "vscode";

export interface DragonRSenseSettings {
  coordinates: boolean;
  sizes: boolean;
  spritePreview: boolean;
  decorations: boolean;
}

export function getSettings(): DragonRSenseSettings {
  const config = vscode.workspace.getConfiguration("dragonrsense");

  return {
    coordinates: config.get<boolean>("coordinates", true),
    sizes: config.get<boolean>("sizes", true),
    spritePreview: config.get<boolean>("spritePreview", true),
    decorations: config.get<boolean>("decorations", false)
  };
}
