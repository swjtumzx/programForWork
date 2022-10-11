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
    <ErrorBox error={error} />
</FullPage>

export const ButtonNoPadding=styled(Button)`
    padding: 0;
`

const isError=(v:any):v is Error=> v?.message; //当存在v.message时认为v是Error类型   

export const ErrorBox=({error}:{error:unknown})=>{
    if(isError(error)){
        return <Typography.Text type={'danger'}>{error.message}</Typography.Text>
    }
    return null;
}

export const ScreenContainer = styled.div`
  padding: 3.2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;