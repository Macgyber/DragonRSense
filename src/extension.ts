import { applyCoordinateDecorations } from "./features/decorations/coordinates";
import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log("DragonRSense is active 🐉"
             vscode.window.onDidChangeActiveTextEditor(editor => {
  if (editor) {
    applyCoordinateDecorations(editor);
  }
});

if (vscode.window.activeTextEditor) {
  applyCoordinateDecorations(vscode.window.activeTextEditor);
}
             );

  const hoverProvider = vscode.languages.registerHoverProvider(
    { scheme: "file", language: "ruby" },
    {
   provideHover(document, position) {
  // Only apply to DragonRuby-like files
  const text = document.getText();
  if (!text.includes("args.")) return;

  const range = document.getWordRangeAtPosition(position);
  if (!range) return;

  const word = document.getText(range);

  switch (word) {
    case "x":
      return new vscode.Hover("**x** → Horizontal position (left → right) in DragonRuby");
    case "y":
      return new vscode.Hover("**y** → Vertical position (bottom → top) in DragonRuby");
    case "w":
      return new vscode.Hover("**w** → Width of the sprite or element");
    case "h":
      return new vscode.Hover("**h** → Height of the sprite or element");
        }
      }
    }
  );

  context.subscriptions.push(hoverProvider);
}

export function deactivate() {}
