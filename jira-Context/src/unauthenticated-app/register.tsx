import React from 'react'
import { useAuth } from '../context/auth-context';
import {Form,Input,Button} from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

export default function RegisterScreen({onE} : {onE:(e:Error)=>void} ) {
    const {register}=useAuth()
    const handleSubmit=async ({cpassword,...values}:{cpassword:string,username:string,password:string})=>{
        try {
            if(cpassword !== values.password){
                return onE(new Error('两次输入的密码不相同'))
            }
           await register(values)
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
        <Form.Item name={'cpassword'} rules={[{required:true,message:'请确认密码'}]}>
            <Input.Password iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} placeholder={'确认密码'} type="text" id={"cpassword"}/>
        </Form.Item>
        <Form.Item>
            <Button style={{width:'100%'}} htmlType={'submit'} type={'primary'}>注册</Button>
        </Form.Item>
    </Form>
  )
}
