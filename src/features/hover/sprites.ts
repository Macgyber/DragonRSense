import * as vscode from "vscode";
import { getSettings } from "../../core/settings";
import { isDragonRubyFile } from "../../core/dragonruby";
import * as path from "path";
import * as fs from "fs";

/**
 * Get image dimensions from file
 */
function getImageDimensions(filePath: string): { width: number; height: number } | null {
  try {
    const buffer = fs.readFileSync(filePath);

    // PNG signature check
    if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4E && buffer[3] === 0x47) {
      // PNG: width and height are at bytes 16-23
      const width = buffer.readUInt32BE(16);
      const height = buffer.readUInt32BE(20);
      return { width, height };
    }

    // JPEG signature check
    if (buffer[0] === 0xFF && buffer[1] === 0xD8) {
      // JPEG: scan for SOF marker
      let offset = 2;
      while (offset < buffer.length) {
        if (buffer[offset] !== 0xFF) { break; }

        const marker = buffer[offset + 1];
        const length = buffer.readUInt16BE(offset + 2);

        // SOF markers (Start of Frame)
        if (marker >= 0xC0 && marker <= 0xC3) {
          const height = buffer.readUInt16BE(offset + 5);
          const width = buffer.readUInt16BE(offset + 7);
          return { width, height };
        }

        offset += length + 2;
      }
    }

    return null;
  } catch (error) {
    return null;
  }
}

/**
 * Format file size in human-readable format
 */
function formatFileSize(bytes: number): string {
  if (bytes < 1024) { return `${bytes} B`; }
  if (bytes < 1024 * 1024) { return `${(bytes / 1024).toFixed(1)} KB`; }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function provideSpriteHover(
  document: vscode.TextDocument,
  position: vscode.Position
): vscode.Hover | undefined {
  const settings = getSettings();
  if (!settings.spritePreview) { return; }

  if (!isDragonRubyFile(document)) { return; }

  const range = document.getWordRangeAtPosition(position, /"([^"]+\.(png|jpg|jpeg))"/);
  if (!range) { return; }

  const raw = document.getText(range);
  const relativePath = raw.replace(/"/g, "");

  const workspace = vscode.workspace.workspaceFolders?.[0];
  if (!workspace) { return; }

  const absolutePath = path.join(workspace.uri.fsPath, relativePath);
  if (!fs.existsSync(absolutePath)) { return; }

  // Get file stats
  const stats = fs.statSync(absolutePath);
  const fileSize = formatFileSize(stats.size);

  // Get image dimensions
  const dimensions = getImageDimensions(absolutePath);

  // Build hover content
  const md = new vscode.MarkdownString();
  md.supportHtml = true;
  md.isTrusted = true;

  md.appendMarkdown(`**🎨 Sprite Preview**\n\n`);
  md.appendMarkdown(`![sprite](file://${absolutePath})\n\n`);

  md.appendMarkdown(`---\n\n`);

  if (dimensions) {
    md.appendMarkdown(`📐 **Dimensions:** ${dimensions.width} × ${dimensions.height} px\n\n`);
  }

  md.appendMarkdown(`📁 **Path:** \`${relativePath}\`\n\n`);
  md.appendMarkdown(`💾 **Size:** ${fileSize}\n`);

  return new vscode.Hover(md);
}
