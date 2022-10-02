import React from "react"
import { User } from './search-panel';
import {Dropdown, Menu, Table, TableProps} from 'antd'
import dayjs from "dayjs";
import {Link} from 'react-router-dom'
import Pin from "components/pin";
import { useEditProject } from "utils/useProject";
import { ButtonNoPadding } from 'components/lib';
import { projectListActions } from './project-list.slice';
import { useDispatch } from "react-redux";
export interface Project{
    name: string;
    personId: number;
    organization: string;
    pin: boolean;
    id: number;
    created:number;
}

interface ListProps extends TableProps<any>{
    users:User[];
}

export const List = ({users,...props}:ListProps)=>{
    const dispatch=useDispatch();
    const {mutate} = useEditProject();
    const pinProject=(id:number) =>(pin:boolean)=> mutate({id,pin})
    //?.  如果前面的表达式的是undefined那么整个表达式都是undefined，不会报错
    return <Table pagination={false} {...props} columns={[
        {
            title: <Pin checked={true} disabled={true}/>,
            render(v,project){
                return <Pin checked={project.pin} onCheckedChange={pinProject(project.id)}/>
            }
        },
        {
        title:'名称',
        render(v,project){
            return <Link to={String(project.id)}>{project.name}</Link>
        }
    },{
        title:'部门',
        dataIndex:'organization'
    },{
        title:'创建时间',
        render(value,project){
            return <span>
                {project.created ? dayjs(project.created).format('YYYY-MM-DD') : '无'}
            </span>
        }
    },{
        title:'负责人',
        render(value,project){
            return <span>
                {users.find(user => user.id === project.personId)?.name || '未知'}
            </span>
        }
    },{
        render(v,project){
            return <Dropdown overlay={<Menu>
                <Menu.Item key={'edit'}>
                 <ButtonNoPadding type={'link'} onClick={()=> dispatch(projectListActions.editProject(project))}>编辑</ButtonNoPadding>
                </Menu.Item>
                <Menu.Item key={'delete'}>
                 <ButtonNoPadding type={'link'} onClick={()=> dispatch(projectListActions.editProject({}))}>删除</ButtonNoPadding>
                </Menu.Item>
            </Menu>}>
                <ButtonNoPadding type={'link'}>...</ButtonNoPadding>
            </Dropdown>
        }
    }]}/>
}