import * as vscode from "vscode";

export interface DragonRSenseSettings {
  enableCoordinates: boolean;
  enableSizes: boolean;
  enableSpriteHover: boolean;
  enableDecorations: boolean;
}

export function getSettings(): DragonRSenseSettings {
  const config = vscode.workspace.getConfiguration("dragonrsense");

  return {
    enableCoordinates: config.get<boolean>("enableCoordinates", true),
    enableSizes: config.get<boolean>("enableSizes", true),
    enableSpriteHover: config.get<boolean>("enableSpriteHover", false),
    enableDecorations: config.get<boolean>("enableDecorations", false)
  };
}
