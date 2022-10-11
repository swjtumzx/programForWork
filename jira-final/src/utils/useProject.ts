import { useMutation ,useQuery, QueryKey} from 'react-query';
import { Project } from "../screens/project-list/Project";
import { useHttp } from './http';
import { useAddConfig, useDeleteConfig, useEditConfig } from './use-optimistic-options';

export const useProjects=(param?:Partial<Project>) =>{
    const client=useHttp();
    return useQuery<Project[],Error>(['projects',param],() => client(`projects`,{data:param}))
}

export const useEditProject = (queryKey: QueryKey) => {
    const client = useHttp();
    return useMutation(
      (params: Partial<Project>) =>
        client(`projects/${params.id}`, {
          method: "PATCH",
          data: params,
        }),
      useEditConfig(queryKey)
    );
  };

  export const useAddProject = (queryKey: QueryKey) => {
    const client = useHttp();
  
    return useMutation(
      (params: Partial<Project>) =>
        client(`projects`, {
          data: params,
          method: "POST",
        }),
      useAddConfig(queryKey)
    );
  };
  
  export const useDeleteProject = (queryKey: QueryKey) => {
    const client = useHttp();
  
    return useMutation(
      ({ id }: { id: number }) =>
        client(`projects/${id}`, {
          method: "DELETE",
        }),
      useDeleteConfig(queryKey)
    );
  };

export const useProject=(id?:number)=>{
    const client=useHttp();
    return useQuery(
        ['project',id],
        ()=> client(`projects/${id}`),
        {
            enabled:Boolean(id)//id有值时才触发useProject
        }
    )
}