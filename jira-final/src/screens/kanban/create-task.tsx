import React, { useState } from "react";
import { Card, Input } from "antd";
import { useAddTask } from "utils/task";
import { useProjectIdUrl, useTasksQueryKey } from "./util";
import { useEffect } from 'react';

export const CreateTask=({kanbanId}:{kanbanId:number})=>{
    const [name,setName]=useState('');
    const [inputMode,setInputMode]=useState(false)
    const projectId=useProjectIdUrl();
    const {mutateAsync:addTask}=useAddTask(useTasksQueryKey());

    const submit=async ()=>{
        await addTask({name,projectId,kanbanId});
        setName('');
        setInputMode(false)
    }
    const toggle=() => setInputMode(!inputMode) 
    
    useEffect(()=>{
        if(!inputMode){
            setName('')
        }
    },[inputMode])

    if(!inputMode) return <div onClick={toggle}>+创建事务</div>

    return <Card>
        <Input onBlur={toggle} placeholder={'need to do something'} 
        autoFocus={true} onPressEnter={submit} value={name}
        onChange={e=>setName(e.target.value)}/>
    </Card>
}