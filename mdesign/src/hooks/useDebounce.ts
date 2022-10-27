import  { useEffect, useState } from "react";

export const useDebounce=(param:any,delay:number=200)=>{//?:表示可传可不传
    const [debouncedParam,setDebouncedParam]=useState(param);
    useEffect(()=>{
        //与仿jira项目中相同
        const timeout=setTimeout(()=>{setDebouncedParam(param)},delay)

        return ()=> clearTimeout(timeout)
    },[param,delay])

    return debouncedParam
}