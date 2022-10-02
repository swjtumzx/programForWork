import { List, Popover, Typography, Divider, Button } from 'antd';
import React from "react";
import { useProjects } from "utils/useProject";
import styled from '@emotion/styled';
import { ButtonNoPadding } from 'components/lib';
import { useDispatch } from 'react-redux';
import { projectListActions } from './project-list.slice';

export const ProjectPopover=()=>{
    const dispatch=useDispatch();
    const {data:projects}=useProjects()
    const pinedProjects=projects?.filter((v)=>v.pin);
    const content= <ContentContainer>
        <Typography.Text type={'secondary'}>收藏项目</Typography.Text>
        <List>
            {
                pinedProjects?.map( project => <List.Item>
                    <List.Item.Meta title = {project.name} />
                </List.Item>)
            }
        </List>
        <Divider />
        <ButtonNoPadding type={'link'} onClick={()=> dispatch(projectListActions.addProject())}>创建项目</ButtonNoPadding>
    </ContentContainer>
    return <Popover placement={'bottom'} content={content}>
        <span>项目</span>
    </Popover>
}

const ContentContainer = styled.div`
    min-width: 20rem;
`