import { FC } from "react";
import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
export declare type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark';
export interface IconProps extends FontAwesomeIconProps {
    /** 不同主题 */
    theme?: ThemeProps;
}
declare const Icon: FC<IconProps>;
export default Icon;
