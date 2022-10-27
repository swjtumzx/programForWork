import { FC, ReactNode } from "react";
export interface SubMenuProps {
    index?: string;
    className?: string;
    title: string;
    children?: ReactNode | string;
}
/**
 *  设置下拉菜单
 */
declare const SubMenu: FC<SubMenuProps>;
export default SubMenu;
