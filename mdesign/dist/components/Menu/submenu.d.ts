import { FC, ReactNode } from "react";
export interface SubMenuProps {
    index?: string;
    className?: string;
    title: string;
    children?: ReactNode | string;
}
declare const SubMenu: FC<SubMenuProps>;
export default SubMenu;
