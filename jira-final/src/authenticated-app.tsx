//验证过的app
import React from 'react'
import { ProjectListScreen } from './screens/project-list/index';
import { useAuth } from './context/auth-context';
import styled from '@emotion/styled';
import { Row, ButtonNoPadding } from 'components/lib';
import {ReactComponent as Logo3} from './asserts/logo3.svg'
import {Dropdown,Menu,Button} from 'antd'
import { resetRoute, useDocumentTitle } from 'utils';
import { Routes, Route, Navigate } from 'react-router';
import ProjectScreen from 'screens/project';
import { ProjectModal } from './screens/project-list/project-modal';
import { ProjectPopover } from './screens/project-list/project-popover';
import { UserPopover } from './components/user-popover';

export default function AuthenticatedApp() {
  useDocumentTitle('项目列表')
  return (
    <Container>
        <PageHeader />
        <Main>
          <Routes>
            <Route path={'/projects'} element={<ProjectListScreen/>}/>
            <Route path={'/projects/:personId/*'} element={<ProjectScreen/>}/>
            <Route path={'/'} element={<Navigate to="/projects"/>}/>
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
            <UserPopover />
          </HeaderLeft>
          <HeaderRight>
            <User/>
          </HeaderRight>
      </Header>
  )
}

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

// temporal dead zone(暂时性死区)
const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

// grid-area 用来给grid子元素起名字
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const Main = styled.main`
  display: flex;
  overflow: hidden;
`;
