import React from "react"
import { useEffect, useState } from "react"
import {Form, Input ,Select} from 'antd'

export interface User{
    id:string;
    name:string;
    email:string;
    title:string;
    organization:string;
    token:string;
}

interface searchPanelProps {
    users:User[];
    param:{
        name:string,
        personId:string
    };
    setParam: (param:searchPanelProps['param'])=>void;
}

export const SearchPanel =({users,param,setParam}:searchPanelProps)=>{

    return <Form style={{marginBottom:'2rem'}} layout={'inline'}>
        <Form.Item>
            <Input  placeholder="项目名称" type="text" value={param.name} onChange={e => {setParam({...param,name:e.target.value})}}/>
        </Form.Item>
        <Form.Item>
            <Select  value={param.personId} onChange={v => {setParam({...param,personId:v})}}>
                <Select.Option value={''}>负责人</Select.Option>
                {users.map((user) => <Select.Option key={user.id} value={user.id}>{user.name}</Select.Option>)}
            </Select>
        </Form.Item>
    </Form>
}