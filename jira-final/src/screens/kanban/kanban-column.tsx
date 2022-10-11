import React from "react"
import { useTasks } from "utils/task";
import { useTaskTypes } from "utils/task-type";
import { Kanban } from '../../types/kanban';
import { ReactComponent as taskIcon} from 'asserts/task.svg'
import { ReactComponent as bugIcon} from 'asserts/bug.svg'
import styled from "@emotion/styled";
import { Button, Card, Dropdown, Menu, Modal } from "antd";
import { useTasksSearchParams, useTasksModal, useKanbansQueryKey } from './util';
import { CreateTask } from './create-task';
import { Task } from '../../types/task';
import { useDeleteKanban } from '../../utils/kanban';
import { Row } from '../../components/lib';

const TaskTypeIcon= ({id}:{id:number}) =>{
    const {data:taskTypes}=useTaskTypes();
    const name=taskTypes?.find(taskType => taskType.id===id)?.name;
    if(!name) return null;
    const IconType=name === 'task' ?taskIcon : bugIcon;
    return <IconType style={{width:'2rem',height:'2rem'}}/>
}

const TaskCard=({task}:{task:Task})=>{
    const {startEdit}=useTasksModal();
    return <Card onClick={()=>startEdit(task.id)} style={{marginBottom:'0.5rem'}} key={task.id}>
                <div>{task.name}</div>
                <TaskTypeIcon id={task.typeId}/>
            </Card>
}

const More=({kanban}:{kanban:Kanban})=>{
    const {mutate}=useDeleteKanban(useKanbansQueryKey());
    const startEdit=()=>{
        Modal.confirm({
            okText:'确定',cancelText:'取消',
            title:'确定删除看板么',
            onOk(){
                mutate({id:kanban.id})
            }
        })
    }
    const overlay=()=> <Menu>
        <Menu.Item>
            <Button type={'link'} onClick={startEdit}>删除</Button>
        </Menu.Item>
    </Menu>
    return <Dropdown overlay={overlay}>
        <Button type={'link'}>
            ...
        </Button>
    </Dropdown>
}


export const KanbanColumn=({kanban}:{kanban:Kanban})=>{
    const {data:allTasks}=useTasks(useTasksSearchParams());
    const tasks=allTasks?.filter(task => task.kanbanId === kanban.id)

    return <Container>
        <Row between={true}>
            <h3>{kanban.name}</h3>
            <More kanban={kanban}/>
        </Row>
        <TasksContainer>
            {tasks?.map(task=> <TaskCard task={task}/>)}
            <CreateTask kanbanId={kanban.id}/>
        </TasksContainer>
    </Container>
}

export const Container=styled.div`
    min-width: 27rem;
    border-radius: 6px;
    background-color: rgb(244,245,246);
    display: flex;
    flex-direction: column;
    padding: 0.7rem 0.7rem 1rem;
    margin-right: 1.5rem;
`

const TasksContainer=styled.div`
    overflow: scroll;
    flex: 1;
    ::-webkit-scrollbar{
        display: none;
    }
`