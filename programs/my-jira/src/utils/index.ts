import { useEffect, useState } from "react";

export const isFalse=(value:any) => value === 0 ? false : !value   

export const  cleanObject=(object:Object)=>{
    let res={...object};
    Object.keys(res).forEach(key =>{
        // @ts-ignore
        if(isFalse(res[key])){
            // @ts-ignore
            delete res[key]
        }
    })
    return res;
}

export const useMount=(callback:()=>void)=>{
    useEffect(()=>{
        callback();
    },[])
}

export const useDebounce=(param:any,delay?:number)=>{//?:表示可传可不传
    const [debouncedParam,setDebouncedParam]=useState(param);

    useEffect(()=>{
        //每次param更新之后都设置了一个定时器
        const timeout=setTimeout(()=>{setDebouncedParam(param)},delay)

        //useEffect的回调函数执行时清理掉上一次函数执行时设置的定时器，以此起到防抖的作用
        return ()=> clearTimeout(timeout)
    },[param,delay])

    return debouncedParam
}