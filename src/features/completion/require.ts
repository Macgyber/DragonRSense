import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
import { getSettings } from "../../core/settings";
import { isDragonRubyFile } from "../../core/dragonruby";
import { t } from "../../i18n";

/**
 * Discover Ruby files in the workspace for require statements
 */
async function discoverRubyFiles(workspaceFolder: vscode.WorkspaceFolder): Promise<string[]> {
    const rubyFiles: string[] = [];

    // Common source directories in DragonRuby projects
    const commonDirs = ['app', 'lib', 'mygame/app', '.'];

    for (const dir of commonDirs) {
        const fullPath = path.join(workspaceFolder.uri.fsPath, dir);

        if (fs.existsSync(fullPath)) {
            try {
                const files = await walkDirectory(fullPath, workspaceFolder.uri.fsPath);
                rubyFiles.push(...files);
            } catch (error) {
                // Silently skip errors
            }
        }
    }

    return rubyFiles;
}

/**
 * Recursively walk directory to find Ruby files
 */
async function walkDirectory(dir: string, workspaceRoot: string): Promise<string[]> {
    const results: string[] = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        // Skip hidden directories and common excludes
        if (entry.isDirectory()) {
            const dirname = entry.name;
            if (dirname.startsWith('.') || dirname === 'node_modules' || dirname === 'tmp') {
                continue;
            }

            // Recurse into subdirectories
            const subFiles = await walkDirectory(fullPath, workspaceRoot);
            results.push(...subFiles);
        } else if (entry.isFile()) {
            // Only include Ruby files
            const ext = path.extname(entry.name).toLowerCase();
            if (ext === '.rb') {
                // Store relative path from workspace root (without extension for require)
                const relativePath = path.relative(workspaceRoot, fullPath);
                // Remove .rb extension
                const requirePath = relativePath.replace(/\.rb$/, '');
                results.push(requirePath);
            }
        }
    }

    return results;
}

/**
 * Provide require path completions
 */
export class RequireCompletionProvider implements vscode.CompletionItemProvider {
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

        // Check if we're in a require statement
        const match = lineText.match(/require\s+['"]([^'"]*)?$/);
        if (!match) { return; }

        const partialPath = match[1] || '';

        // Get workspace folder
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
        if (!workspaceFolder) { return; }

        // Discover Ruby files
        const rubyFiles = await discoverRubyFiles(workspaceFolder);

        // Create completion items
        const items: vscode.CompletionItem[] = [];

        for (const requirePath of rubyFiles) {
            // Only suggest files that match the partial path
            if (requirePath.includes(partialPath)) {
                const item = new vscode.CompletionItem(requirePath, vscode.CompletionItemKind.Module);

                item.detail = `📦 ${t('completion.module')}`;
                item.documentation = new vscode.MarkdownString(`${t('completion.requirePathLabel')}: \`${requirePath}\``);

                // Insert just the path (without .rb extension)
                item.insertText = requirePath;

                // Sort by path length (shorter = more likely to be relevant)
                item.sortText = `${requirePath.length.toString().padStart(5, '0')}_${requirePath}`;

                items.push(item);
            }
        }

        return items;
    }
}

/**
 * Register require completion provider
 */
export function registerRequireCompletion(context: vscode.ExtensionContext) {
    const provider = new RequireCompletionProvider();

    const disposable = vscode.languages.registerCompletionItemProvider(
        { scheme: 'file', language: 'ruby' },
        provider,
        '"', // Trigger on double quote
        "'", // Trigger on single quote
        '/'  // Trigger on slash
    );

    context.subscriptions.push(disposable);
}
