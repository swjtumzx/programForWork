import React from "react";
import Icon from "../Icon/icon";
import { Progress } from "../Progress/progress";
import { UploadFile } from './upload';

export interface UploadListProps{
    fileList:UploadFile[];
    onRemove:(_file:UploadFile)=>void;

}

export const UploadList=(props:UploadListProps)=>{
    const {fileList,onRemove}=props
    return <ul className="m-upload-list">
        {
            fileList.map(item => {
                return (
                <li className="m-upload-list-item" key={item.uid}>
                    <span className={`file-name file-name-${item.status}`}>
                        <Icon icon="file-alt" theme="secondary" />
                        {item.name}
                    </span>
                    <span className="file-status">
                        {item.status === "uploading" && <Icon icon={"spinner"} theme={"primary"} spin />}
                        {item.status === "success" && <Icon icon={"check-circle"} theme={"success"}/>}
                        {item.status === "error" && <Icon icon={"times-circle"} theme={"danger"}/>}
                    </span>
                    <span className="file-action">
                        <Icon icon="times" onClick={()=>onRemove(item)}/>
                    </span>
                    {item.status==='uploading' && <Progress percent={item.percent || 0}/>}
                </li>
                )
            })
        }
    </ul>
}