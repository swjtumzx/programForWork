import React, { CSSProperties, FC, ReactNode } from "react";
declare type MenuMode = 'horizontal' | 'vertical';
declare type SelectCallback = (selectedIndex: string) => void;
export interface MenuProps {
    /**默认展示第几项 */
    defaultIndex?: string;
    className?: string;
    /**菜单横向排布还是纵向排布 `"horizontal" | "vertical"` */
    mode?: MenuMode;
    style?: CSSProperties;
    /** 旋转切换回调 */
    onSelect?: SelectCallback;
    /**是否默认展开子菜单 */
    defaultOpenSubMenus?: string[];
    children?: ReactNode | string;
}
interface IMenuContext {
    index: string;
    onSelect?: SelectCallback;
    mode?: MenuMode;
    defaultOpenSubMenus?: string[];
}
export declare const MenuContext: React.Context<IMenuContext>;
declare const Menu: FC<MenuProps>;
export default Menu;
