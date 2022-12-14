import { List, Popover, Typography, Divider } from 'antd';
import React from "react";
import { useProjects } from "utils/useProject";
import styled from '@emotion/styled';
import { ButtonNoPadding } from 'components/lib';
import { useProjectModal } from './util';

export const ProjectPopover=()=>{
    const {open}=useProjectModal();
    const {data:projects}=useProjects()
    const pinedProjects=projects?.filter((v)=>v.pin);
    const content= <ContentContainer>
        <Typography.Text type={'secondary'}>收藏项目</Typography.Text>
        <List>
            {
                pinedProjects?.map( project => <List.Item key={project.id}>
                    <List.Item.Meta title = {project.name} />
                </List.Item>)
            }
        </List>
        <Divider />
        <ButtonNoPadding type={'link'} onClick={open}>创建项目</ButtonNoPadding>
    </ContentContainer>
    return <Popover placement={'bottom'} content={content}>
        <span>项目</span>
    </Popover>
}

const ContentContainer = styled.div`
    min-width: 20rem;
`