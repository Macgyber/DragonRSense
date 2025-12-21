import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

// Type for translation keys
interface Translations {
    hover: {
        coordinates: {
            x: string;
            y: string;
            w: string;
            h: string;
        };
        sprite: {
            preview: string;
            notFound: string;
            issue: string;
            fileNotExist: string;
            unsupportedFormat: string;
            svgNotSupported: string;
            dimensions: string;
            format: string;
            path: string;
            size: string;
            tipNotFound: string;
            tipUnsupported: string;
            tipSvg: string;
        };
    };
    completion: {
        sprite: string;
        audio: string;
        module: string;
        pathLabel: string;
        requirePathLabel: string;
    };
    commands: {
        helloMessage: string;
    };
}

let currentTranslations: Translations | null = null;

/**
 * Detect VS Code language and load appropriate translations
 */
export function initializeI18n(): void {
    // Get VS Code display language
    const vscodeLocale = vscode.env.language;

    // Map VS Code locale to our locale files
    let locale = 'en'; // Default to English

    if (vscodeLocale.startsWith('es')) {
        locale = 'es'; // Spanish
    } else if (vscodeLocale.startsWith('zh-CN') || vscodeLocale.startsWith('zh-Hans')) {
        locale = 'zh-cn'; // Chinese Simplified
    } else if (vscodeLocale.startsWith('zh-TW') || vscodeLocale.startsWith('zh-Hant')) {
        locale = 'zh-cn'; // Chinese Simplified (fallback for Traditional)
    } else if (vscodeLocale.startsWith('ja')) {
        locale = 'en'; // Japanese (fallback to English for now)
    } else if (vscodeLocale.startsWith('fr')) {
        locale = 'en'; // French (fallback to English for now)
    } else if (vscodeLocale.startsWith('de')) {
        locale = 'en'; // German (fallback to English for now)
    } else if (vscodeLocale.startsWith('pt')) {
        locale = 'en'; // Portuguese (fallback to English for now)
    }

    loadTranslations(locale);

    console.log(`DragonRSense: Loaded locale '${locale}' (VS Code locale: ${vscodeLocale})`);
}

/**
 * Load translations from JSON file
 */
function loadTranslations(locale: string): void {
    try {
        const localeFile = path.join(__dirname, 'locales', `${locale}.json`);

        if (fs.existsSync(localeFile)) {
            const content = fs.readFileSync(localeFile, 'utf-8');
            currentTranslations = JSON.parse(content);
        } else {
            // Fallback to English
            const englishFile = path.join(__dirname, 'locales', 'en.json');
            const content = fs.readFileSync(englishFile, 'utf-8');
            currentTranslations = JSON.parse(content);
        }
    } catch (error) {
        console.error('Failed to load translations:', error);
        // Use fallback translations
        currentTranslations = createFallbackTranslations();
    }
}

/**
 * Create fallback translations (English)
 */
function createFallbackTranslations(): Translations {
    return {
        hover: {
            coordinates: {
                x: "Horizontal position (left → right)",
                y: "Vertical position (bottom → top)",
                w: "Width of the sprite or element",
                h: "Height of the sprite or element"
            },
            sprite: {
                preview: "Sprite Preview",
                notFound: "Sprite Not Found",
                issue: "Sprite Issue",
                fileNotExist: "File does not exist",
                unsupportedFormat: "Unsupported format or corrupted file",
                svgNotSupported: "SVG format is not supported by DragonRuby",
                dimensions: "Dimensions",
                format: "Format",
                path: "Path",
                size: "Size",
                tipNotFound: "Check if the file path is correct or if the file has been moved/deleted.",
                tipUnsupported: "DragonRSense currently supports PNG and JPEG. The file may be corrupted.",
                tipSvg: "DragonRuby requires PNG or JPEG. Convert your SVG to PNG first."
            }
        },
        completion: {
            sprite: "Sprite",
            audio: "Audio",
            module: "Ruby Module",
            pathLabel: "Path",
            requirePathLabel: "Require path"
        },
        commands: {
            helloMessage: "DragonRSense is active! Where code stops being numbers and becomes meaning."
        }
    };
}

/**
 * Get translation by key path
 */
export function t(key: string): string {
    if (!currentTranslations) {
        initializeI18n();
    }

    const keys = key.split('.');
    let value: any = currentTranslations;

    for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
            value = value[k];
        } else {
            return key; // Return key if not found
        }
    }

    return typeof value === 'string' ? value : key;
}

/**
 * Get all translations (for direct access)
 */
export function getTranslations(): Translations {
    if (!currentTranslations) {
        initializeI18n();
    }
    return currentTranslations || createFallbackTranslations();
}
