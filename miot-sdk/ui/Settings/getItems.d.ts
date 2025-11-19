export function useClicked(key: any): (boolean | (() => void))[];
export default function getItems(innerOptions: any, keys: any, values: any, params: any, defaultOptions: any): any;
export function delegatePress(cb: any, params: any, key: any, click: any): () => void;
export function getAllAndDefaultOptions(innerOptions: any): {
    options: {};
    defaultOptions: any[];
};
export const clickedItems: any[];
export namespace itemPropTypes {
    const params: PropTypes.Requireable<object>;
}
import PropTypes from "prop-types";