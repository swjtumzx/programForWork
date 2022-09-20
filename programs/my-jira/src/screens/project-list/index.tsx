import React from "react"
import { List } from "./list"
import {SearchPanel} from './search-panel'
import {useState,useEffect }  from 'react'
import { cleanObject, useDebounce } from "utils" //用来清除params里不合法的值，返回值是一个对象
import { useMount } from "utils" //自定义(custom)Hook，相当于ComponentDidMount,自定义Hook必须以use开头，这是eslint的检查规则
import * as qs from 'qs'

export const ProjectListScreen =()=>{
    const apiUrl=process.env.REACT_APP_API_URL;
    const [users,setUsers]=useState([])
    const [param,setParam]=useState({
        name:'',
        personId:''
    })
    const [list,setList]=useState([])
    const debouncedParam=useDebounce(param,1000)

    useEffect(()=>{
        fetch(`${apiUrl}/projects/?${qs.stringify(cleanObject(debouncedParam))}`).then(async response =>{
            if(response.ok){
                setList(await response.json())
            }
        })
    },[apiUrl, debouncedParam])

    useMount(()=>{
        fetch(`${apiUrl}/users`).then(async response =>{
            if(response.ok){
                setUsers(await response.json())
            }
        })
    })
    

    return (
    <div>
        <SearchPanel users={users} param={param} setParam={setParam}/>
        <List users={users} list={list}/>
    </div>)
}    