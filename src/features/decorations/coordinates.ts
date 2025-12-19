import * as vscode from "vscode";
import { isDragonRubyFile } from "../../core/dragonruby";


export function applyCoordinateDecorations(editor: vscode.TextEditor) {
  const config = vscode.workspace.getConfiguration("dragonrsense");

  if (!config.get<boolean>("enableDecorations")) return;
  if (!config.get<boolean>("enableCoordinates")) return;

  const text = editor.document.getText();
 if (!isDragonRubyFile(editor.document)) return;


  const positionDecoration = vscode.window.createTextEditorDecorationType({
    before: {
      contentText: "🎯 ",
      color: "#888"
        /*
  // SVG MODE (future)
  gutterIconPath: context.asAbsolutePath("icons/size.svg"),
  gutterIconSize: "contain"
  */
    }
  });

  const sizeDecoration = vscode.window.createTextEditorDecorationType({
    before: {
      contentText: "📐 ",
      color: "#888"
    }
  });

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
