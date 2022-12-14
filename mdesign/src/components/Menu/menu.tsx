import classNames from "classnames";
import React, { createContext, CSSProperties, FC, ReactNode, useState } from "react";
import { MenuItemProps } from "./menuItem";

type MenuMode = 'horizontal' | 'vertical'
type SelectCallback = (selectedIndex: string) => void;

export interface MenuProps {
  /**默认展示第几项 */
  defaultIndex ?: string;
  className ?: string;
  /**菜单横向排布还是纵向排布 `"horizontal" | "vertical"` */
  mode ?: MenuMode;
  style ?: CSSProperties;
  /** 旋转切换回调 */
  onSelect ?: SelectCallback;
  /**是否默认展开子菜单 */
  defaultOpenSubMenus ?: string[];
  children?:ReactNode | string
}

interface IMenuContext{
    index:string;
    onSelect?:SelectCallback;
    mode?:MenuMode;
    defaultOpenSubMenus ?: string[];
}

export const MenuContext=createContext<IMenuContext>({index:'0'})

const Menu:FC<MenuProps> = (props)=>{
    const { className, mode, style, children, defaultIndex, onSelect,defaultOpenSubMenus }=props;
    const [currActive,setActive] =useState(defaultIndex)
    const classes=classNames('m-menu',className,{
        'menu-vertical': mode === 'vertical',
        'menu-horizontal':mode === 'horizontal'
    })
    const handleClick=(index:string)=>{
        setActive(index);
        if(onSelect){
            onSelect(index)
        }
    }
    const passedContext:IMenuContext={
        index:currActive || '0',
        onSelect:handleClick,
        mode:mode,
        defaultOpenSubMenus
    }
    const renderChildren=()=>{
        return React.Children.map(children,(child,index)=>{
            const childElement=child as React.FunctionComponentElement<MenuItemProps>;
            const {displayName}=childElement.type;
            if(displayName==='MenuItem' || displayName==='SubMenu'){
                return React.cloneElement(childElement,{
                    index:String(index)
                });
            }else{
                console.error("MenuItem needed in Menu")
            }
        })
    }

    return <ul className={classes} style={style} data-testid="test-menu">
        <MenuContext.Provider value={passedContext}>
            {renderChildren()}
        </MenuContext.Provider>
    </ul>
}

Menu.defaultProps={
    defaultIndex:'0',
    mode:'horizontal',
    defaultOpenSubMenus:[]
}

export default Menu