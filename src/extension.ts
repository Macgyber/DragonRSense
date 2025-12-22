import * as vscode from "vscode";

// i18n
import { initializeI18n, t } from "./i18n";

// Hover features
import { provideSpriteHover } from "./features/hover/sprites";
import { provideCoordinateHover } from "./features/hover/coordinates";

// Completion features
import { registerSpriteCompletion } from "./features/completion/sprites";
import { registerAudioCompletion } from "./features/completion/audio";
import { registerRequireCompletion } from "./features/completion/require";

// Decoration features
import { registerColorDecorations } from "./features/decorations/colors";

// Navigation features
import { registerLinkProvider } from "./features/navigation/link-provider";

// Color features
import { registerColorProvider } from "./features/colors/provider";

export function activate(context: vscode.ExtensionContext) {
  // Initialize i18n (detects VS Code language)
  initializeI18n();

  console.log("DragonRSense activated 🐉");

  // =========================
  // Commands
  // =========================
  const helloCommand = vscode.commands.registerCommand("dragonrsense.hello", () => {
    vscode.window.showInformationMessage(`🐉 ${t('commands.helloMessage')}`);
  });

  context.subscriptions.push(helloCommand);

  // =========================
  // Hover Provider (DragonRuby)
  // =========================
  const hoverProvider = vscode.languages.registerHoverProvider(
    { scheme: "file", language: "ruby" },
    {
      provideHover(document, position) {
        // Only DragonRuby-like files
        if (!document.getText().includes("args.")) { return; }

        // 1️⃣ Sprite preview (highest priority)
        const spriteHover = provideSpriteHover(document, position);
        if (spriteHover) { return spriteHover; }

        // 2️⃣ Coordinates & sizes (x y w h)
        const coordinateHover = provideCoordinateHover(document, position);
        if (coordinateHover) { return coordinateHover; }

        // 3️⃣ Future hovers go here (pivot, rotation, layers, etc.)
        return;
      }
    }
  );

  context.subscriptions.push(hoverProvider);

  // =========================
  // Resource Discovery (Completion Providers)
  // =========================
  registerSpriteCompletion(context);
  registerAudioCompletion(context);
  registerRequireCompletion(context);

  // =========================
  // Navigation & Verification
  // =========================
  registerLinkProvider(context);

  // =========================
  // Color Decorations & Picker
  // =========================
  registerColorDecorations(context);
  registerColorProvider(context);
}

export function deactivate() {
  // Cleanup if needed in the future
}
