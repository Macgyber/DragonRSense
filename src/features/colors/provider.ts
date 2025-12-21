import * as vscode from "vscode";
import { isDragonRubyFile } from "../../core/dragonruby";
import { PATTERNS } from "../../utils/patterns";

/**
 * Convert RGB to VS Code Color
 */
function rgbToColor(r: number, g: number, b: number, a: number = 255): vscode.Color {
    return new vscode.Color(r / 255, g / 255, b / 255, a / 255);
}

/**
 * Convert VS Code Color to RGB
 */
function colorToRgb(color: vscode.Color): { r: number; g: number; b: number; a: number } {
    return {
        r: Math.round(color.red * 255),
        g: Math.round(color.green * 255),
        b: Math.round(color.blue * 255),
        a: Math.round(color.alpha * 255),
    };
}

/**
 * Convert RGB to hex
 */
function rgbToHex(r: number, g: number, b: number): string {
    const toHex = (n: number) => {
        const hex = Math.max(0, Math.min(255, n)).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };
    return toHex(r) + toHex(g) + toHex(b);
}

/**
 * Color Provider for RGB/RGBA colors
 */
export class DragonRubyColorProvider implements vscode.DocumentColorProvider {
    provideDocumentColors(
        document: vscode.TextDocument,
        token: vscode.CancellationToken
    ): vscode.ProviderResult<vscode.ColorInformation[]> {
        if (!isDragonRubyFile(document)) {
            return [];
        }

        const colors: vscode.ColorInformation[] = [];
        const text = document.getText();

        // Find RGBA colors
        const rgbaMatches = text.matchAll(PATTERNS.rgbaColor);
        for (const match of rgbaMatches) {
            if (!match.index) {continue;}

            const r = parseInt(match[1]);
            const g = parseInt(match[2]);
            const b = parseInt(match[3]);
            const a = match[4] ? parseInt(match[4]) : 255;

            const startPos = document.positionAt(match.index);
            const endPos = document.positionAt(match.index + match[0].length);
            const range = new vscode.Range(startPos, endPos);

            colors.push(new vscode.ColorInformation(range, rgbToColor(r, g, b, a)));
        }

        // Find Hex colors
        const hexMatches = text.matchAll(PATTERNS.hexColor);
        for (const match of hexMatches) {
            if (!match.index || !match[1]) {continue;}

            const hex = match[1];
            if (hex.length !== 6) {continue;}

            const r = parseInt(hex.substring(0, 2), 16);
            const g = parseInt(hex.substring(2, 4), 16);
            const b = parseInt(hex.substring(4, 6), 16);

            const startPos = document.positionAt(match.index);
            const endPos = document.positionAt(match.index + match[0].length);
            const range = new vscode.Range(startPos, endPos);

            colors.push(new vscode.ColorInformation(range, rgbToColor(r, g, b)));
        }

        return colors;
    }

    provideColorPresentations(
        color: vscode.Color,
        context: { document: vscode.TextDocument; range: vscode.Range },
        token: vscode.CancellationToken
    ): vscode.ProviderResult<vscode.ColorPresentation[]> {
        const { r, g, b, a } = colorToRgb(color);
        const presentations: vscode.ColorPresentation[] = [];

        // Get the original text to detect format
        const originalText = context.document.getText(context.range);

        // Check if it's RGBA format
        if (originalText.match(/r:\s*\d+,\s*g:\s*\d+,\s*b:\s*\d+(?:,\s*a:\s*\d+)?/i)) {
            // RGB format (without alpha if alpha is 255)
            if (a === 255) {
                const rgbPresentation = new vscode.ColorPresentation(`r: ${r}, g: ${g}, b: ${b}`);
                presentations.push(rgbPresentation);
            }

            // RGBA format (always include alpha)
            const rgbaPresentation = new vscode.ColorPresentation(`r: ${r}, g: ${g}, b: ${b}, a: ${a}`);
            presentations.push(rgbaPresentation);
        }

        // Check if it's hex format
        if (originalText.match(/(?:0x|#)?[0-9a-fA-F]{6}/)) {
            const hexValue = rgbToHex(r, g, b);

            // Detect original format
            if (originalText.startsWith('0x')) {
                presentations.push(new vscode.ColorPresentation(`0x${hexValue.toUpperCase()}`));
            } else if (originalText.startsWith('#')) {
                presentations.push(new vscode.ColorPresentation(`#${hexValue}`));
            } else {
                presentations.push(new vscode.ColorPresentation(hexValue));
            }
        }

        return presentations;
    }
}

/**
 * Register color provider
 */
export function registerColorProvider(context: vscode.ExtensionContext) {
    const provider = new DragonRubyColorProvider();

    const disposable = vscode.languages.registerColorProvider(
        { scheme: 'file', language: 'ruby' },
        provider
    );

    context.subscriptions.push(disposable);
}
