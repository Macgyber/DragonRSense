import * as vscode from "vscode";
import { getSettings } from "../../core/settings";
import { isDragonRubyFile } from "../../core/dragonruby";
import { PATTERNS } from "../../utils/patterns";

/**
 * Color decoration type for showing color boxes
 */
const colorDecorationType = vscode.window.createTextEditorDecorationType({});

/**
 * Convert RGB to hex
 */
function rgbToHex(r: number, g: number, b: number): string {
    const toHex = (n: number) => {
        const hex = Math.max(0, Math.min(255, n)).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Parse RGBA color from match
 */
function parseRGBA(text: string): { r: number; g: number; b: number; a: number } | null {
    const match = text.match(/r:\s*(\d+),\s*g:\s*(\d+),\s*b:\s*(\d+)(?:,\s*a:\s*(\d+))?/i);
    if (!match) {return null;}

    const r = parseInt(match[1]);
    const g = parseInt(match[2]);
    const b = parseInt(match[3]);
    const a = match[4] ? parseInt(match[4]) : 255;

    return { r, g, b, a };
}

/**
 * Parse hex color
 */
function parseHex(text: string): { r: number; g: number; b: number; a: number } | null {
    // Remove 0x or # prefix if present
    const hex = text.replace(/^(?:0x|#)/, '');

    if (hex.length !== 6) {return null;}

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return { r, g, b, a: 255 };
}

/**
 * Update color decorations in the active editor
 */
export function updateColorDecorations(editor: vscode.TextEditor | undefined) {
    if (!editor) {return;}

    const settings = getSettings();
    if (!settings.coordinates) {return;} // Reuse coordinates setting for now

    if (!isDragonRubyFile(editor.document)) {return;}

    const decorations: vscode.DecorationOptions[] = [];
    const text = editor.document.getText();

    // Find RGBA colors
    const rgbaMatches = text.matchAll(PATTERNS.rgbaColor);
    for (const match of rgbaMatches) {
        if (!match.index) {continue;}

        const color = parseRGBA(match[0]);
        if (!color) {continue;}

        const startPos = editor.document.positionAt(match.index);
        const endPos = editor.document.positionAt(match.index + match[0].length);
        const range = new vscode.Range(startPos, endPos);

        const hexColor = rgbToHex(color.r, color.g, color.b);
        const opacity = (color.a / 255).toFixed(2);

        // Create decoration type with the actual color
        const decorationType = vscode.window.createTextEditorDecorationType({
            backgroundColor: hexColor + '40', // Color con 25% opacity
            border: `2px solid ${hexColor}`,
            borderRadius: '3px',
        });

        const hoverMd = new vscode.MarkdownString(
            `**🎨 Color Preview**\n\n` +
            `RGB: (${color.r}, ${color.g}, ${color.b})\n\n` +
            `Alpha: ${color.a} (${opacity})\n\n` +
            `Hex: \`${hexColor}\`\n\n` +
            `<div style="background-color: ${hexColor}; width: 100px; height: 50px; border: 1px solid #ccc;"></div>`
        );
        hoverMd.supportHtml = true;
        hoverMd.isTrusted = true;

        decorations.push({
            range,
            hoverMessage: hoverMd,
        });

        editor.setDecorations(decorationType, [{ range }]);
    }

    // Find Hex colors
    const hexMatches = text.matchAll(PATTERNS.hexColor);
    for (const match of hexMatches) {
        if (!match.index) {continue;}

        const color = parseHex(match[0]);
        if (!color) {continue;}

        const startPos = editor.document.positionAt(match.index);
        const endPos = editor.document.positionAt(match.index + match[0].length);
        const range = new vscode.Range(startPos, endPos);

        const hexColor = rgbToHex(color.r, color.g, color.b);

        // Create decoration type with the actual color
        const decorationType = vscode.window.createTextEditorDecorationType({
            backgroundColor: hexColor + '40', // Color con 25% opacity
            border: `2px solid ${hexColor}`,
            borderRadius: '3px',
        });

        const hoverMd = new vscode.MarkdownString(
            `**🎨 Color Preview**\n\n` +
            `RGB: (${color.r}, ${color.g}, ${color.b})\n\n` +
            `Hex: \`${hexColor}\`\n\n` +
            `<div style="background-color: ${hexColor}; width: 100px; height: 50px; border: 1px solid #ccc;"></div>`
        );
        hoverMd.supportHtml = true;
        hoverMd.isTrusted = true;

        decorations.push({
            range,
            hoverMessage: hoverMd,
        });

        editor.setDecorations(decorationType, [{ range }]);
    }
}

/**
 * Register color decorations
 */
export function registerColorDecorations(context: vscode.ExtensionContext) {
    // Update decorations when active editor changes
    vscode.window.onDidChangeActiveTextEditor(editor => {
        updateColorDecorations(editor);
    }, null, context.subscriptions);

    // Update decorations when document changes
    vscode.workspace.onDidChangeTextDocument(event => {
        if (vscode.window.activeTextEditor && event.document === vscode.window.activeTextEditor.document) {
            updateColorDecorations(vscode.window.activeTextEditor);
        }
    }, null, context.subscriptions);

    // Initial update
    updateColorDecorations(vscode.window.activeTextEditor);
}
