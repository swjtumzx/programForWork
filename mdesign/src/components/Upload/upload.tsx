import React, { ChangeEvent, FC, useRef, useState } from "react";
import axios from "axios";
import { UploadList } from './uploadList';
import Dragger from "./dragger";

export interface UploadProps{
    action:string;
    onProgress?:(percentage:number , file:File)=> void;
    onSuccess?:(data:any,file:File)=>void;
    onError?:(err:any,file:File)=>void;
    onChange?:(file:File)=>void;
    beforeUpload?:(file:File)=> boolean | Promise<File>;
    defaultFileList?:UploadFile[];
    onRemove?:(file:UploadFile)=>void;
    headers?:{[key:string]:any};
    name?:string;
    data?:{[key:string]:any};
    withCredentials?:boolean;
    accept?:string;
    multiple?:boolean;
    children?:React.ReactNode;
    drag?:boolean;
    draggerStyle?:React.CSSProperties;
}
export type UploadFileStatus= 'ready' | 'uploading' | 'success' | 'error'

export interface UploadFile{
    uid:string;
    size:number;
    name:string;
    status?:UploadFileStatus;
    percent?:number;
    raw?:File;
    response?:any;
    error?:any;
}

/**
 * ## Upload上传
 * ---
 * 文件选择上传和拖拽上传控件。
 * 
 * ### 何时使用
 * ---
 * 上传是将信息（网页、文字、图片、视频等）通过网页或者上传工具发布到远程服务器上的过程。
 * - 当需要上传一个或一些文件时。
 * - 当需要展现上传的进度时。
 * - 当需要使用拖拽交互时。
 * 
 */
export const Upload:FC<UploadProps> =(props)=>{
    const {action,onError,onProgress,onSuccess,beforeUpload,onChange,
        defaultFileList,onRemove,name,headers,data,withCredentials,accept,multiple,children,drag,draggerStyle}=props;
    const fileInput=useRef<HTMLInputElement>(null)
    const [fileList,setFileList]=useState<UploadFile[]>(defaultFileList || []);

    const updateFileList=(updateFile:UploadFile,updateObj:Partial<UploadFile>)=>{
        setFileList(prevList=>{
            return prevList.map(file=>{
                if(file.uid===updateFile.uid){return{...file,...updateObj}}
                else return file
            })
        })
    }
    const handleClick=()=>{
        if(fileInput.current){
            fileInput.current.click();
        }
    }
    const handleFileChange=(e:ChangeEvent<HTMLInputElement>)=>{
        const files=e.target.files;
        if(!files) return;
        uploadFiles(files);
        if(fileInput.current){
            fileInput.current.value='';
        }
    }

    const uploadFiles=(files:FileList)=>{
        let postFiles=Array.from(files);
        postFiles.forEach(file=>{
            if(!beforeUpload){
                post(file)
            }else{
                const result=beforeUpload(file);
                if(result && result instanceof Promise){
                    result.then(processedFile=>post(processedFile))
                }else if(result===true){
                    post(file)
                }
            }
        })
    }
    /**
     * 
     * @param file 
     * 上传文件中的操作，调用了onProgress,onSuccess,onError
     */
    const post=(file:File)=>{
        let _file:UploadFile={
            uid:Date.now()+'upload-file',
            status:'ready',
            name:file.name,
            size:file.size,
            percent:0,
            raw:file
        }
        //setFileList([_file,...fileList])
        setFileList((prevList)=>{
            return [_file,...prevList]
        })//解决了多选时只会出现一个进度条的bug，与state更新有关
        const formData=new FormData();
        formData.append(name||file.name,file);
        if(data){
            Object.keys(data).forEach((key)=>{
                formData.append(key,data[key])
            })
        }
        axios.post(action,formData,{
            headers:{
                ...headers,
                'Content-type':'multipart/form-data'
            },
            withCredentials,
            onUploadProgress:(e)=>{
                let percentage=Math.round((e.loaded*100)/(e.total || 1)) || 0;
                if(percentage<100){
                    updateFileList(_file,{percent:percentage,status:'uploading'})
                    onProgress?.(percentage,file)
                }
            }
        })
        .then(res=>{
            updateFileList(_file,{percent:100,status:"success",response:res.data})
            onSuccess?.(res.data,file);
            onChange?.(file)
        }).catch(err=>{
            updateFileList(_file,{status:'error',error:err})
            onError?.(err,file)
            onChange?.(file)
        })
    }
    const handleRemove=(file:UploadFile)=>{
        setFileList(prevList=>{
            return prevList.filter(item=> item.uid!==file.uid)
        })
        onRemove?.(file)
    }

    return <div className="m-upload-wrapper m-upload-component">
        <div className="m-upload-input" style={{display:'inline-block'}} onClick={handleClick}>
            {drag? 
                (<Dragger style={draggerStyle} onFile={uploadFiles} >
                    <>{children}</>
                </Dragger>):
                <>{children}</>
            }
            <input multiple={multiple} accept={accept} onChange={handleFileChange} ref={fileInput}
             type={"file"} className="m-file-input" style={{display:'none'}} />
        </div>
        <UploadList fileList={fileList} onRemove={handleRemove} />
    </div>
}

Upload.defaultProps={
    name:'file',
}