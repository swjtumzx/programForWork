import React,{useState} from 'react';
import Button from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/submenu';
import { library } from '@fortawesome/fontawesome-svg-core'
import {fas } from '@fortawesome/free-solid-svg-icons'
import Input from './components/Input/input';
import { AutoComplete, DataSourceType } from './components/AutoComplete/autocomplete';
import { Upload } from './components/Upload/upload';
library.add(fas)




function App() {

  return (
    <div className="App" data-testid="app">
      <TestUpload />
    </div>
  );
}

export default App;



const DisabledInput = () => (
  <Input  placeholder="disabled input" disabled />
)

const IconInput = () => (
  <Input  placeholder="input with icon" icon="search"/>  
)

const SizeInput = () => (
  <>
    <Input  defaultValue="large size" size="lg"/>
    <Input  placeholder="small size" size="sm"/>
  </>
)

const PendInput = () => (
  <>
    <Input  defaultValue="prepend text" prepend="https://"/>
    <Input  defaultValue="google" append=".com"/>
    
  </>
)

const ControlledInput=()=> {
  const [value,setV]=useState('');
  return <Input placeholder='ControlledInput' defaultValue={value} value={value} onChange={e=>{setV(e.target.value); console.log(value)}}/>
}

const TestMenu=()=><Menu mode={"horizontal"} onSelect={(i)=>alert(i)} defaultOpenSubMenus={['2']}>
      <MenuItem>1</MenuItem>
      <MenuItem>2</MenuItem>
      <SubMenu title='dropdown'>
        <MenuItem>1 sub</MenuItem>
        <MenuItem>2 sub</MenuItem>
      </SubMenu>
      <MenuItem>3</MenuItem>
</Menu>

const TestButton=()=><>
    <Button disabled={true}>nonono</Button>
    <Button btnType={'link'} >is is is </Button>
    <Button btnType={'primary'} size={'lg'}>nonono</Button>
    <Button btnType={'link'} size={'sm'} href="https://www.baidu.com" >nonono</Button>
    <Button btnType={'danger'} onClick={()=> alert('danger')}>nonono</Button>
    <Button btnType="default">default</Button>
</>

const TestInput=()=><>
  <Input  placeholder="placeholder" onChange={()=>alert('changed')}/>
  <DisabledInput />
  <IconInput />
  <SizeInput />
  <PendInput />
  <ControlledInput />
</>

const DAutoComplete=()=>{
    //const s=[{value:'a'},{value:'ac'},{value:'ace'},{value:'r'}];
    const fetchSuggestion=(str:string)=> fetch(`https://api.github.com/search/users?q=${str}`).then(v => v.json())
    .then(({items})=>{
      console.log(items);
      const formatItems=items.slice(0,10).map((item:any)=>({
        value:item.login,
        ...item
      }))
      return formatItems
    }) ;
    const onSelect=(str:DataSourceType) => console.log(str);
    const renderOption=(item:DataSourceType)=> <>{item.value}</>
    return <AutoComplete renderOption={renderOption} onSelect={onSelect} fetchSuggestions={fetchSuggestion} />
}

const TestAutoComplete=() => <>
    <DAutoComplete />
</>


const TestUpload=()=>{
  const onProgress=(p:number,file:File)=>{
    console.log(p);
  }
  const checkFileSize=(file:File)=>{
    const size=Math.round(file.size/1024);
    if(size>50){
      alert('too large');
      return false
    }
    return true;
  }
  /*const filePromise=(file:File)=>{
    const newFile=new File([file],'new-file.png',{type:file.type});
    return Promise.resolve(newFile)
  }*/
  const defaultFileList=[
    {name:'1.txt',uid:'1',size:1},
    {name:'2.txt',uid:'2',size:2},
    {name:'3.txt',uid:'3',size:3}
  ]
  return (
    <Upload defaultFileList={defaultFileList} multiple={true} drag={true} action="https://jsonplaceholder.typicode.com/posts" onProgress={onProgress}>
      <h1>drag to upload</h1>
    </Upload>
  );
}