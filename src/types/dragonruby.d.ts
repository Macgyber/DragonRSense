/**
 * Shared TypeScript interfaces for DragonRSense
 */

/**
 * DragonRuby sprite definition
 */
export interface DragonRubySprite {
    x: number;
    y: number;
    w: number;
    h: number;
    path: string;
    r?: number;
    g?: number;
    b?: number;
    a?: number;
    angle?: number;
    anchor_x?: number;
    anchor_y?: number;
    flip_horizontally?: boolean;
    flip_vertically?: boolean;
}

/**
 * DragonRuby color definition (RGBA 0-255)
 */
export interface DragonRubyColor {
    r: number;
    g: number;
    b: number;
    a: number;
}

/**
 * Coordinate types for semantic understanding
 */
export type CoordinateType = 'x' | 'y' | 'w' | 'h';

/**
 * Feature configuration from settings
 */
export interface FeatureConfig {
    enableCoordinates: boolean;
    enableSizes: boolean;
    enableSpriteHover: boolean;
    enableDecorations: boolean;
}

/**
 * Sprite path information
 */
export interface SpritePathInfo {
    path: string;
    absolutePath: string;
    exists: boolean;
    extension: string;
}
