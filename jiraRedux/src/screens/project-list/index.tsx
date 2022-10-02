import React from "react"
import { List} from "./list"
import {SearchPanel} from './search-panel'
import { useDebounce } from "utils" //用来清除params里不合法的值，返回值是一个对象
import styled from "@emotion/styled"
import {  Button } from 'antd';
import { useProjects } from "utils/useProject"
import { useUsers } from "utils/useUsers"
import { useProjectSearchParams } from "./util"
import { useDispatch } from "react-redux"
import { projectListActions } from './project-list.slice';
import { ErrorBox } from "components/lib"

export const ProjectListScreen =()=>{
    const dispatch=useDispatch();
    const [param,setParam] =useProjectSearchParams();
    const {isLoading,error,data:list}=useProjects(useDebounce(param,200))
    const {data:users} = useUsers();
    return (
    <Container>
        <Row>
            <h1>项目列表</h1>
            <Button onClick={()=> dispatch(projectListActions.addProject())}>创建项目</Button>
        </Row>
        <SearchPanel users={users || []} param={param} setParam={setParam}/>
            {error?<ErrorBox error={error} />:null}
        <List users={users || []} loading={isLoading} dataSource={list || []}/>
    </Container>)
}    

const Container= styled.div`
    padding: 3.2rem;
`
const Row=styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`