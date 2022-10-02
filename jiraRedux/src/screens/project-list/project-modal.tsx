import { Drawer,Button, Form, Input, Spin } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/exports";
import { projectListActions, selectProjectModal } from './project-list.slice';
import { UserSelect } from '../../components/user-select';
import { useEditProject, useAddProject } from '../../utils/useProject';
import { useForm } from "antd/es/form/Form";
import { useEffect } from 'react';

export const ProjectModal=()=>{
    const dispatch=useDispatch();
    const {projectModalOpen,editing,isLoading,editingProject}=useSelector(selectProjectModal);
    const title= editing ? '编辑项目': '创建项目';
    const useMutateProject=editing ? useEditProject : useAddProject;
    const {mutateAsync,isLoading:mutateLoading} =useMutateProject()
    const [form]=Form.useForm()
    const onFinish=(values:any)=>{
        mutateAsync({...editingProject,...values}).then(()=>{
            form.resetFields();
            dispatch(projectListActions.closeProjectModal())
        })
    };
    useEffect(()=>{
        form.resetFields();
    },[editingProject,form])
    return <Drawer  open={projectModalOpen} onClose={()=> dispatch(projectListActions.closeProjectModal())} width={'100%'}>
        {
            isLoading ?  <Spin size={'large'} /> : 
            <>
                <h1>{title}</h1>
                <Form layout={'vertical'} style={{width:'40rem'}} onFinish={onFinish}>
                    <Form.Item label={'名称'} name={'name'} rules={[{required:true,message:'请输入项目名称'}]}>
                        <Input placeholder={'请输入项目名称'}/>
                    </Form.Item>
                    <Form.Item label={'部门'} name={'organization'} rules={[{required:true,message:'请输入部门名'}]}>
                        <Input placeholder={'请输入部门名'}/>
                    </Form.Item>
                    <Form.Item label={'负责人'} name={'personId'} >
                        <UserSelect defaultOptionName={'负责人'}  />
                    </Form.Item>
                    <Button onClick={()=> dispatch(projectListActions.closeProjectModal())}>关闭</Button>
                    <Button loading={mutateLoading} htmlType={'submit'} onClick={()=> {
                        dispatch(projectListActions.closeProjectModal());
                    }}>提交</Button>
                </Form>
            </>
        }
    </Drawer>
}