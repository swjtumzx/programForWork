import { List, Popover, Typography, Divider, Button } from 'antd';
import React from "react";
import { useProject } from "utils/useProject";
import styled from '@emotion/styled';
import { ButtonNoPadding } from 'components/lib';

export const ProjectPopover=()=>{
    const {data:projects,isLoading}=useProject()
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
        <ButtonNoPadding type={'link'}>创建项目</ButtonNoPadding>
    </ContentContainer>
    return <Popover placement={'bottom'} content={content}>
        <span>项目</span>
    </Popover>
}

const ContentContainer = styled.div`
    min-width: 20rem;
`