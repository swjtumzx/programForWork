import React, { useState } from "react";
import { useProjectIdUrl, useKanbansQueryKey } from './util';
import { useAddKanban } from '../../utils/kanban';
import { Input } from "antd";
import { Container } from "./kanban-column";

export const CreateKanban=()=>{
    const [name,setName]=useState('');
    const projectId=useProjectIdUrl();
    const {mutateAsync:addKanban}=useAddKanban(useKanbansQueryKey());

    const submit=async ()=>{
        await addKanban({name,projectId});
        setName('')
    }
    return <Container >
        <Input size={'large'} placeholder={'新建看板名称'} onPressEnter={submit} value={name}
        onChange={e => setName(e.target.value)}/>
    </Container>
}