# Jira

npx create-react-app jira --template typescript

## CSS-in-Js   / emotion
下载了@emotion/react @emotion/styled

## api,Hook索引
<a href ="./src/utils/index">useDebounce</a>
<a href="./src/context/auth-context.tsx">useAuth</a>
<a href="./src/context/auth-context.tsx">auth-context</a>
<a href="./src/utils/http.ts">useHttp</a>

### fetch请求
projects //项目信息
me // 用户本人信息
users 用户信息

useAuth()  =>  login，user ， logout ， register


## 配置

使用json-server来模拟服务器，在package.json中增加了script
"json-server": "json-server __json_server_mock__/db.json --watch --port 3001"
以此来指定json-server的db.json的路径，并且指定了3001端口


在tsconfig.json中配置了"baseUrl":"./src"指定绝对路径以src为参照

使用了prettier来标准格式化

创建了.env和.env.development文件，定义了请求接口的url，如果是实际开发，则更改起来比较方便
使用方式例如下
```ts
const apiUrl=process.env.REACT_APP_API_URL;
```
```
.env  REACT_APP_API_URL=http://online.com
.env.development REACT_APP_API_URL=http://localhost:3001
```

## Project-List


使用fetch来发送对json-server的请求，使用qs来解析params

定义了cleanObject函数来清除非法的value（即params中为空的值）

自定义了两个hook，useMount（easy），useDebounce
useDebounce用来防抖，解决网络请求频繁发送的问题
<a href="./src/utils/index.js">useDebounce</a>

组件逻辑：定义了三个state
```ts
const [users,setUsers]=useState([])
const [param,setParam]=useState({
        name:'',
        personId:''
    })
const [list,setList]=useState([])
```
user：组件挂载时向/users发送了请求获取了users，起到两个作用，一是与list中Project中的id相对应获取每个Project的人名，二是传递给searchPanel提供负责人选项

param:searchPanel的input框与select都可以改变param数据，改变之后发送请求获取对应负责人or项目名称对应的项目，使用了防抖函数，减少网络请求开销

list:param改变后获取的数据存储在list中，渲染listTable是也是以list为依据


## LoginScreen
收集用户名和密码并交给后台验证,验明正身之后改变user的值，安装了jira-dev-tool进行调试

## useAuth
因为该项目始终要用到用户信息，所以定义了useAuth Hook，包裹的子组件可以使用AuthContext暴露的状态，方法
在<a href="./src/context/auth-context.tsx">useAuth</a>

## useContext

<a href="./src/context/auth-context.tsx">auth-context</a>
auth-provider.ts提供了操作localStorage的方法并且结合jira-dev-tool生成token

在auth-context.tsx中使用了React.createContext创建了一个Context，并且定义了一个AuthProvider组件并且将user,login,logout,register等方法属性传递给了AuthProvider,定义了useAuth Hook来使AuthProvider包裹的子组件可以使用AuthContext暴露的状态，方法

## authenticated or not 
未登陆界面可以登录和注册,为UnAuthenticatedApp,登录之后为AuthenticatedApp
## authenticated App
布局：使用了grid+flex
自定义了Row组件
Row组件的功能：flex布局，默认垂直居中，传入between控制是否space-between，传入gap控制margin-right，传入marginBottom控制marginBottom

## useHttp
用fetch抽象了HTTP请求方法，增加了通用性，方便地在诸如ProjectList组件中发送http请求
```ts
interface Config extends RequestInit{
    token?:string;
    data?:object;
}
export const useHttp=()=>{
    const auth =useAuth();
    const http = async (endpoint:string,{data,headers,token,...CustomConfig}:Config={}) =>{
        const config={
            method:'GET',
            headers:{
                Authorization: token ?  `Bearer ${token}` : '',
                'Content-Type':data ? 'application/json' : '',
            },
            ...CustomConfig//不传参数则为默认参数
        }
    
        if(config.method.toUpperCase() === 'GET'){
            endpoint+=`?${qs.stringify(data)}`
        }else{
            config.body=JSON.stringify(data || {})
        }
    
        return window.fetch(`${apiUrl}/${endpoint}`,config).then(async response =>{
            if(response.status === 401){
                await auth.logout();
                window.location.reload();
                return Promise.reject({message:'请重新登录'})
            }
            const data=await response.json()//获取响应数据
            if(response.ok){
                return data;
            }else{
                return Promise.reject(data)
            }
        })
    }
    const {user} = useAuth();
    //Parameters<typeof http>解析http参数类型
    return (...[endpoint,config]: Parameters<typeof http>) => http(endpoint,{...config,token: user?.token})
}
```





## improve-tag

### useBootstrapUser(waiting)
可以使用一个函数在初始化时向/me发送token验证user身份，如果严明正身则跳转
some demo
```ts
  const useBootstrapUser=async ()=>{
    let user=null;
    let client = useHttp()
    const token = auth.getToken();
    if(token){
        const data = await client('me',{token});
        user=data.user;
    }
    return user;
  }//挂载组件时发送请求根据token获取用户信息
```



## 学习的一些随笔

### 类型别名, Utility:  Partial,Omit
```ts
type favorite = number|string
let a:favorite;
```
```ts

type Person ={
    name :string;
    age:number
}

let x : Partial<Person> ={name:'x'};
```
顾名思义

Omit删除
```ts

type Person ={
    name :string;
    age:number
}

let x : Omit<Person,'name'> ={age:1};//删除name
let x : Omit<Person,'name'|'age'> ={};//删除name,age
```

一些实现
```ts
type Partial<T>={
    [P in keyof T]?:T[P];
}

type Pick<T,K extends keyof T>={ //K extends keyof T 即取出T中所有键名，K是该集合的子集
    [P in K] : T[P]
}

type Exclude<T,U>= T extends U ? never : T  //遍历T的键，如果是U的子集则设置为never

type Omit(waiting)
```

### flex，grid
一维flex二维grid，从内容出发flex，从布局出发grid
grid一个使用样例
```css
const Container=styled.div`
  display: grid;
  grid-template-rows:6rem 1fr 6rem   ;//行高
  grid-template-columns: 20rem 1fr 20rem ;//列宽
  grid-template-areas: 
  "header header header"
  "nav main aside"
  "footer footer footer"
  ;
  height: 100vh;
  grid-gap: 10rem;//栅格间距
`

const Header = styled.header`
  grid-area: header;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;/* 均匀排列每个元素,首个元素放置于起点，末尾元素放置于终点 */
`

const Main = styled.main`
  grid-area:  main ;
  height: calc(100vh-6rem);
`

const Aside =styled.aside` grid-area:  aside ;`
const Nav =styled.nav`grid-area:nav;`
const Footer =styled.footer`grid-area:footer; `
```

### svg控制大小
正常的jpg是没有办法控制大小的，但是svg可以，例如
```ts
import {ReactComponent as Logo} from logoPath
```
这样引入之后变成了一个类似组件，可以使用width，height等属性控制大小 

## 忽略eslint规则
//eslint-disable-next-line 