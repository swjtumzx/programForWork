# 使用方式
例如
import {AutoComplete, Button, ...restComponents} from 'mdesign-swjtumzx'

在index.tsx中引入样式
```js
import "mdesign-swjtumzx/dist/index.css"
```


# Button
 
 按钮用于开始一个即时操作。
 
 ## 何时使用
 
 标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。
 
  主按钮：用于主行动点，一个操作区域只能有一个主按钮。

  默认按钮：用于没有主次之分的一组行动点。

  文本按钮：用于最次级的行动点。

  链接按钮：用于作为外链的行动点。
 
 以及四种状态属性与上面配合使用。
 
  危险：删除/移动/修改权限等危险操作，一般需要二次确认。

  禁用：行动点不可用的时候，一般需要文案解释。

  ## props
  className ?: string;

   /** 设置 Button 的禁用 */

   disabled ?: boolean;

   /** 设置 Button 的 尺寸 */

   size ?: ButtonSize;

   /** 设置 Button 的类型 */

   btnType ?: ButtonType;

   children : React.ReactNode;

   /** 设置link的href */

   href ?: string

# Input
通过鼠标或键盘输入内容，是最基础的表单域的包装

## 何时使用
需要用户输入表单域内容时

提供组合型输入框，带搜索的输入框，还可以进行大小选择

## props
/** 是否禁用 Input */

  disabled ?: boolean;

  /** 设置 Input 大小 `lg | sm` */

  size ?: InputSize;

  /** 添加图标，在右侧悬浮添加一个图标，用于提示，Icon是对react-fontawesome的封装 */ 

  icon ?: IconProp;

  /** 添加前缀 用于配置一些固定组合 */

  prepend ?: string | ReactElement;

  /** 添加后缀 用于配置一些固定组合 */

  append ?: string | ReactElement;

  onChange ?: (e:ChangeEvent<HTMLInputElement>) => void

# Icon
```js
export interface IconProps extends FontAwesomeIconProps {
  /** 不同主题 */
  theme ?: ThemeProps
}
```
用于选择图标的组件

# Transition
```js
type TransitionProps = CSSTransitionProps & { 
  animation?: AnimationName,
  wrapper ?: boolean
}
```
方便的生成动画效果，在submenu中用到

# menu
```js
export interface MenuProps {
  /**默认展示第几项 */
  defaultIndex ?: string;
  className ?: string;
  /**菜单横向排布还是纵向排布 `"horizontal" | "vertical"` */
  mode ?: MenuMode;
  style ?: CSSProperties;
  /** 旋转切换回调 */
  onSelect ?: SelectCallback;
  /**是否默认展开子菜单 */
  defaultOpenSubMenus ?: string[];
  children?:ReactNode | string
}
```
Menu组件提供了横向纵向的菜单，并且包裹下拉菜单,使用时子节点必须是MenuItem

## MenuItem
```js
export interface MenuItemProps{
    index?:string,
    disabled?:boolean,
    className?:string,
    style?:React.CSSProperties,
    children?:ReactNode | string
}
```


## SubMenu
```js
export interface SubMenuProps{
    index?:string,
    className?:string,
    title:string,
    children?: ReactNode 
}
```

# 一个小巧玲珑Progress进度条（其实是没时间继续优化）

```js
export interface ProgressProps{
    percent:number;//百分比
    strokeHeight?:number;//进度条高度
    showText?:boolean;
    styles?:React.CSSProperties;
    theme?:ThemeProps//预定好主题中的一个
}
```

# upload
        
文件选择上传和拖拽上传控件

上传是将信息（网页、文字、图片、视频等）通过网页或者上传工具发布到远程服务器上的过程。

当需要上传一个或一些文件时

当需要展现上传的进度时

当需要使用拖拽交互时。

默认带有进度条
```js
export interface UploadProps{
    action:string;//请求url
    onProgress?:(percentage:number , file:File)=> void;//处理进程中多次调用
    onSuccess?:(data:any,file:File)=>void;//成功时的回调
    onError?:(err:any,file:File)=>void;//错误时的处理函数
    onChange?:(file:File)=>void;//上传完成之后对文件的处理
    beforeUpload?:(file:File)=> boolean | Promise<File>;//更新前对文件的处理
    defaultFileList?:UploadFile[];//在用户未上传文件时的展示的UpLoadList，可以用来提示用户上传哪些文件
    onRemove?:(file:UploadFile)=>void;//移除UpLoadList中某一项时的回调
    headers?:{[key:string]:any};//发送axios时的请求头，默认只有'Content-type':'multipart/form-data'
    name?:string;//发送给后端时文件的名称
    data?:{[key:string]:any};//file发送给后端时携带的数据
    withCredentials?:boolean;//携带cookie否
    accept?:string;//接收文件类型
    multiple?:boolean;//多选否
    children?:React.ReactNode;//upload区域显示给用户的内容
    drag?:boolean;//是否使用拖拽模式
    draggerStyle?:React.CSSProperties;//拖拽模式的样式
}
export type UploadFileStatus= 'ready' | 'uploading' | 'success' | 'error'

export interface UploadFile{//对上传文件进行处理，新的数据结构更方便处理生命周期中的事件
    uid:string;
    size:number;
    name:string;
    status?:UploadFileStatus;
    percent?:number;
    raw?:File;//原始文件
    response?:any;
    error?:any;
}
```
# Select组件
```js
type valueType = string | number
type selectSizeType = 'large' | 'middle' | 'small'

export interface SelectProps {
  /** 支持清除 */
  allowClear ?: boolean;
  /** 默认获取焦点 */
  autoFocus ?: boolean;
  className ?: string;
  /** 使单选模式可搜索 */
  showSearch?: boolean;
  /** 指定默认选中条目 */
  defaultValue ?: valueType;
  /** 是否禁用 */
  disabled ?: boolean;
  /** 下拉菜单的 className 属性 */
  dropdownClassName ?: string;
  style ?: CSSProperties;
  /** 下拉菜单的 style 属性 */
  dropdownStyle ?: CSSProperties;
  /** 设置弹窗滚动高度 */
  listHeight ?: number;
  /** 最多显示多少个 tag */
  maxTagCount ?: number;
  /** 当下拉列表为空时显示的内容 */
  notFoundContent ?: ReactNode;
  /** 选择框默认文字 */
  placeholder ?: string;
  /** 是否显示下拉小箭头 */
  showArrow ?: boolean;
  /** 选择框大小 */
  size ?: selectSizeType;
  /** 指定当前选中的条目 */
  value ?: valueType;
  /** 失去焦点的回调 */
  onBlur ?: Function;
  /** 获得焦点时回调 */
  onFocus ?: Function;
  /** 被选中时回调 */
  onSelect ?: (value : any, ...rest: any[]) => void;
  /** 文本框值变化时的回调 */
  onSearch ?: (value : string) => void;
  filterOption ?: (inputValue: string, option ?: any) => boolean;
  /** input 的 value 变化 */
  onChange ?: (value : any, ...rest: any[]) => void;
  /** 是否展开下拉菜单 */
  open ?: boolean;
  /** 加载中状态 */
  loading ?: boolean;
  children?:ReactNode;
}
```
选择框组件