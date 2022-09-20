# Jira

npx create-react-app jira --template typescript


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