import PropTypes from 'prop-types';
import React from 'react';
import { ConfigContext } from '../configProvider';
interface MHDatePickerProps {
    type: 'single' | 'time24' | 'time12' | 'date';
    singleType: 'month' | 'day' | 'hour' | 'minute' | 'second';
    animationType: 'slide' | 'fade' | 'none';
    visible: boolean;
    title: string;
    showSubtitle: boolean;
    confirmColor: string;
    current: Array<string> | Array<number> | Date;
    min: Array<string> | Array<number> | Date;
    max: Array<string> | Array<number> | Date;
    onSelect: (result: {
        rawArray: Array<string>;
        rawString: string;
        data: Date;
    }) => void;
    onDismiss: () => void;
}
interface MHDatePickerState {
    visible: boolean;
    currentArray: Array<string>;
    dataSourceArray: Array<Array<string>>;
    subtitle: string;
}
declare class MHDatePicker extends React.Component<MHDatePickerProps, MHDatePickerState> {
    static contextType: React.Context<Partial<Pick<import("../configProvider").ConfigContextProps, "language" | "colorScheme" | "environment"> & {
        theme: import("../../styles/themes").ITheme;
    }>>;
    context: React.ContextType<typeof ConfigContext>;
    static propTypes: {
        animationType: PropTypes.Requireable<string>;
        visible: PropTypes.Requireable<boolean>;
        title: PropTypes.Requireable<string>;
        showSubtitle: PropTypes.Requireable<boolean>;
        confirmColor: PropTypes.Requireable<string>;
        type: PropTypes.Requireable<string>;
        singleType: PropTypes.Requireable<string>;
        current: PropTypes.Validator<Date | (string | null | undefined)[] | (number | null | undefined)[]>;
        min: PropTypes.Requireable<Date | (string | null | undefined)[] | (number | null | undefined)[]>;
        max: PropTypes.Requireable<Date | (string | null | undefined)[] | (number | null | undefined)[]>;
        datePickerStyle: PropTypes.Requireable<object>;
        onSelect: PropTypes.Requireable<(...args: any[]) => any>;
        onDismiss: PropTypes.Requireable<(...args: any[]) => any>;
        accessible: PropTypes.Requireable<boolean>;
        accessibilityLabel: PropTypes.Requireable<string | number>;
        accessibilityHint: PropTypes.Requireable<string | number>;
    };
    static defaultProps: {
        animationType: string;
        visible: boolean;
        title: string;
        showSubtitle: boolean;
        confirmColor: string;
        type: string;
        singleType: string;
        datePickerStyle: {
            pickerInnerStyle: {
                lineColor: string;
                textColor: string;
                fontSize: number;
                selectTextColor: string;
                selectFontSize: number;
                unitTextColor: string;
                unitFontSize: number;
                rowHeight: number;
                selectBgColor: string;
            };
            unlimitedHeightEnable: boolean;
            allowFontScaling: boolean;
            titleNumberOfLines: number;
            subTitleNumberOfLines: number;
            titleStyle: null;
            subTitleStyle: null;
            leftButtonNumberOfLines: number;
            rightButtonNumberOfLines: number;
            leftButtonStyle: null;
            rightButtonStyle: null;
        };
        onSelect: () => void;
    };
    static TYPE: {
        SINGLE: string;
        TIME24: string;
        TIME12: string;
        DATE: string;
    };
    static SINGLE_TYPE: {
        MONTH: string;
        DAY: string;
        HOUR: string;
        MINUTE: string;
        SECOND: string;
    };
    constructor(props: MHDatePickerProps, context: React.ContextType<typeof ConfigContext>);
    private colorDatePickerSelectBg;
    getSubtitle(arr: any, context: React.ContextType<typeof ConfigContext>): any;
    convert(cur: Date | Array<number>, context: React.ContextType<typeof ConfigContext>): Array<string>;
    convertTo12(arr: any, context: React.ContextType<typeof ConfigContext>): any[];
    slice<T>(arr: Array<T>, head: number, tail: number): Array<T>;
    getYears(min: any, max: any, context: any): string[];
    generateArray(min: any, max: any): string[];
    init(props: any, context: React.ContextType<typeof ConfigContext>): {
        currentArray: string[];
        dataSourceArray: string[][];
    };
    UNSAFE_componentWillReceiveProps(newProps: MHDatePickerProps): void;
    private checkUnlimitedHeightEnable;
    renderTitle(): JSX.Element;
    renderContent(): JSX.Element;
    renderButton(): JSX.Element;
    render(): JSX.Element;
    updateDays(newCurrentArray: any, newDataSourceArray: any): void;
    _onValueChanged(index: any, data: any): void;
    dismiss(): void;
    array2Date(): Date | null;
    confirm(): void;
}
export default MHDatePicker;
