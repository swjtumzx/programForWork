import { useMutation } from 'react-query';
import { useQuery, useQueryClient } from 'react-query';
import { Project } from '../screens/project-list/list';
import { useHttp } from './http';

export const useProjects=(param?:Partial<Project>) =>{
    const client=useHttp();
    return useQuery<Project[],Error>(['projects',param],()=> client('projects',{data:param}));
}

export const useEditProject =()=>{
    const queryClient=useQueryClient();
    const client=useHttp();
    return useMutation((params:Partial<Project>)=> client(`projects/${params.id}`,{
        method:'PATCH',
        data:params
    }),{
        onSuccess:()=> queryClient.invalidateQueries('projects')
    }
    )
}

export const useAddProject =()=>{
    const queryClient=useQueryClient();
    const client=useHttp();
    return useMutation((params:Partial<Project>)=> client(`projects/${params.id}`,{
        method:'POST',
        data:params
    }),{
        onSuccess:()=> queryClient.invalidateQueries('projects')
    }
    )
}

export const useProject=(id?:number)=>{
    const client=useHttp();
    return useQuery<Project>(['project',{id}],() => client(`projects/${id}`),
    {
        enabled:Boolean(id)//id为undefined时不重新发送请求
    })
}



/* export const useProjects=(param?:Partial<Project>) =>{
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

*/