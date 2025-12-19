import * as vscode from "vscode";

// Hover features
import { provideSpriteHover } from "./features/hover/sprites";
import { provideCoordinateHover } from "./features/hover/coordinates";
import { provideCoordinateHover } from "./features/hover/coordinates";


// Decorations
import { applyCoordinateDecorations } from "./features/decorations/coordinates";

export function activate(context: vscode.ExtensionContext) {
  console.log("DragonRSense activated 🐉");

  // =========================
  // Hover Provider (DragonRuby)
  // =========================
 const hoverProvider = vscode.languages.registerHoverProvider(
  { scheme: "file", language: "ruby" },
  {
    provideHover(document, position) {
      // Only DragonRuby-like files
      if (!document.getText().includes("args.")) return;

      // 1️⃣ Sprite preview (highest priority)
      const spriteHover = provideSpriteHover(document, position);
      if (spriteHover) return spriteHover;

      // 2️⃣ Coordinates & sizes (x y w h)
      const coordinateHover = provideCoordinateHover(document, position);
      if (coordinateHover) return coordinateHover;

      // 3️⃣ Future hovers go here (pivot, rotation, layers, etc.)
      return;
    }
  }
);

  context.subscriptions.push(hoverProvider);

  // =========================
  // Decorations
  // =========================
  const updateDecorations = (editor?: vscode.TextEditor) => {
    if (!editor) return;
    applyCoordinateDecorations(editor);
  };

  vscode.window.onDidChangeActiveTextEditor(updateDecorations);
  vscode.workspace.onDidChangeTextDocument(() => {
    updateDecorations(vscode.window.activeTextEditor);
  });

  updateDecorations(vscode.window.activeTextEditor);
}

export function deactivate() {}
