/// <reference types="react" />
import { UploadFile } from './upload';
export interface UploadListProps {
    fileList: UploadFile[];
    onRemove: (_file: UploadFile) => void;
}
export declare const UploadList: (props: UploadListProps) => JSX.Element;
