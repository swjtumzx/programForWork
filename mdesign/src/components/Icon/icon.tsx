import React, { FC } from "react";
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import classNames from 'classnames';

export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark' 

export interface IconProps extends FontAwesomeIconProps {
  /** 不同主题 */
  theme ?: ThemeProps
}

const Icon:FC<IconProps>=(props)=>{
    const {className,theme,...restProps} =props;
    const classes=classNames('m-icon',className,{
        [`icon-${theme}`]:theme
    })
    return <FontAwesomeIcon className={classes} {...restProps}/>
}

export default Icon