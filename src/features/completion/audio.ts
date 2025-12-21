import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
import { getSettings } from "../../core/settings";
import { isDragonRubyFile } from "../../core/dragonruby";
import { t } from "../../i18n";

/**
 * Discover audio files in the workspace
 */
async function discoverAudio(workspaceFolder: vscode.WorkspaceFolder): Promise<string[]> {
    const audioFiles: string[] = [];

    // Common audio directories in DragonRuby projects
    const commonDirs = ['sounds', 'audio', 'music', 'assets/sounds', 'mygame/sounds'];

    for (const dir of commonDirs) {
        const fullPath = path.join(workspaceFolder.uri.fsPath, dir);

        if (fs.existsSync(fullPath)) {
            try {
                const files = await walkDirectory(fullPath, workspaceFolder.uri.fsPath);
                audioFiles.push(...files);
            } catch (error) {
                // Silently skip errors
            }
        }
    }

    return audioFiles;
}

/**
 * Recursively walk directory to find audio files
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
            // Only include audio files
            const ext = path.extname(entry.name).toLowerCase();
            if (['.wav', '.mp3', '.ogg', '.flac'].includes(ext)) {
                // Store relative path from workspace root
                const relativePath = path.relative(workspaceRoot, fullPath);
                results.push(relativePath);
            }
        }
    }

    return results;
}

/**
 * Provide audio path completions
 */
export class AudioCompletionProvider implements vscode.CompletionItemProvider {
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

        // Check if we're inside a string that looks like an audio path
        const match = lineText.match(/"([^"]*(sounds|audio|music)[^"]*)$/);
        if (!match) { return; }

        const partialPath = match[1];

        // Get workspace folder
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
        if (!workspaceFolder) { return; }

        // Discover audio files
        const audioFiles = await discoverAudio(workspaceFolder);

        // Create completion items
        const items: vscode.CompletionItem[] = [];

        for (const audioPath of audioFiles) {
            // Only suggest files that match the partial path
            if (audioPath.includes(partialPath.split('/').pop() || '')) {
                const item = new vscode.CompletionItem(audioPath, vscode.CompletionItemKind.File);

                const ext = path.extname(audioPath).toUpperCase().substring(1);
                item.detail = `🔊 ${t('completion.audio')} (${ext})`;
                item.documentation = new vscode.MarkdownString(`${t('completion.pathLabel')}: \`${audioPath}\``);

                // Insert just the path
                item.insertText = audioPath;

                // Sort by path length (shorter = more likely to be relevant)
                item.sortText = `${audioPath.length.toString().padStart(5, '0')}_${audioPath}`;

                items.push(item);
            }
        }

        return items;
    }
}

/**
 * Register audio completion provider
 */
export function registerAudioCompletion(context: vscode.ExtensionContext) {
    const provider = new AudioCompletionProvider();

    const disposable = vscode.languages.registerCompletionItemProvider(
        { scheme: 'file', language: 'ruby' },
        provider,
        '"', // Trigger on quote
        '/'  // Trigger on slash
    );

    context.subscriptions.push(disposable);
}
