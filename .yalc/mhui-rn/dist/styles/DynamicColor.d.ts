declare class DynamicColor {
    light: string;
    dark: string;
    constructor(light: string, dark: string);
    color(colorScheme?: string): string;
}
export default DynamicColor;
