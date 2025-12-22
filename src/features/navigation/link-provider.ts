import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { PATTERNS } from '../../utils/patterns';

export class DragonRubyLinkProvider implements vscode.DocumentLinkProvider {
    provideDocumentLinks(
        document: vscode.TextDocument,
        token: vscode.CancellationToken
    ): vscode.ProviderResult<vscode.DocumentLink[]> {
        const links: vscode.DocumentLink[] = [];
        const text = document.getText();
        const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);

        let rootPath = "";
        if (workspaceFolder) {
            rootPath = workspaceFolder.uri.fsPath;
        } else {
            rootPath = path.dirname(document.fileName); // Fallback
        }

        // 1. Detectar Sprites ("sprites/...")
        // Importante: Crear nueva instancia de RegExp para evitar problemas con lastIndex
        const spriteRegex = new RegExp(PATTERNS.spritePath.source, PATTERNS.spritePath.flags);
        const spriteMatches = text.matchAll(spriteRegex);

        for (const match of spriteMatches) {
            if (match.index === undefined) continue;

            const fullMatch = match[0];
            const filePath = match[1]; // El contenido dentro de las comillas

            // Calcular rango del enlace (solo el texto de la ruta, sin comillas)
            // match.index apunta al inicio de la cadena, incluyendo la comilla inicial
            const valueStartIndex = match.index + fullMatch.indexOf(filePath);
            const start = document.positionAt(valueStartIndex);
            const end = document.positionAt(valueStartIndex + filePath.length);
            const range = new vscode.Range(start, end);

            // Resolver ruta absoluta (Estrategia múltiple)
            const possiblePaths = [
                path.join(rootPath, filePath),                       // 1. Desde la raíz
                path.join(path.dirname(document.fileName), filePath), // 2. Relativo al archivo actual
                path.join(rootPath, 'mygame', filePath),             // 3. Dentro de carpeta standard 'mygame'
                path.join(rootPath, 'app', filePath)                 // 4. Dentro de carpeta 'app'
            ];

            let targetPath = possiblePaths[0];
            let exists = false;

            for (const p of possiblePaths) {
                if (fs.existsSync(p)) {
                    targetPath = p;
                    exists = true;
                    break;
                }
            }

            const targetUri = vscode.Uri.file(targetPath);

            // Crear el enlace
            const link = new vscode.DocumentLink(range, targetUri);
            link.tooltip = exists ? "Abrir sprite" : "Sprite no encontrado (Click para crear)";
            links.push(link);
        }

        // 2. Detectar Requires (require '...')
        const requireRegex = new RegExp(PATTERNS.requirePath.source, PATTERNS.requirePath.flags);
        const requireMatches = text.matchAll(requireRegex);

        for (const match of requireMatches) {
            if (match.index === undefined) continue;

            const fullMatch = match[0];
            const filePath = match[1];

            const valueStartIndex = match.index + fullMatch.indexOf(filePath);
            const start = document.positionAt(valueStartIndex);
            const end = document.positionAt(valueStartIndex + filePath.length);
            const range = new vscode.Range(start, end);

            // Los requires en DragonRuby suelen ser relativos o desde la raíz
            // Si termina en .rb bien, sino se lo agregamos
            let targetFile = filePath;
            if (!targetFile.endsWith('.rb')) {
                targetFile += '.rb';
            }

            // Resolver ruta absoluta (Estrategia múltiple)
            const possiblePaths = [
                path.join(rootPath, targetFile),                     // 1. Desde la raíz
                path.join(path.dirname(document.fileName), targetFile), // 2. Relativo al archivo
                path.join(rootPath, 'app', targetFile),              // 3. En app/
                path.join(rootPath, 'mygame', 'app', targetFile)     // 4. En mygame/app/
            ];

            let targetPath = possiblePaths[0];
            let exists = false;

            for (const p of possiblePaths) {
                if (fs.existsSync(p)) {
                    targetPath = p;
                    exists = true;
                    break;
                }
            }

            const targetUri = vscode.Uri.file(targetPath);

            const link = new vscode.DocumentLink(range, targetUri);
            link.tooltip = exists ? "Ir al código" : "Archivo no encontrado (Click para crear)";
            links.push(link);
        }

        return links;
    }
}

export function registerLinkProvider(context: vscode.ExtensionContext) {
    const provider = new DragonRubyLinkProvider();

    // Registrar para archivos Ruby
    const disposable = vscode.languages.registerDocumentLinkProvider(
        { scheme: 'file', language: 'ruby' },
        provider
    );

    context.subscriptions.push(disposable);
}
