/**
 * Common regex patterns for DragonRuby code detection
 */

export const PATTERNS = {
    /**
     * Matches sprite paths in quotes
     * Example: "sprites/player.png"
     */
    spritePath: /"([^"]+\.(png|jpg|jpeg|gif|bmp))"/gi,

    /**
     * Matches require statements
     * Example: require 'app/player.rb'
     */
    requirePath: /require\s+['"]([^'"]+)['"]/gi,

    /**
     * Matches RGBA color definitions
     * Example: r: 255, g: 128, b: 0, a: 255
     */
    rgbaColor: /r:\s*(\d+),\s*g:\s*(\d+),\s*b:\s*(\d+)(?:,\s*a:\s*(\d+))?/gi,

    /**
     * Matches hexadecimal color values
     * Example: 0xAAFF00, #aaff00, aaff00
     */
    hexColor: /(?:0x|#)?([0-9a-fA-F]{6})\b/gi,

    /**
     * Matches coordinate properties
     * Example: x: 100, y: 200
     */
    coordinate: /\b([xywh]):\s*(-?\d+(?:\.\d+)?)/gi,

    /**
     * Matches DragonRuby args patterns
     * Example: args.outputs, args.inputs, args.state
     */
    argsPattern: /args\.(outputs|inputs|state|grid|geometry|audio|gtk)/gi,

    /**
     * Matches tick method definition
     * Example: def tick args
     */
    tickMethod: /def\s+tick\s+args/gi,
};

/**
 * File extension patterns
 */
export const FILE_EXTENSIONS = {
    images: ['.png', '.jpg', '.jpeg', '.gif', '.bmp'],
    ruby: ['.rb'],
    allSupported: ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.rb'],
};

/**
 * DragonRuby-specific keywords
 */
export const DRAGONRUBY_KEYWORDS = [
    'args',
    'tick',
    'outputs',
    'inputs',
    'state',
    'sprites',
    'labels',
    'solids',
    'borders',
    'lines',
    'primitives',
];
