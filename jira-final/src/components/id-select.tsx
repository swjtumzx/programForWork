import React from "react";
import { Select } from "antd";

type SelectProps = React.ComponentProps<typeof Select>

interface IdSelectProps extends Omit<SelectProps,'value'|'onChange'  | 'options'>{
    value?: string | number | undefined | null,
    onChange?: (value?:number) => void | undefined,
    defaultOptionName?:string,
    options?:{name:string,id:number}[]
}
/* 
value 可以选择传入多种类型的值
onChange只会回调number | undefined类型
当 isNaN(Number(value))为true的时候选择默认类型

*/
export const IdSelect=(props:IdSelectProps)=>{
    const {value,onChange,defaultOptionName,options, ...restProps} = props;
    return <Select 
    {...restProps}
    value={options?.length ? toNumber(value) : 0}
     onChange={value => onChange?.(toNumber(value)) || undefined }>
        {defaultOptionName ? <Select.Option value={0}>{defaultOptionName}</Select.Option> : null}
        {options?.map(option =>  <Select.Option key={option.id} value={option.id}>{option.name}</Select.Option>)}
     </Select>
}

const toNumber =(value:unknown) => isNaN(Number(value)) ? 0 : Number(value);