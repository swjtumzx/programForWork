import { FullPageErrorFallBack, FullPageLoading } from "components/lib";
import React, { ReactNode } from "react";
import { User } from "screens/project-list/User";
import { useMount } from "utils";
import { http } from "utils/http";
import { useAsync } from "utils/useAsync";
import * as auth from '../auth-provider'
import { useQueryClient } from 'react-query';

const BootstrapUser=async ()=>{
    let user=null;
    const token = auth.getToken();
    if(token){
        const data = await http('me',{token});
        user=data.user;
    }
    return user;
}

interface AuthForm{
    username:string;
    password:string;
}

const AuthContext= React.createContext<{
    user:User|null;
    login: (form:AuthForm) => Promise<void>;
    logout: () => Promise<void>;
    register: (form:AuthForm) => Promise<void>;
}|undefined>(undefined);//类型检查，创建了一个context
AuthContext.displayName='AuthContext';//React DevTools 使用该字符串来确定context要显示的内容

export const AuthProvider=({children}:{children:ReactNode})=>{
    const {data:user,error,isLoading,isIdle,isError,run,setData:setUser} = useAsync<User|null>();//为整个项目提供user
    const queryClient=useQueryClient();
    //login，register设置状态的两种方法相同，函数式编程
    const login = (form:AuthForm) => auth.login(form).then(setUser)
    const register = (form:AuthForm) => auth.register(form).then(user => {
        setUser(user);
        queryClient.clear();
    })
    const logout = () => auth.logout().then(() => setUser(null))
    useMount(()=>{
        run(BootstrapUser());
    })
    if(isError){
        return <FullPageErrorFallBack error={error as Error}></FullPageErrorFallBack>
    }
    if(isLoading || isIdle){
        return <FullPageLoading/>
    }

    return <AuthContext.Provider children={children} value={{user,login,register,logout}}/>//返回一个provider组件，提供了value中的属性与方法
}

export const useAuth =()=>{
    const context=React.useContext(AuthContext);
    if(!context){
        throw new Error('useAuth需在AuthProvider中使用')
    }
    return context;
}