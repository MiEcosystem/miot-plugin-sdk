export declare const ColorGreen = "#00B7A2";
export declare const ColorOrange = "#FFA943";
export declare const ColorRed = "#FC675F";
export declare function fixHex(hex: any): any;
export declare function transformHexToDigtal(hex: any): number;
export declare function transformDigtalToHex(digtal: any): string;
export declare function colorGetterforRange(range: any): {
    getColorFromPercent: (p: any) => any;
    getPercentFromColor: (color: any) => number;
};
