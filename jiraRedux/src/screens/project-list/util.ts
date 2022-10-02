import { useUrlQueryParam } from "utils/url"
import { useMemo } from 'react';
//项目列表的搜索参数
export const useProjectSearchParams = ( ) =>{
    const [param,setParam] = useUrlQueryParam(['name','personId']);
    return [useMemo(()=> ({...param,personId:Number(param.personId) || undefined}) ,[param])
        ,setParam] as const
}

/*export const useProjectModal=()=>{
    const  [{projectCreate},setProjectCreate]=useUrlQueryParam([
        'projectCreate'
    ])

    const open=()=> setProjectCreate({projectCreate:true})
    const close=()=> setProjectCreate({projectCreate:false})
    return [
        projectCreate === 'true',
        open,
        close
    ] as const
}*/