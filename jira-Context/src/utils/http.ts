import * as qs from 'qs';
import { useAuth } from '../context/auth-context';
const apiUrl = process.env.REACT_APP_API_URL;



interface Config extends RequestInit{
    token?:string;
    data?:object;
}


export const useHttp=()=>{
    const auth =useAuth();
    const http = async (endpoint:string,{data,headers,token,...CustomConfig}:Config={}) =>{
        const config={
            method:'GET',
            headers:{
                Authorization: token ?  `Bearer ${token}` : '',
                'Content-Type':data ? 'application/json' : '',
            },
            ...CustomConfig//不传参数则为默认参数
        }
    
        if(config.method.toUpperCase() === 'GET'){
            endpoint+=`?${qs.stringify(data)}`
        }else{
            config.body=JSON.stringify(data || {})
        }
    
        return window.fetch(`${apiUrl}/${endpoint}`,config).then(async response =>{
            if(response.status === 401){
                await auth.logout();
                window.location.reload();
                return Promise.reject({message:'请重新登录'})
            }
            const data=await response.json()//获取响应数据
            if(response.ok){
                return data;
            }else{
                return Promise.reject(data)
            }
        })
    }
    const {user} = useAuth();
    //Parameters<typeof http>解析http参数类型
    return (...[endpoint,config]: Parameters<typeof http>) => http(endpoint,{...config,token: user?.token})
}