import * as vscode from "vscode";
import { getSettings } from "../../core/settings";
import { isDragonRubyFile } from "../../core/dragonruby";
import { t } from "../../i18n";

export function provideCoordinateHover(
  document: vscode.TextDocument,
  position: vscode.Position
): vscode.Hover | undefined {
  const settings = getSettings();

  // Check if features are enabled
  if (!settings.coordinates && !settings.sizes) { return; }

  // Only DragonRuby files
  if (!isDragonRubyFile(document)) { return; }

  const range = document.getWordRangeAtPosition(position);
  if (!range) { return; }

  const word = document.getText(range);

  switch (word) {
    case "x":
      if (!settings.coordinates) { return; }
      return new vscode.Hover(`**x** → ${t('hover.coordinates.x')}`);

    case "y":
      if (!settings.coordinates) { return; }
      return new vscode.Hover(`**y** → ${t('hover.coordinates.y')}`);

    case "w":
      if (!settings.sizes) { return; }
      return new vscode.Hover(`**w** → ${t('hover.coordinates.w')}`);

    case "h":
      if (!settings.sizes) { return; }
      return new vscode.Hover(`**h** → ${t('hover.coordinates.h')}`);

    default:
      return;
  }
}
