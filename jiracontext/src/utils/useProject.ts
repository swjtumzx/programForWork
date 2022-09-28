import { useEffect } from 'react';
import { cleanObject } from 'utils';
import { Project } from '../screens/project-list/list';
import { useHttp } from './http';
import { useAsync } from './useAsync';

export const useProject=(param?:Partial<Project>) =>{
    const {run,...result}=useAsync<Project[]>();
    const client=useHttp();
    useEffect(()=>{
        run(client("projects",{data:cleanObject(param || {})}))
    //eslint-disable-next-line
    },[param])
    return result;
}

export const useEditProject =()=>{
    const {run,...rest} = useAsync();
    const client=useHttp();
    const mutate = (params:Partial<Project>)=>{
        return run(client(`projects/${params.id}`,{
            data:params,
            method:'PATCH'
        }))
    }
    return {
        mutate,
        ...rest
    }
}

export const useAddProject =()=>{
    const {run,...rest} = useAsync();
    const client=useHttp();
    const mutate = (params:Partial<Project>)=>{
        return run(client(`projects/${params.id}`,{
            data:params,
            method:'POST'
        }))
    }
    return {
        mutate,
        ...rest
    }
}