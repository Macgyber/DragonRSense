import * as vscode from "vscode";
import { getSettings } from "../../core/settings";
import { isDragonRubyFile } from "../../core/dragonruby";

export function provideCoordinateHover(
  document: vscode.TextDocument,
  position: vscode.Position
): vscode.Hover | undefined {
  const settings = getSettings();

  // Check if features are enabled
  if (!settings.enableCoordinates && !settings.enableSizes) {return;}

  // Only DragonRuby files
  if (!isDragonRubyFile(document)) {return;}

  const range = document.getWordRangeAtPosition(position);
  if (!range) {return;}

  const word = document.getText(range);

  switch (word) {
    case "x":
      if (!settings.enableCoordinates) {return;}
      return new vscode.Hover("**x** → Horizontal position (left → right) in DragonRuby");

    case "y":
      if (!settings.enableCoordinates) {return;}
      return new vscode.Hover("**y** → Vertical position (bottom → top) in DragonRuby");

    case "w":
      if (!settings.enableSizes) {return;}
      return new vscode.Hover("**w** → Width of the sprite or element");

    case "h":
      if (!settings.enableSizes) {return;}
      return new vscode.Hover("**h** → Height of the sprite or element");

    default:
      return;
  }
}
