import { useCallback, useMemo } from "react";
import { useLocation } from "react-router"
import { useTask } from "utils/task";
import { useUrlQueryParam } from "utils/url";
import { useProject } from '../../utils/useProject';
import { useDebounce } from '../../utils/index';

export const useProjectIdUrl=()=>{
    const {pathname}=useLocation();
    const id = pathname.match(/projects\/(\d+)/)?.[1];
    return Number(id)
}//通过正则获取projectId

export const useProjectInUrl = () => useProject(useProjectIdUrl())

export const useKanbanSearchParams=()=> ({projectId:useProjectIdUrl()});

export const useKanbansQueryKey= () =>  ['kanbans',useKanbanSearchParams()] ;

export const useTasksSearchParams=()=> {
    const [param]=useUrlQueryParam([
        'name','typeId','processorId','tagId'
    ])
    const projectId=useProjectIdUrl();
    const debouncedName=useDebounce(param.name,200)
    return useMemo(()=> ({
        projectId,
        name:debouncedName || undefined,
        typeId:Number(param.typeId) || undefined,
        tagId:Number(param.tagId) || undefined,
        processorId:Number(param.processorId) || undefined,
    }),[projectId,param,debouncedName])
};

export const useTasksQueryKey= () =>  ['tasks',useTasksSearchParams()] ;

export const useTasksModal=()=>{
    const [{editingTaskId},setEditingTaskId]=useUrlQueryParam(['editingTaskId']);
    const {data:editingTask,isLoading}=useTask(Number(editingTaskId));

    const startEdit=useCallback((id:number)=>{
        setEditingTaskId({editingTaskId:id})
    },[setEditingTaskId])

    const close = useCallback(() => {
        setEditingTaskId({ editingTaskId: "" });
      }, [setEditingTaskId]);


      return {
        editingTaskId,
        editingTask,
        startEdit,
        close,
        isLoading,
      };
}