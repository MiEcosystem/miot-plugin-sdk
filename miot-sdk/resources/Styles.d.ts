declare namespace _default {
    namespace common {
        export { PADDING as padding };
        export const MHGreen: string;
        export const underlayColor: string;
        export { HAIRLINE_COLOR as hairlineColor };
        export const backgroundColor: string;
        export { SEPARATOR_HEIGHT as separatorHeight };
        export namespace title {
            const fontSize: number;
            const lineHeight: number;
            const color: string;
        }
        export namespace subtitle {
            const fontSize_1: number;
            export { fontSize_1 as fontSize };
            const color_1: string;
            export { color_1 as color };
        }
        export namespace separator {
            export { SEPARATOR_HEIGHT as height };
            export { HAIRLINE_COLOR as backgroundColor };
        }
    }
    namespace dialog {
        export namespace background {
            export const flex: number;
            const backgroundColor_1: string;
            export { backgroundColor_1 as backgroundColor };
        }
        export namespace modal {
            export const position: string;
            export const bottom: number;
            export { MODAL_MARGIN as marginHorizontal };
            export { MODAL_WIDTH as width };
            export const borderRadius: number;
            const backgroundColor_2: string;
            export { backgroundColor_2 as backgroundColor };
        }
        export namespace title_1 {
            const titleHeightThin: number;
            const titleHeightFat: number;
        }
        export { title_1 as title };
        export namespace subtitle_1 {
            export const width: number;
            export const textAlign: string;
            const fontSize_2: number;
            export { fontSize_2 as fontSize };
            const color_2: string;
            export { color_2 as color };
        }
        export { subtitle_1 as subtitle };
        export namespace buttons {
            export const height: number;
            export const flexDirection: string;
            const backgroundColor_3: string;
            export { backgroundColor_3 as backgroundColor };
            export const justifyContent: string;
        }
        export namespace button {
            const flex_1: number;
            export { flex_1 as flex };
            const backgroundColor_4: string;
            export { backgroundColor_4 as backgroundColor };
            const justifyContent_1: string;
            export { justifyContent_1 as justifyContent };
            export const alignItems: string;
        }
        export namespace buttonText {
            const fontSize_3: number;
            export { fontSize_3 as fontSize };
            const lineHeight_1: number;
            export { lineHeight_1 as lineHeight };
            const color_3: string;
            export { color_3 as color };
            export const fontFamily: string;
        }
    }
    namespace darkMode {
        const backgroundColor_5: DynamicColor;
        export { backgroundColor_5 as backgroundColor };
    }
}
export default _default;
declare const PADDING: 29;
declare const HAIRLINE_COLOR: "rgba(0,0,0,0.15)";
declare const SEPARATOR_HEIGHT: any;
declare const MODAL_MARGIN: 10;
declare const MODAL_WIDTH: number;
import DynamicColor from "../ui/Style/DynamicColor";