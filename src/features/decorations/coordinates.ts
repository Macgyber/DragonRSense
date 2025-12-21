import * as vscode from "vscode";
import { getSettings } from "../../core/settings";
import { isDragonRubyFile } from "../../core/dragonruby";

// Create decorations once to avoid memory leaks
const positionDecoration = vscode.window.createTextEditorDecorationType({
  before: {
    contentText: "🎯 ",
    color: "#888"
  }
});

const sizeDecoration = vscode.window.createTextEditorDecorationType({
  before: {
    contentText: "📐 ",
    color: "#888"
  }
});

export function applyCoordinateDecorations(editor: vscode.TextEditor) {
  const settings = getSettings();

  // Clear decorations if disabled
  if (!settings.decorations || !settings.coordinates) {
    editor.setDecorations(positionDecoration, []);
    editor.setDecorations(sizeDecoration, []);
    return;
  }

  // Only DragonRuby files
  if (!isDragonRubyFile(editor.document)) {
    editor.setDecorations(positionDecoration, []);
    editor.setDecorations(sizeDecoration, []);
    return;
  }

  const text = editor.document.getText();
  const positionRanges: vscode.DecorationOptions[] = [];
  const sizeRanges: vscode.DecorationOptions[] = [];

  const regex = /\b(x|y|w|h)\b/g;
  let match;

  while ((match = regex.exec(text))) {
    const start = editor.document.positionAt(match.index);
    const range = new vscode.Range(start, start);

    if (match[1] === "x" || match[1] === "y") {
      positionRanges.push({ range });
    } else {
      sizeRanges.push({ range });
    }
  }

  editor.setDecorations(positionDecoration, positionRanges);
  editor.setDecorations(sizeDecoration, sizeRanges);
}

// Cleanup function for when extension is deactivated
export function disposeDecorations() {
  positionDecoration.dispose();
  sizeDecoration.dispose();
}
