import React from "react";
import { useSetUrlSearchParam } from "utils/url";
import { useTasksSearchParams } from './util';
import { Row } from 'components/lib';
import { Button, Input } from "antd";
import { UserSelect } from '../../components/user-select';
import { TaskTypeSelect } from '../../components/task-select-type';

export const SearchPanel=()=>{
    const searchParams=useTasksSearchParams();
    const setSearchParams=useSetUrlSearchParam();
    const reset=()=>{
        setSearchParams({
        name:undefined,
        typeId: undefined,
        tagId: undefined,
        processorId:undefined,
        })
    }
    return <Row marginBottom={4} gap={true}>
        <Input style={{width:'20rem'}} placeholder={'任务名'} value={searchParams.name}
         onChange={e => setSearchParams({name:e.target.value})}/>
         <UserSelect defaultOptionName={'经办人'} value={searchParams.processorId} 
        onChange={v=> setSearchParams({processorId:v})}/>
        <TaskTypeSelect defaultOptionName={'类型'} value={searchParams.typeId}
        onChange={v=> setSearchParams({typeId:v})}/>
        <Button onClick={reset}>清除筛选器</Button>
    </Row>
}
