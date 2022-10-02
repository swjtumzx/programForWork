//验证过的app
import React, { useState } from 'react'
import { ProjectListScreen } from './screens/project-list/index';
import { useAuth } from './context/auth-context';
import styled from '@emotion/styled';
import { Row, ButtonNoPadding } from 'components/lib';
import {ReactComponent as Logo3} from './asserts/logo3.svg'
import {Dropdown,Menu,Button} from 'antd'
import { resetRoute, useDocumentTitle } from 'utils';
import { Routes,Route } from 'react-router';
import ProjectScreen from 'screens/project';
import { ProjectModal } from './screens/project-list/project-modal';
import { ProjectPopover } from './screens/project-list/project-popover';


export default function AuthenticatedApp() {
  useDocumentTitle('项目列表')
  return (
    <Container>
      <PageHeader />
      <Main>
        <Routes>
          <Route path={'/'} element={<ProjectListScreen/>}/>
          <Route path={'/:personId/*'} element={<ProjectScreen/>}/>
        </Routes>
      </Main>
      <ProjectModal  />
    </Container>
  )
}

const PageHeader=()=>{
  return (
    <Header between={true}>
          <HeaderLeft  gap={true}>
            <ButtonNoPadding type={'link'} onClick={resetRoute}>
              <Logo3 width={'8rem'} height={'4rem'}/>
            </ButtonNoPadding>
            <ProjectPopover />
            <span>用户</span>
          </HeaderLeft>
          <HeaderRight>
            <User/>
          </HeaderRight>
      </Header>
  )
}

const Container=styled.div`
  display: grid;
  grid-template-rows:6rem 1fr  ;
  grid-template-areas: "header" "main";
  height: 100vh;
`
const User= ()=>{
  const {logout,user} = useAuth();
  return (
    <Dropdown overlay={<Menu>
      <Menu.Item>
        <Button type={'link'} onClick={logout}>登出</Button>
      </Menu.Item>
      </Menu>}>
      <Button onClick={e => e.preventDefault()} type={'link'}>Hi,{user?.name}</Button>
    </Dropdown>
  )
}

const Header = styled(Row)`
  grid-area: header;
  padding: 3.2rem;
  box-shadow: 0 0 5px gray;
`

const Main = styled.main`
  grid-area:  main ;
  height: calc(100vh-6rem);

`



const HeaderLeft =styled(Row)`
 `
const HeaderRight=styled.div``
