import React, { ReactNode } from "react";
import { useState } from 'react';
import { User } from "screens/project-list/search-panel";
import * as auth from '../auth-provider'

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
    const [user,setUser]=useState<User | null>(null);

    
    //login，register设置状态的两种方法相同，函数式编程
    const login = (form:AuthForm) => auth.login(form).then(setUser)
    const register = (form:AuthForm) => auth.register(form).then(user => setUser(user))
    const logout = () => auth.logout().then(() => setUser(null))

    return <AuthContext.Provider children={children} value={{user,login,register,logout}}/>//返回一个provider组件，提供了value中的属性与方法
}

export const useAuth =()=>{
    const context=React.useContext(AuthContext);
    if(!context){
        throw new Error('useAuth需在AuthProvider中使用')
    }
    return context;
}