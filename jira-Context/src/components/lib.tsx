import styled from "@emotion/styled";
import React from "react";
import { Spin, Typography, Button } from 'antd';
export const Row = styled.div<{
    gap?: number | boolean 
    between ?: boolean
    marginBottom?:number
}>`
    display: flex;
    align-items: center;
    justify-content: ${props => props.between ? 'space-between' : undefined}; // 元素均匀排列
    margin-bottom: ${props => props.marginBottom ? props.marginBottom + 'rem' : undefined};
    >*{
        margin-top: 0 !important;
        margin-bottom: 0 !important;
        margin-right: ${props => typeof props.gap === 'number' ? props.gap + 'rem' : props.gap ? '2rem' : undefined};
    }
`

const FullPage=styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const FullPageLoading=()=>  <FullPage>
    <Spin size={'large'}></Spin>
</FullPage>

export const FullPageErrorFallBack=({error}:{error:Error | null})=><FullPage>
    <Typography.Text type={'danger'}>{error ? error.message : null}</Typography.Text>
</FullPage>

export const ButtonNoPadding=styled(Button)`
    padding: 0;
`