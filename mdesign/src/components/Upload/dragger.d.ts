import React, { FC, ReactNode } from 'react';
export interface DraggerProps {
    onFile: (files: FileList) => void;
    children?: ReactNode;
    style?: React.CSSProperties;
}
export declare const Dragger: FC<DraggerProps>;
export default Dragger;
