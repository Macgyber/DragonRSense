import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log("DragonRSense is active 🐉");

  const disposable = vscode.commands.registerCommand(
    "dragonrsense.hello",
    () => {
      vscode.window.showInformationMessage(
        "DragonRSense is alive 🐉"
      );
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
