import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";

export function provideSpriteHover(
  document: vscode.TextDocument,
  position: vscode.Position
): vscode.Hover | undefined {
  const config = vscode.workspace.getConfiguration("dragonrsense");
  if (!config.get<boolean>("enableSpriteHover")) return;

  const text = document.getText();
  if (!text.includes("args.")) return;

  const range = document.getWordRangeAtPosition(position, /"([^"]+\.(png|jpg|jpeg))"/);
  if (!range) return;

  const raw = document.getText(range);
  const relativePath = raw.replace(/"/g, "");

  const workspace = vscode.workspace.workspaceFolders?.[0];
  if (!workspace) return;

  const absolutePath = path.join(workspace.uri.fsPath, relativePath);
  if (!fs.existsSync(absolutePath)) return;

  const md = new vscode.MarkdownString();
  md.supportHtml = true;
  md.isTrusted = true;

  md.appendMarkdown(`**Sprite preview**\n\n`);
  md.appendMarkdown(`![sprite](file://${absolutePath})`);

  return new vscode.Hover(md);
}
