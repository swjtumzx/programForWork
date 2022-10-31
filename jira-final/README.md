

# 项目逻辑
## 起始界面/unauthenticated-app
登录/注册，登录之后会在localStorage保存一个token，刷新界面会向服务端发送fetch请求获取user（此处user并不同于后文系统用户的users），获取到则可以进入authenticated-app界面

## authenticated-app界面

### pageHeader永远存在
#### 图标：点击返回主界面
#### 项目
显示收藏项目，并可以打开创建项目（project-modal）

#### 组员
显示users

#### 右侧显示用户名，可以登出
登出即清除token并删除用户信息

### Project-List界面
拥有搜索框和用户选择select可以搜索指定项目

List用来展示项目，每个项目点击可以进入项目专属界面（project）

并且可以编辑/删除项目（打开project-modal）

### Project-modal
创建/编辑项目的界面


### ProjectScreen

#### Kanban
看板为点击项目名称默认跳转界面

展示内容：
1.参数选择框

2.每个看板，看板包括自己所属的任务，点击任务可以更改任务信息，并且可以删除，创建看板，任务


#### epic
任务组

展示该项目拥有的epic，每个epic有自己对应的task（但是因为请求带上projectId之后无法获得tasks所以无法显示..）,task也会显示在下面，点击之后会跳到编辑改任务的界面













# api,Hook索引
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

<a href="./src/utils/use-optimistic-options.ts">useConfig</a>
//太多了，算了不写了

