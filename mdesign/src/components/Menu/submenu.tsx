import React, { FC, ReactNode,useContext, useState } from "react";
import { MenuContext } from "./menu";
import classNames from 'classnames';
import { MenuItemProps } from "./menuItem";
import Icon from '../Icon/icon';
import Transition from "../Transition/transition";

export interface SubMenuProps{
    index?:string,
    className?:string,
    title:string,
    children?: ReactNode | string
}

/**
 *  设置下拉菜单
 */
const SubMenu:FC<SubMenuProps> = ({index,title,children,className})=>{
    const context=useContext(MenuContext);
    const openSubMenus=context.defaultOpenSubMenus as Array<string>
    const isOpened= (index && context.mode==='vertical') ? openSubMenus.includes(index) : false;
    
    const [menuOpen,setOpen]=useState(isOpened)
    const classes=classNames('menu-item submenu-item',className,{
        'is-active':context.index===index,
        'is-opened':menuOpen,
        'is-vertical':context.mode === 'vertical'
    })

    const handleClick=(e:React.MouseEvent)=>{
        e.preventDefault();
        setOpen(!menuOpen)
    }

    let timer:any;
    const handleMouse=(e:React.MouseEvent,toggle:boolean)=>{
        clearTimeout(timer);
        e.preventDefault();
        timer=setTimeout(() => {
            setOpen(toggle)
        }, 300);
    }

    const clickEvents=context.mode ==='vertical'?{
        onClick:handleClick
    }:{}

    const hoverEvents=context.mode === 'horizontal'?{
        onMouseEnter:(e:React.MouseEvent)=> handleMouse(e,true),
        onMouseLeave:(e:React.MouseEvent)=> handleMouse(e,false)
    }:{}

    const renderChildren=()=>{
        const subMenuClasses=classNames('m-submenu',{
            'menu-opened':menuOpen
        })
        const childrenComponent=React.Children.map(children,(child,i)=>{
            const childElement=child as React.FunctionComponentElement<MenuItemProps>;
            if(childElement.type.displayName === 'MenuItem'){
                return React.cloneElement(childElement,{
                    index:`${index}-${i}`
                })
            }else{
                console.log('MenuItem needed in SubMenu');
            }
        })
        return <Transition
            in={menuOpen}
            timeout={300}
            animation="zoom-in-top"
        >
            <ul className={subMenuClasses}>
                {childrenComponent}
            </ul>
        </Transition>
    }
    
    return <li style={{isolation: 'isolate'}} key={index} className={classes} {...hoverEvents}>
        <div className="submenu-title" onClick={handleClick} {...clickEvents}>
            {title}
            <Icon className="arrow-icon" icon="angle-down"/>
        </div>
        {renderChildren()}
    </li>
}

SubMenu.displayName="SubMenu"

export default SubMenu