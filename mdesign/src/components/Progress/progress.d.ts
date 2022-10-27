import React from "react";
import { ThemeProps } from "../Icon/icon";
export interface ProgressProps {
    percent: number;
    strokeHeight?: number;
    showText?: boolean;
    styles?: React.CSSProperties;
    theme?: ThemeProps;
}
export declare const Progress: {
    (props: ProgressProps): JSX.Element;
    defaultProps: {
        strokeHeight: number;
        showText: boolean;
        theme: string;
    };
};
