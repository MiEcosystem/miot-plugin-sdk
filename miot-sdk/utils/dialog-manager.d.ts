export function hideDialog(customKey: any): void;
export function showError({ message, timeout }: {
    message?: string;
    timeout?: number;
} | undefined, customKey: any): void;
export function showLoading({ message }: {
    message?: string;
} | undefined, customKey: any): void;
export function showMessage({ message, buttons, messageStyle }: {
    message?: string;
    buttons?: {
        text: string;
        callback: typeof NOOP;
    }[];
    messageStyle?: {};
} | undefined, customKey: any): void;
export function showInput({ message, inputs, onConfirm }: {
    message?: string;
    inputs?: {
        placeholder: string;
        defaultValue: string;
    }[];
    buttons: {
        text: string;
        callback: typeof log;
    }[];
    onConfirm?: typeof log;
} | undefined, customKey: any): void;
export function showSelector({ message, selectedIndexs, options, onSelect }: {
    message?: string;
    selectedIndexs?: never[];
    options?: never[];
    onSelect?: typeof log;
} | undefined, customKey: any): void;
export function showCustom({ title, subtitle, buttons, onConfirm, component, componentProps, ...rest }: {
    title?: string;
    subtitle?: string;
    buttons?: {
        text: string;
        callback: typeof hideDialog;
    }[];
    onConfirm: any;
    component: any;
    componentProps: any;
} | undefined, customKey: any): void;
export function showTimepicker(params: any, customKey: any): void;
export namespace TYPES {
    const loading: string;
    const message: string;
    const input: string;
    const selector: string;
    const timepicker: string;
    const custom: string;
}
export class DialogComponent extends React.Component<any, any, any> {
  constructor(props: Readonly<any>);
  constructor(props: any, context?: any);
    hide: () => void;
}
export namespace DialogComponent {
    namespace propTypes {
        const customKey: PropTypes.Requireable<string>;
    }
}
import React from "react";
import PropTypes from "prop-types";