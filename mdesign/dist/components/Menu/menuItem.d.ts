import React, { ReactNode } from "react";
export interface MenuItemProps {
    index?: string;
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
    children?: ReactNode | string;
}
declare function MenuItem(props: MenuItemProps): JSX.Element;
declare namespace MenuItem {
    var displayName: string;
}
export default MenuItem;
