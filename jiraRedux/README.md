# Jira

npx create-react-app jira --template typescript

## CSS-in-Js   / emotion
下载了@emotion/react @emotion/styled

## api,Hook索引
<a href ="./src/utils/index">useDebounce</a>
<a href="./src/context/auth-context.tsx">useAuth</a>
<a href="./src/context/auth-context.tsx">auth-context</a>
<a href="./src/utils/http.ts">useHttp</a>
<a href="./src/utils/useAsync.ts">useAsync</a>
<a href="./src/utils/useProject.ts">useProject</a>
<a href="./src/utils/useUsers.ts">useUsers</a>
<a href="./src/utils/url.ts">useUrlQueryParam</a>
<a href="./src/utils/url.ts">useProjectSearchParams</a>
<a href="./src/utils/useProject.ts">useEditProject</a>

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

·······························update
更新之后不再使用json-server，使用jira-dev-tool提供的http api接口

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

后续版本逻辑抽象出来，迁移至useAsync,useProject,useUsers

## LoginScreen
收集用户名和密码并交给后台验证,验明正身之后改变user的值，安装了jira-dev-tool进行调试

## IdSelect
将Select封装为IdSelect,使用起来更为方便，使用时只需传入select option即可
<a href='./src/components/id-select.tsx'>IdSelect</a>

## UserSelect
数据为Users的IdSelect
<a href='./src/components/user-select.tsx'>UserSelect</a>

## Pin
封装了antd的Rate组件，是用来表示星星的一个组件，渲染到ProjectList的List中，用到了useEditProject,但是由于使用到的数据的bug（即只有一个project具有pin属性，所以无法展现）

## ProjectModal
封装了Drawer（antd组件）的创建项目界面
## ProjectPopover(创建项目弹框),

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

## useAsync

使用该Hook之前的版本中，发送请求的代码与组件混杂在一起，较为繁杂，所以将其抽象出来
为了方便理解，重温一下之前的Hook（实际上我也看不懂自己写的了所以才意识到重温的重要性，g），定义了useHttp Hook返回值是一个发送http请求的函数，该函数向jira-dev-tool提供的url发送请求以后则会返回一个携带data或者error的Promise对象
```ts
{
    isIdle: state.stat ==='idle',
    isSuccess: state.stat ==='success',
    isError: state.stat ==='error',
    isLoading: state.stat ==='loading',
    setData,
    setError,
    run,
    data,
    stat,
    error
}
```
useAsync Hook返回一个上述对象，属性跟方法的意义看名字就可以知道,ps:补上一个link<a href="./src/utils/useAsync">useAsync</a>
值得一提的是，data用到了泛型，根据传入参数的类型不同，data类型也会随之改变，在下面就会用到

### useProject
在该Hook中使用了useHttp得到了一个储存请求/projects的信息的Promise，之后使用run来处理该请求，读取数据改变状态
<a href="./src/utils/useProject">useProject</a>

### useUSers
类似useProject

## useUrlQueryParam
自定义了useUrlQueryParam Hook用来设置urlParam，使得url能够携带search参数，方便用户使用
实现细节：使用泛型确定searchParams参数类型，返回是一个tuple，第一个参数为searchParams，第二个参数是setSearchParamsII
指定初始值为{} as {[key in K]  : string}才可以使用...prev
setSearchParamsII则是封装了一次useSearchParams返回的setSearchParams，该函数传入一个对象，之后将先前的searchParams解构，和该对象参数形成一个新对象传入setSearchParams,并且使用了cleanObject（自定义函数）清空对象中空的属性（非法属性）

使用了useMemo
## 优化了Loading，Error
Loading：从useAsync中得到，同时也必须使用run来进行异步操作以更改isLoading
向list传递了isLoading属性，在登录，注册界面对按钮传递了isLoading属性

Error，向登录和注册界面传递了error属性和onE方法来更改error，错误时显示错误信息，并且设置了回调，错误之后一段时间取消错误

## Loading,Error的界面组件
FullPageErrorFallBack，FullPageLoading  

## ErrorBoundary组件，错误边界
出错时显示FullPageErrorFallBack
## useDocumentTitle Hook切换页面标题
自动切换标题，回退时还原
<a href="./src/utils/index.ts">useDocumentTitle</a>

## useEditProject
编辑pin使用，用到了函数柯里化
<a href="./src/utils/useProject.ts">useEditProject</a>

## Redux toolkit
删除了Context，使用redux toolkit来管理auth和projectModalOpen（编辑页面）
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
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
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

## router v5 v6区别
组件层面上：

老版本路由采用了 Router Switch Route 结构，Router -> 传递状态，负责派发更新； Switch -> 匹配唯一路由 ；Route -> 真实渲染路由组件。
新版本路由采用了 Router Routes Route 结构，Router 为了抽离一 context； Routes -> 形成路由渲染分支，渲染路由；Route 并非渲染真实路由，而是形成路由分支结构。

使用层面上：

老版本路由，对于嵌套路由，配置二级路由，需要写在具体的业务组件中。
新版本路由，在外层统一配置路由结构，让路由结构更清晰，通过 Outlet 来实现子代路由的渲染，一定程度上有点类似于 vue 中的 view-router。
新版本做了 API 的大调整，比如 useHistory 变成了 useNavigate，减少了一些 API ，增加了一些新的 api 。

原理层面上：

老版本的路由本质在于 Route 组件，当路由上下文 context 改变的时候，Route 组件重新渲染，然后通过匹配来确定业务组件是否渲染。
新版本的路由本质在于 Routes 组件，当 location 上下文改变的时候，Routes 重新渲染，重新形成渲染分支，然后通过 provider 方式逐层传递 Outlet，进行匹配渲染。

链接：https://juejin.cn/post/7069555976717729805

## useState懒初始化，渲染问题，useRef
如果使用useState储存函数state，要知道的是，函数体内容会在一开始就被执行，这样渲染的性能开销很大，所以应该懒初始化，such as
```ts
const App = () => {
  const [a,setA]=React.useState(()=> () => alert(9))

  return <>
  <button onClick={()=> setA(()=>()=> alert(999))}>change</button>
  <button onClick={()=> a()}>console</button>
</>
```

储存函数也可以使用useRef，如以下
```ts
const App = () => {
  const cRef = useRef(() => alert("begin"));
  const c = cRef.current;
  return (
    <>
      <button
        onClick={() =>
          (cRef.current = () => {
            alert("changed");
          })
        }
      >
        change
      </button>
      <button onClick={c}>consolec</button>
      <button onClick={()=>cRef.current()}>consoleChangedc</button>
    </>
  );
};
```

## 组件解耦，控制反转
