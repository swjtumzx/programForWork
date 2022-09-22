import React from "react"
import { User } from './search-panel';
import {Table, TableProps} from 'antd'
import dayjs from "dayjs";
interface Project{
    name: string;
    personId: string;
    organization: string;
    pin: string;
    id: string;
    created:number;
}

interface ListProps extends TableProps<any>{
    users:User[];
}

export const List = ({users,...props}:ListProps)=>{
    //?.  如果前面的表达式的是undefined那么整个表达式都是undefined，不会报错
    return <Table pagination={false} {...props} columns={[{
        title:'名称',
        dataIndex:'name'
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
    }]}/>
}