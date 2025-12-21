import * as vscode from "vscode";

/**
 * Basic heuristic to detect DragonRuby files.
 * Centralized here to avoid duplication.
 */
export function isDragonRubyFile(
  document: vscode.TextDocument
): boolean {
  if (document.languageId !== "ruby") {return false;}

  const text = document.getText();

  // Common DragonRuby patterns
  return (
    text.includes("args.") ||
    text.includes("tick do") ||
    text.includes("def tick")
  );
}
