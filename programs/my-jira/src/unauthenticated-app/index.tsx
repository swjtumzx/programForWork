import React from "react";
import { useState } from 'react';
import RegisterScreen from "./register";
import LoginScreen from "./login";
import {Card,Divider,Button} from 'antd'
import styled from "@emotion/styled";
import logo1 from 'asserts/logo1.svg'
import logo3 from 'asserts/logo3.svg'

export default function UnauthenticatedApp() {
  const [isRegister, setIsRegister] = useState(false);
  return (
    <Container >
      <Header/>
      <ShadowCard>
        <Title>
        {isRegister ? '请注册' : '请登录'}
        </Title>
        {isRegister ? <RegisterScreen /> : <LoginScreen />}
        <Divider />
        <Button type={'link'} onClick={() => setIsRegister(!isRegister)}>
          切换到{isRegister ? "已经有帐号了？直接登录" : "没有账号？注册新账号"}
        </Button>
      </ShadowCard>
    </Container>
  );
}

const Title=styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94,108,132);
`

const Header = styled.header`
  background: url(${logo1}) no-repeat center;
  padding: 5rem 0;
  background-size: 8rem;
  width: 100%;
`

const Container=styled.div`
  display: flex;
  flex-direction: column;/*The direction in which lines of text are stacked*/ 
  align-items: center;/*竖直居中*/
  min-height: 100vh;
  background-image: url(${logo3});
  background-size: 100% 100%;
`

const ShadowCard=styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.4rem 2rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0,0,0,0.1) 0 0 10px;/*设置阴影*/
  text-align: center;
`