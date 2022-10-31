import { FC, CSSProperties, ReactNode } from 'react';
declare type selValueType = string | number;
export interface SelectItemProps {
    disabled?: boolean;
    value: selValueType;
    className?: string;
    style?: CSSProperties;
    children?: ReactNode;
}
export declare const SelectItem: FC<SelectItemProps>;
export default SelectItem;
