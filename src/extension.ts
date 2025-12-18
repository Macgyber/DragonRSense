import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log("DragonRSense is active 🐉");

  const hoverProvider = vscode.languages.registerHoverProvider(
    { scheme: "file", language: "ruby" },
    {
      provideHover(document, position) {
        const range = document.getWordRangeAtPosition(position);
        if (!range) return;

        const word = document.getText(range);

        switch (word) {
          case "x":
            return new vscode.Hover("**x** → Horizontal position (left → right)");
          case "y":
            return new vscode.Hover("**y** → Vertical position (bottom → top)");
          case "w":
            return new vscode.Hover("**w** → Width of the element");
          case "h":
            return new vscode.Hover("**h** → Height of the element");
        }
      }
    }
  );

  context.subscriptions.push(hoverProvider);
}

export function deactivate() {}
