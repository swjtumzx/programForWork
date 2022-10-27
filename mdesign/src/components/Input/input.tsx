import React, { FC, InputHTMLAttributes, ReactElement, ChangeEvent} from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import classNames from 'classnames';
import Icon from '../Icon/icon';

type InputSize = 'lg' | 'sm'

// 使用 Omit 忽略掉input定义的 size 
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
  /** 是否禁用 Input */
  disabled ?: boolean;
  /** 设置 Input 大小 `lg | sm` */
  size ?: InputSize;
  /** 添加图标，在右侧悬浮添加一个图标，用于提示 */
  icon ?: IconProp;
  /** 添加前缀 用于配置一些固定组合 */
  prepend ?: string | ReactElement;
  /** 添加后缀 用于配置一些固定组合 */
  append ?: string | ReactElement;
  onChange ?: (e:ChangeEvent<HTMLInputElement>) => void
}

/**
 * ## Input 输入框
 * ---
 * 通过鼠标或键盘输入内容，是最基础的表单域的包装。
 * 
 * ### 何时使用
 * ---
 * - 需要用户输入表单域内容时。
 * - 提供组合型输入框，带搜索的输入框，还可以进行大小选择。 
 * 
 */
 export const Input: FC<InputProps> = (props) => {
    //取出props
    const {children,disabled,size,icon,prepend,append,style,...restProps} = props
    const classes = classNames('m-input-wrapper', {
        [`input-size-${size}`]: size,
        'is-disabled': disabled,
        'input-group': prepend || append,
        'input-group-append': !!append,
        'input-group-prepend': !!prepend
      })
    
      const fixControlledValue = (value: any) => {
        if (value === null || value===undefined) {
          return ''
        }
        return value
      }//调试时使用受控组件时，如果一开始的值为空或者undefined，会弹出警告，故存在value时检查value的值
    
      if ('value' in props) {
        delete restProps.defaultValue
        restProps.value = fixControlledValue(props.value)
      }//兼容受控非受控组件
    
      return (
        <div className={classes} style={style}>
          {prepend && <div className="m-input-group-prepend">{prepend}</div>}
          {icon && <div className="icon-wrapper"><Icon icon={icon} title={`title-${icon}`}></Icon></div>}
          <input 
            className="m-input-inner"
            disabled={disabled}
            {...restProps}
          />
          {append && <div className="m-input-group-append">{append}</div>}
        </div>
      )
}

const defaultStyle={width:'300px'}

Input.defaultProps={
    placeholder:'Input',
    size:'sm',
    style:defaultStyle
}
    
export default Input;