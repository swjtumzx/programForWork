import React from "react";
import { ThemeProps } from "../Icon/icon";

export interface ProgressProps{
    percent:number;
    strokeHeight?:number;
    showText?:boolean;
    styles?:React.CSSProperties;
    theme?:ThemeProps
}
export const Progress=(props:ProgressProps)=>{
    const {percent,strokeHeight,showText,styles,theme}=props;

    return <div className="m-progress-bar" style={styles}>
        <div className="m-progress-bar-outer" style={{height:`${strokeHeight}px`}}>
            <div className={`m-progress-bar-inner color-${theme}`} style={{width:`${percent}%`}}>
                {showText ? <span className="inner-text">{`${percent}`}</span> : null}
            </div>
        </div>
    </div>
}

Progress.defaultProps={
    strokeHeight: 15,
    showText:true,
    theme:'primary'
}