import React, { FC, CSSProperties, ReactNode } from 'react';
declare type valueType = string | number;
declare type selectSizeType = 'large' | 'middle' | 'small';
export interface SelectProps {
    allowClear?: boolean;
    autoFocus?: boolean;
    className?: string;
    showSearch?: boolean;
    defaultValue?: valueType;
    disabled?: boolean;
    dropdownClassName?: string;
    style?: CSSProperties;
    dropdownStyle?: CSSProperties;
    listHeight?: number;
    maxTagCount?: number;
    notFoundContent?: ReactNode;
    placeholder?: string;
    showArrow?: boolean;
    size?: selectSizeType;
    value?: valueType;
    onBlur?: Function;
    onFocus?: Function;
    onSelect?: (value: any, ...rest: any[]) => void;
    onSearch?: (value: string) => void;
    filterOption?: (inputValue: string, option?: any) => boolean;
    onChange?: (value: any, ...rest: any[]) => void;
    open?: boolean;
    loading?: boolean;
    children?: ReactNode;
}
export interface ISelectContext {
    valueText: valueType;
    onSelect?: (value: valueType) => void;
    defaultActiveFirstOption?: boolean;
    defaultValue?: valueType;
    dropdownStyle?: CSSProperties;
    dropdownClassName?: string;
}
export declare const SelectContext: React.Context<ISelectContext>;
export declare const Select: FC<SelectProps>;
export default Select;
