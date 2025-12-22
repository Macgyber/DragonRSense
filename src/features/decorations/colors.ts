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
 * Check if color is bright to adjust text contrast
 */
function isBright(color: { r: number, g: number, b: number }): boolean {
    // Calculate luminance
    const luminance = (0.299 * color.r + 0.587 * color.g + 0.114 * color.b) / 255;
    return luminance > 0.5;
}

/**
 * Parse RGBA color from match
 */
function parseRGBA(text: string): { r: number; g: number; b: number; a: number } | null {
    const match = text.match(/r:\s*(\d+),\s*g:\s*(\d+),\s*b:\s*(\d+)(?:,\s*a:\s*(\d+))?/i);
    if (!match) { return null; }

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

    if (hex.length !== 6) { return null; }

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return { r, g, b, a: 255 };
}

/**
 * Update color decorations in the active editor
 */
// Cache for decoration types to avoid memory leaks
const decorationTypes = new Map<string, vscode.TextEditorDecorationType>();

/**
 * Update color decorations in the active editor
 */
export function updateColorDecorations(editor: vscode.TextEditor | undefined) {
    if (!editor) { return; }

    const settings = getSettings();
    // Use the new setting key we defined earlier (although accessing by property name 'coordinates' is technically correct if the interface wasn't changed, let's assume 'coordinates' acts as a global 'enable' for now or just check if we should add a specific setting for colors later)
    if (!settings.coordinates) { return; }

    if (!isDragonRubyFile(editor.document)) { return; }

    const text = editor.document.getText();
    const decorationsByColor = new Map<string, { ranges: vscode.DecorationOptions[], color: { r: number, g: number, b: number, a: number } }>();

    // Helper to add decoration
    const addDecoration = (range: vscode.Range, color: { r: number, g: number, b: number, a: number }) => {
        const hexColor = rgbToHex(color.r, color.g, color.b);
        const key = `${hexColor}-${color.a}`;

        if (!decorationsByColor.has(key)) {
            decorationsByColor.set(key, { ranges: [], color });
        }

        const opacity = (color.a / 255).toFixed(2);
        const hoverMd = new vscode.MarkdownString(
            `**🎨 Color Preview**\n\n` +
            `RGB: (${color.r}, ${color.g}, ${color.b})\n\n` +
            `Alpha: ${color.a} (${opacity})\n\n` +
            `Hex: \`${hexColor}\`\n\n` +
            `<div style="background-color: ${hexColor}; width: 100px; height: 50px; border: 1px solid #ccc;"></div>`
        );
        hoverMd.supportHtml = true;
        hoverMd.isTrusted = true;

        decorationsByColor.get(key)!.ranges.push({
            range,
            hoverMessage: hoverMd,
        });
    };

    // Find RGBA colors
    const rgbaMatches = text.matchAll(PATTERNS.rgbaColor);
    for (const match of rgbaMatches) {
        if (!match.index) { continue; }
        const color = parseRGBA(match[0]);
        if (!color) { continue; }

        const startPos = editor.document.positionAt(match.index);
        const endPos = editor.document.positionAt(match.index + match[0].length);
        addDecoration(new vscode.Range(startPos, endPos), color);
    }

    // Find Hex colors
    const hexMatches = text.matchAll(PATTERNS.hexColor);
    for (const match of hexMatches) {
        if (!match.index) { continue; }
        const color = parseHex(match[0]);
        if (!color) { continue; }

        const startPos = editor.document.positionAt(match.index);
        const endPos = editor.document.positionAt(match.index + match[0].length);
        addDecoration(new vscode.Range(startPos, endPos), color);
    }

    // Apply decorations
    // First, clear all existing decorations from our cache that are NOT in the current list? 
    // Actually, simpler: Set empty decorations for types not used this turn?
    // For now, let's just apply the new ones.

    // We need to clear previous decorations for keys that don't exist anymore?
    // VS Code handles `setDecorations([])` to clear. 
    // We should iterate over ALL cached types and set valid ranges or empty.

    // 1. Set new decorations
    for (const [key, data] of decorationsByColor) {
        let decorationType = decorationTypes.get(key);

        if (!decorationType) {
            const hexColor = rgbToHex(data.color.r, data.color.g, data.color.b);
            decorationType = vscode.window.createTextEditorDecorationType({
                backgroundColor: hexColor, // Solid color (no transparency)
                isWholeLine: false,
                color: vscode.window.activeColorTheme.kind === vscode.ColorThemeKind.Light ? '#000000' : '#FFFFFF'
            });
            decorationTypes.set(key, decorationType);
        }

        editor.setDecorations(decorationType, data.ranges);
    }

    // 2. Clear decorations for types that were NOT used in this pass
    for (const [key, decorationType] of decorationTypes) {
        if (!decorationsByColor.has(key)) {
            editor.setDecorations(decorationType, []);
        }
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

    // Update decorations when theme changes
    vscode.window.onDidChangeActiveColorTheme(() => {
        // Clear cache to force recreation of decoration types with new text colors
        for (const decorationType of decorationTypes.values()) {
            decorationType.dispose();
        }
        decorationTypes.clear();
        updateColorDecorations(vscode.window.activeTextEditor);
    }, null, context.subscriptions);

    // Dispose all decorations on deactivation
    context.subscriptions.push({
        dispose: () => {
            for (const decorationType of decorationTypes.values()) {
                decorationType.dispose();
            }
            decorationTypes.clear();
        }
    });

    // Initial update
    updateColorDecorations(vscode.window.activeTextEditor);
}
