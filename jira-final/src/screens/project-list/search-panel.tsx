import React from "react"
import {Form, Input } from 'antd'
import { Project } from "./Project";
import { UserSelect } from '../../components/user-select';
import { User } from "./User";

interface searchPanelProps {
    users:User[];
    param: Partial<Pick<Project , 'name' | 'personId'>>;
    setParam: (param:searchPanelProps['param'])=>void;
}

export const SearchPanel =({users,param,setParam}:searchPanelProps)=>{

    return <Form style={{marginBottom:'2rem'}} layout={'inline'}>
        <Form.Item>
            <Input  placeholder="项目名称" type="text" value={param.name} onChange={e => setParam({...param,name:e.target.value}) }/>
        </Form.Item>
        <Form.Item>
            <UserSelect defaultOptionName={'负责人'} value={param.personId} onChange={v => setParam({...param,personId:v}) }/>
        </Form.Item>
    </Form>
}