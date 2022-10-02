import React from 'react'
import { useAuth } from '../context/auth-context';
import {Form,Input,Button} from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useAsync } from 'utils/useAsync';

export default function LoginScreen({onE} : {onE:(e:Error)=>void}) {
    const {login}=useAuth()
    const {run,isLoading} = useAsync()
    const handleSubmit=async (values:{username:string,password:string})=>{
        try {
            await run(login(values))//login是异步的，不使用async的话，onE捕获不到正确的错误信息
        } catch (error) {
            onE(error as Error)
        }
    }
  return (
    <Form onFinish={handleSubmit}>
        <Form.Item name={'username'} rules={[{required:true,message:'请输入用户名'}]}>
            <Input placeholder={'用户名'} type="text" id={"username"}/>
        </Form.Item>
        <Form.Item name={'password'} rules={[{required:true,message:'请输入密码'}]}>
            <Input.Password iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} placeholder={'密码'} type="text" id={"password"}/>
        </Form.Item>
        <Form.Item>
            <Button loading={isLoading} style={{width:'100%'}} htmlType={'submit'} type={'primary'}>登录</Button>
        </Form.Item>
    </Form>
  )
}
