import { useEffect } from 'react';
import { User } from 'screens/project-list/search-panel';
import { cleanObject } from 'utils';
import { Project } from '../screens/project-list/list';
import { useHttp } from './http';
import { useAsync } from './useAsync';

export const useUsers=(param?:Partial<User>) =>{
    const {run,...result}=useAsync<User[]>();
    const client=useHttp();
    useEffect(()=>{
        run(client("users",{data:cleanObject(param || {})}))
    //eslint-disable-next-line
    },[param])
    return result;
}