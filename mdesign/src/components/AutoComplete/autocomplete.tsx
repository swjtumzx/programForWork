import React, { ChangeEvent, ReactElement,KeyboardEvent, useEffect, useState, useRef } from "react";
import Icon from "../Icon/icon";
import Input, { InputProps } from "../Input/input";
import { useDebounce } from '../../hooks/useDebounce';
import classNames from 'classnames';
import { useClickOutside } from "../../hooks/useClickOutside";

interface DataSourceObject{
    value:string;
}

export type DataSourceType<T={}>= T & DataSourceObject


export interface AutoCompleteProps extends Omit<InputProps,'onSelect'>{
    onSelect?:(item : DataSourceType) => void;
    fetchSuggestions:(str:string) => DataSourceType[] | Promise<DataSourceType[]>;
    renderOption?: (item:DataSourceType) => ReactElement;
}

/**
 * ## AutoComplete 自动完成
 * ---
 * 输入框自动完成功能。
 * 
 * ### 何时使用
 * ---
 * 需要自动完成时。
 * ### 选项
 *  onSelect?:(item : DataSourceType) => void;
 * 
 *  fetchSuggestion:(str:string) => DataSourceType[] | Promise<DataSourceType[]>;
 * 
 *  renderOption?: (item:DataSourceType) => ReactElement;
 * 
 */

export const AutoComplete=(props:AutoCompleteProps)=>{
    const {onSelect,fetchSuggestions,value,renderOption,...restProps}=props;
    const [inputValue,setInputValue]=useState(value as string);
    const [suggestions,setSuggestions]=useState<DataSourceType[]>([]);
    const [loading,setLoading]=useState(false);
    const [highlightIndex,setHighlightIndex]=useState(-1);
    const triggerSearch=useRef(false);
    const componentRef=useRef<HTMLDivElement>(null);
    const debouncedValue=useDebounce(inputValue);


    const handleChange=(e:ChangeEvent<HTMLInputElement>)=>{
        const value=e.target.value.trim()
        setInputValue(value)
        triggerSearch.current=true;
    }

    useClickOutside(componentRef,()=>setSuggestions([]))
    useEffect(()=>{
        if(debouncedValue && triggerSearch.current){
            const results=fetchSuggestions(debouncedValue);
            if(results instanceof Promise){
                setLoading(true)
                results.then(data => {
                    setLoading(false);
                    return setSuggestions(data)
                })
            }else{
                setSuggestions(results)
            }
        }else{
            setSuggestions([])
        }
        setHighlightIndex(-1)
    },[debouncedValue,fetchSuggestions])

    const handleSelect=(item:DataSourceType)=>{
        setInputValue(item.value)
        setSuggestions([])
        if(onSelect) onSelect(item)
        triggerSearch.current=false
    }

    const renderTemplate=(item:DataSourceType)=>{
        return renderOption ? renderOption(item) : item.value
    }
    const GenerateDropdown=()=>{
        return <ul className="suggestion-list">
            { suggestions.map((v,i)=>{
                const cnames=classNames('suggestion-item',{
                    'item-highlighted':i === highlightIndex
                })
                return <li className={cnames} onClick={ () =>handleSelect(v)} key={v.value}>
                    {renderTemplate(v)}
                </li>
            })
            }
        </ul>
    }
    const highlight=(index:number)=>{
        if(index<0) index=0
        if(index>= suggestions.length){
            index=suggestions.length-1;
        }
        setHighlightIndex(index)
    }
    const handleKeyDown=(e:KeyboardEvent<HTMLInputElement>)=>{
        switch(e.keyCode){
            case 13: suggestions[highlightIndex] && handleSelect(suggestions[highlightIndex]); break;
            case 38: highlight(highlightIndex-1); break;
            case 40: highlight(highlightIndex+1); break;
            case 27: setSuggestions([]); break;
            default: break;
        }
    }

    return <div className="m-auto-complete" ref={componentRef}>
        <Input onChange={handleChange} value={inputValue} {...restProps} onKeyDown={handleKeyDown}/>
        {loading && <ul><Icon className="suggestion-loading-icon" icon={'spinner'} spin></Icon></ul>}
        {suggestions.length ? <GenerateDropdown /> : null}
    </div>
}

