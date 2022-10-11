import { useUrlQueryParam } from "utils/url"
import { useMemo } from 'react';
import { useProject } from '../../utils/useProject';
//项目列表的搜索参数
export const useProjectSearchParams = ( ) =>{
    const [param,setParam] = useUrlQueryParam(['name','personId']);
    return [useMemo(()=> ({...param,personId:Number(param.personId) || undefined}) ,[param])
        ,setParam] as const
}

export const useProjectsQueryKey=() => {
    const [params]=useProjectSearchParams()
    return ['projects',params];
}

export const useProjectModal=()=>{
    const  [{projectCreate,editingProjectId},setProjectCreateAndId]=useUrlQueryParam([
        'projectCreate','editingProjectId'
    ])
    const {data:editingProject,isLoading}=useProject(Number(editingProjectId))
    
    const open=()=> setProjectCreateAndId({projectCreate:true})
    const close=()=> {
        setProjectCreateAndId({projectCreate:undefined,editingProjectId:undefined});
        
    }
    const startEdit = (id:number) => setProjectCreateAndId({editingProjectId:id})

    return {
        projectModalOpen: projectCreate === 'true' || Boolean(editingProjectId),
        open,
        close,
        startEdit,
        editingProject,
        isLoading
     } 
    /*return [
        projectCreate === 'true',
        open,
        close
    ] as const*/
}