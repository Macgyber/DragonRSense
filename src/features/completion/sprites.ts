import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
import { getSettings } from "../../core/settings";
import { isDragonRubyFile } from "../../core/dragonruby";
import { t } from "../../i18n";

/**
 * Discover sprite files in the workspace
 */
async function discoverSprites(workspaceFolder: vscode.WorkspaceFolder): Promise<string[]> {
    const sprites: string[] = [];

    // Common sprite directories in DragonRuby projects
    const commonDirs = ['sprites', 'assets/sprites', 'mygame/sprites'];

    for (const dir of commonDirs) {
        const fullPath = path.join(workspaceFolder.uri.fsPath, dir);

        if (fs.existsSync(fullPath)) {
            try {
                const files = await walkDirectory(fullPath, workspaceFolder.uri.fsPath);
                sprites.push(...files);
            } catch (error) {
                // Silently skip errors
            }
        }
    }

    return sprites;
}

/**
 * Recursively walk directory to find image files
 */
async function walkDirectory(dir: string, workspaceRoot: string): Promise<string[]> {
    const results: string[] = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            // Recurse into subdirectories
            const subFiles = await walkDirectory(fullPath, workspaceRoot);
            results.push(...subFiles);
        } else if (entry.isFile()) {
            // Only include image files
            const ext = path.extname(entry.name).toLowerCase();
            if (['.png', '.jpg', '.jpeg', '.gif', '.bmp'].includes(ext)) {
                // Store relative path from workspace root
                const relativePath = path.relative(workspaceRoot, fullPath);
                results.push(relativePath);
            }
        }
    }

    return results;
}

/**
 * Provide sprite path completions
 */
export class SpriteCompletionProvider implements vscode.CompletionItemProvider {
    async provideCompletionItems(
        document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken,
        context: vscode.CompletionContext
    ): Promise<vscode.CompletionItem[] | undefined> {
        const settings = getSettings();
        if (!settings.resourceDiscovery) { return; }

        if (!isDragonRubyFile(document)) { return; }

        // Get the line text up to cursor position
        const lineText = document.lineAt(position).text.substring(0, position.character);

        // Check if we're inside a string that looks like a sprite path
        const match = lineText.match(/"([^"]*sprites[^"]*)$/);
        if (!match) { return; }

        const partialPath = match[1];

        // Get workspace folder
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
        if (!workspaceFolder) { return; }

        // Discover sprites
        const sprites = await discoverSprites(workspaceFolder);

        // Create completion items
        const items: vscode.CompletionItem[] = [];

        for (const spritePath of sprites) {
            // Only suggest sprites that match the partial path
            if (spritePath.includes('sprites') && spritePath.includes(partialPath.split('/').pop() || '')) {
                const item = new vscode.CompletionItem(spritePath, vscode.CompletionItemKind.File);

                item.detail = `🎨 ${t('completion.sprite')}`;
                item.documentation = new vscode.MarkdownString(`${t('completion.pathLabel')}: \`${spritePath}\``);

                // Insert just the path
                item.insertText = spritePath;

                // Sort by path length (shorter = more likely to be relevant)
                item.sortText = `${spritePath.length.toString().padStart(5, '0')}_${spritePath}`;

                items.push(item);
            }
        }

        return items;
    }
}

/**
 * Register sprite completion provider
 */
export function registerSpriteCompletion(context: vscode.ExtensionContext) {
    const provider = new SpriteCompletionProvider();

    const disposable = vscode.languages.registerCompletionItemProvider(
        { scheme: 'file', language: 'ruby' },
        provider,
        '"', // Trigger on quote
        '/'  // Trigger on slash
    );

    context.subscriptions.push(disposable);
}
