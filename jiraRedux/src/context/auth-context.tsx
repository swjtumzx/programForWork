import { FullPageErrorFallBack, FullPageLoading } from "components/lib";
import React, { ReactNode } from "react";
import { User } from "screens/project-list/search-panel";
import { useMount } from "utils";
import { useAsync } from "utils/useAsync";
import * as auth from '../auth-provider'
import * as authStore from 'store/auth.slice'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/exports';
import { bootstrap, selectUser } from "store/auth.slice";
import { http } from "utils/http";

export interface AuthForm{
    username:string;
    password:string;
}

export const BootstrapUser=async ()=>{
    let user=null;
    const token = auth.getToken();
    if(token){
        const data = await http('me',{token});
        user=data.user;
    }
    return user;
  }

export const AuthProvider=({children}:{children:ReactNode})=>{
    const dispatch: (...args:any[])=> Promise<User>=useDispatch();
    const {data:user,error,isLoading,isIdle,isError,run,setData:setUser} = useAsync<User|null>();
    useMount(()=> {
        run(dispatch(bootstrap()))
    })
    if(isIdle || isLoading){
        return <FullPageLoading/>
    }
    if(isError){
        return <FullPageErrorFallBack error={error as Error}></FullPageErrorFallBack>
    }

    return <div>{children}</div>
}

export const useAuth =()=>{
    const dispatch: ((...args:any[])=> Promise<User>) =useDispatch();
    const user=useSelector(selectUser)
    const login = (form:AuthForm) => dispatch(authStore.login(form));
    const register = (form:AuthForm) => dispatch(authStore.register(form));
    const logout = () => dispatch(authStore.logout());
    return {
        user,
        login,
        register,
        logout
    };
}