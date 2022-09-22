//验证过的app
import React from 'react'
import { ProjectListScreen } from './screens/project-list/index';
import { useAuth } from './context/auth-context';
import styled from '@emotion/styled';
import { Row } from 'components/lib';
import {ReactComponent as Logo3} from './asserts/logo3.svg'
import {Dropdown,Menu,Button} from 'antd'

export default function AuthenticatedApp() {
    const {logout,user} = useAuth();
  return (
    <Container>
        <Header between={true}>
          <HeaderLeft  gap={true}>
            <Logo3 width={'8rem'} height={'4rem'}/>
            <h2>项目</h2>
            <h2>用户</h2>
          </HeaderLeft>
          <HeaderRight>
            <Dropdown overlay={<Menu>
              <Menu.Item>
                <Button type={'link'} onClick={logout}>登出</Button>
              </Menu.Item>
            </Menu>}>
              <Button onClick={e => e.preventDefault()} type={'link'}>Hi,{user?.name}</Button>
            </Dropdown>
          </HeaderRight>
        </Header>
        <Main>
          <ProjectListScreen />
        </Main>
    </Container>
  )
}

const Container=styled.div`
  display: grid;
  grid-template-rows:6rem 1fr  ;
  grid-template-areas: "header" "main";
  height: 100vh;
`

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