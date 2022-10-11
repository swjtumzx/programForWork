import { Drawer,Button, Spin, Form, Input } from "antd";
import React from "react";
import { useProjectModal, useProjectsQueryKey } from './util';
import { UserSelect } from '../../components/user-select';
import { useEditProject } from "utils/useProject";
import { useAddProject } from '../../utils/useProject';
import { useForm } from "antd/es/form/Form";
import { useEffect } from 'react';
import { ErrorBox } from "components/lib";
import styled from "@emotion/styled";

export const ProjectModal=()=>{
    const {projectModalOpen,close,editingProject,isLoading}=useProjectModal();
    const useMutateProject= editingProject ? useEditProject :useAddProject;

    const {mutateAsync,error,isLoading:mutateLoading}=useMutateProject(useProjectsQueryKey())
    const [form]=useForm()
    const onFinish=(values:any)=>{
        mutateAsync({...editingProject,...values}).then(()=>{
            form.resetFields();
            close()
        })
    }

    const title=editingProject ? '编辑项目' : '创建项目';

    useEffect(()=>{
        form.setFieldsValue(editingProject);
    },[form,editingProject])//每次打开时将表单内容设置为editingProject

    const closeModal=()=>{
        form.resetFields();
        close()
    }//关闭时清空信息

    return <Drawer forceRender={true} onClose={closeModal} open={projectModalOpen} width={'100%'}>
        <Container >
        {
            isLoading ? <Spin size={'large'}/> :<>
                <h1>{title}</h1>
                <ErrorBox error={error}/>
                <Form form={form} layout={'vertical'} style={{width:'40rem'}} onFinish={onFinish}>
                    <Form.Item  label={'名称'} name={'name'} rules={[{required:true,message:'请输入项目名称'}]}>
                        <Input placeholder={'请输入项目名称'}/>
                    </Form.Item>
                    <Form.Item label={'部门'} name={'organization'} rules={[{required:true,message:'请输入部门名称'}]}>
                        <Input placeholder={'请输入部门'}/>
                    </Form.Item>
                    <Form.Item label={'负责人'} name={'personId'} >
                        <UserSelect defaultOptionName={'负责人'}/>
                    </Form.Item>
                    <Form.Item style={{textAlign:'right'}}>
                        <Button  loading={mutateLoading} type={'primary'} htmlType={'submit'}>提交</Button>
                    </Form.Item>
                </Form>
            </>
        }
        </Container>
    </Drawer>
}

const Container=styled.div`
    height: 80vh;
    width: 80vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`