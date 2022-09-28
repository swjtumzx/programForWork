import React from "react"
import { List} from "./list"
import {SearchPanel} from './search-panel'
import { useDebounce } from "utils" //用来清除params里不合法的值，返回值是一个对象
import styled from "@emotion/styled"
import { Typography, Button } from 'antd';
import { useProject } from "utils/useProject"
import { useUsers } from "utils/useUsers"
import { useUrlQueryParam } from "utils/url"
import { useProjectSearchParams } from "./util"

export const ProjectListScreen =()=>{
    const [param,setParam] =useProjectSearchParams();
    const {isLoading,error,data:list}=useProject(useDebounce(param,200))
    const {data:users} = useUsers();
    return (
    <Container>
        <Row>
            <h1>项目列表</h1>
            <Button onClick={()=>{}}>创建项目</Button>
        </Row>
        <SearchPanel users={users || []} param={param} setParam={setParam}/>
        {error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null}
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