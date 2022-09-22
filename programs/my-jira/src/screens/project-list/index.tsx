import React from "react"
import { List } from "./list"
import {SearchPanel} from './search-panel'
import {useState,useEffect }  from 'react'
import { cleanObject, useDebounce } from "utils" //用来清除params里不合法的值，返回值是一个对象
import { useMount } from "utils" //自定义(custom)Hook，相当于ComponentDidMount,自定义Hook必须以use开头，这是eslint的检查规则
import { useHttp } from "utils/http"
import styled from "@emotion/styled"
import { Typography } from "antd"

export const ProjectListScreen =()=>{
    const client=useHttp();
    const [users,setUsers]=useState([])
    const [isLoading,setIsLoading]=useState(false)
    const [error,setError] = useState<Error | null>(null)
    const [param,setParam]=useState({
        name:'',
        personId:''
    })
    const [list,setList]=useState([])
    const debouncedParam=useDebounce(param,1000)

    useEffect(()=>{
        setIsLoading(true)
        client(`projects`,{data:cleanObject(debouncedParam)}).then(data => setList(data)).
        catch(e =>{
            setError(e);
            setList([])
        }).finally(()=> setIsLoading(false));
        //eslint-disable-next-line 
    },[ debouncedParam])

    useMount(()=>{
        client(`users`).then(data=> setUsers(data));
    })
    

    return (
    <Container>
        <h1>项目列表</h1>
        <SearchPanel users={users} param={param} setParam={setParam}/>
        {error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null}
        <List users={users} loading={isLoading} dataSource={list}/>
    </Container>)
}    

const Container= styled.div`
    padding: 3.2rem;
`