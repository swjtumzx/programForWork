import React from "react"
import { User } from "./User";
import {Dropdown, Menu, Modal, Table, TableProps} from 'antd'
import dayjs from "dayjs";
import {Link} from 'react-router-dom'
import Pin from "components/pin";
import { ButtonNoPadding } from 'components/lib';
import { useProjectModal, useProjectsQueryKey } from './util';
import { Project } from './Project';
import { useDeleteProject } from "utils/useProject";
interface ListProps extends TableProps<any>{
    users:User[];
}

export const List = ({users,...props}:ListProps)=>{
    

    //?.  如果前面的表达式的是undefined那么整个表达式都是undefined，不会报错
    return <Table pagination={false} {...props} columns={[
        {
            title: <Pin checked={true} disabled={true}/>,
            render(v,project){
                return <Pin checked={project.pin} onCheckedChange={()=>{}}/>
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
            return <More project={project}/>
        }
    }]}/>
}

const More=({project}:{project:Project})=>{
    const {startEdit}=useProjectModal()
    const editProject=(id:number) =>()=> startEdit(id);
    const { mutate: deleteProject } = useDeleteProject(useProjectsQueryKey());
    const confirmDeleteProject = (id: number) => {
        Modal.confirm({title: "确定删除这个项目吗?",content: "点击确定删除",okText: "确定",
        onOk() {
            deleteProject({ id });
        },
        });
    };

    return <Dropdown overlay={<Menu>
        <Menu.Item onClick={editProject(project.id)} key={'edit'}>
         <ButtonNoPadding type={'link'}>编辑</ButtonNoPadding>
        </Menu.Item>
        <Menu.Item key={'delete'}>
         <ButtonNoPadding onClick={()=> confirmDeleteProject(project.id)} type={'link'}>删除</ButtonNoPadding>
        </Menu.Item>
    </Menu>}>
        <ButtonNoPadding type={'link'}>...</ButtonNoPadding>
    </Dropdown>
}