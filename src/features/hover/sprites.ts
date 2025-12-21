import * as vscode from "vscode";
import { getSettings } from "../../core/settings";
import { isDragonRubyFile } from "../../core/dragonruby";
import { t } from "../../i18n";
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

  // Update regex to also detect SVG
  const range = document.getWordRangeAtPosition(position, /"([^"]+\.(png|jpg|jpeg|svg))"/);
  if (!range) { return; }

  const raw = document.getText(range);
  const relativePath = raw.replace(/"/g, "");

  const workspace = vscode.workspace.workspaceFolders?.[0];
  if (!workspace) { return; }

  const absolutePath = path.join(workspace.uri.fsPath, relativePath);
  const ext = path.extname(absolutePath).toLowerCase();

  // Build hover content
  const md = new vscode.MarkdownString();
  md.supportHtml = true;
  md.isTrusted = true;

  // Check if file exists
  if (!fs.existsSync(absolutePath)) {
    // FILE NOT FOUND - Show error message
    md.appendMarkdown(`**⚠️ ${t('hover.sprite.notFound')}**\n\n`);
    md.appendMarkdown(`---\n\n`);
    md.appendMarkdown(`❌ **${t('hover.sprite.fileNotExist')}**\n\n`);
    md.appendMarkdown(`📁 **${t('hover.sprite.path')}:** \`${relativePath}\`\n\n`);
    md.appendMarkdown(`**Tip:** ${t('hover.sprite.tipNotFound')}\n`);

    return new vscode.Hover(md);
  }

  // Check if it's SVG (not supported by DragonRuby)
  if (ext === '.svg') {
    md.appendMarkdown(`**⚠️ ${t('hover.sprite.issue')}**\n\n`);
    md.appendMarkdown(`---\n\n`);
    md.appendMarkdown(`❌ **${t('hover.sprite.svgNotSupported')}**\n\n`);
    md.appendMarkdown(`📁 **${t('hover.sprite.path')}:** \`${relativePath}\`\n\n`);
    md.appendMarkdown(`**Tip:** ${t('hover.sprite.tipSvg')}\n`);

    return new vscode.Hover(md);
  }

  // Get file stats
  const stats = fs.statSync(absolutePath);
  const fileSize = formatFileSize(stats.size);

  // Get image dimensions
  const dimensions = getImageDimensions(absolutePath);

  // Check if format is supported (has dimensions)
  if (!dimensions) {
    // UNSUPPORTED FORMAT or CORRUPTED
    md.appendMarkdown(`**⚠️ ${t('hover.sprite.issue')}**\n\n`);
    md.appendMarkdown(`---\n\n`);
    md.appendMarkdown(`❌ **${t('hover.sprite.unsupportedFormat')}**\n\n`);
    md.appendMarkdown(`📁 **${t('hover.sprite.path')}:** \`${relativePath}\`\n\n`);
    md.appendMarkdown(`💾 **${t('hover.sprite.size')}:** ${fileSize}\n\n`);
    md.appendMarkdown(`**Tip:** ${t('hover.sprite.tipUnsupported')}\n`);

    return new vscode.Hover(md);
  }

  // VALID IMAGE - Show preview with full details
  md.appendMarkdown(`**🎨 ${t('hover.sprite.preview')}**\n\n`);
  md.appendMarkdown(`![sprite](file://${absolutePath})\n\n`);
  md.appendMarkdown(`---\n\n`);
  md.appendMarkdown(`📐 **${t('hover.sprite.dimensions')}:** ${dimensions.width} × ${dimensions.height} px\n\n`);
  md.appendMarkdown(`📄 **${t('hover.sprite.format')}:** ${ext.toUpperCase().substring(1)}\n\n`);
  md.appendMarkdown(`📁 **${t('hover.sprite.path')}:** \`${relativePath}\`\n\n`);
  md.appendMarkdown(`💾 **${t('hover.sprite.size')}:** ${fileSize}\n`);

  return new vscode.Hover(md);
}
