var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from "react";
import axios from "axios";
import { UploadList } from './uploadList';
import Dragger from "./dragger";
var Upload = function (props) {
    var action = props.action, onError = props.onError, onProgress = props.onProgress, onSuccess = props.onSuccess, beforeUpload = props.beforeUpload, onChange = props.onChange, defaultFileList = props.defaultFileList, onRemove = props.onRemove, name = props.name, headers = props.headers, data = props.data, withCredentials = props.withCredentials, accept = props.accept, multiple = props.multiple, children = props.children, drag = props.drag, draggerStyle = props.draggerStyle;
    var fileInput = useRef(null);
    var _a = useState(defaultFileList || []), fileList = _a[0], setFileList = _a[1];
    var updateFileList = function (updateFile, updateObj) {
        setFileList(function (prevList) {
            return prevList.map(function (file) {
                if (file.uid === updateFile.uid) {
                    return __assign(__assign({}, file), updateObj);
                }
                else
                    return file;
            });
        });
    };
    var handleClick = function () {
        if (fileInput.current) {
            fileInput.current.click();
        }
    };
    var handleFileChange = function (e) {
        var files = e.target.files;
        if (!files)
            return;
        uploadFiles(files);
        if (fileInput.current) {
            fileInput.current.value = '';
        }
    };
    var uploadFiles = function (files) {
        var postFiles = Array.from(files);
        postFiles.forEach(function (file) {
            if (!beforeUpload) {
                post(file);
            }
            else {
                var result = beforeUpload(file);
                if (result && result instanceof Promise) {
                    result.then(function (processedFile) { return post(processedFile); });
                }
                else if (result === true) {
                    post(file);
                }
            }
        });
    };
    var post = function (file) {
        var _file = {
            uid: Date.now() + 'upload-file',
            status: 'ready',
            name: file.name,
            size: file.size,
            percent: 0,
            raw: file
        };
        setFileList(function (prevList) {
            return __spreadArray([_file], prevList, true);
        });
        var formData = new FormData();
        formData.append(name || file.name, file);
        if (data) {
            Object.keys(data).forEach(function (key) {
                formData.append(key, data[key]);
            });
        }
        axios.post(action, formData, {
            headers: __assign(__assign({}, headers), { 'Content-type': 'multipart/form-data' }),
            withCredentials: withCredentials,
            onUploadProgress: function (e) {
                var percentage = Math.round((e.loaded * 100) / (e.total || 1)) || 0;
                if (percentage < 100) {
                    updateFileList(_file, { percent: percentage, status: 'uploading' });
                    onProgress === null || onProgress === void 0 ? void 0 : onProgress(percentage, file);
                }
            }
        })
            .then(function (res) {
            updateFileList(_file, { percent: 100, status: "success", response: res.data });
            onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess(res.data, file);
            onChange === null || onChange === void 0 ? void 0 : onChange(file);
        }).catch(function (err) {
            updateFileList(_file, { status: 'error', error: err });
            onError === null || onError === void 0 ? void 0 : onError(err, file);
            onChange === null || onChange === void 0 ? void 0 : onChange(file);
        });
    };
    var handleRemove = function (file) {
        setFileList(function (prevList) {
            return prevList.filter(function (item) { return item.uid !== file.uid; });
        });
        onRemove === null || onRemove === void 0 ? void 0 : onRemove(file);
    };
    return _jsxs("div", __assign({ className: "m-upload-wrapper m-upload-component" }, { children: [_jsxs("div", __assign({ className: "m-upload-input", style: { display: 'inline-block' }, onClick: handleClick }, { children: [drag ?
                        (_jsx(Dragger, __assign({ style: draggerStyle, onFile: uploadFiles }, { children: _jsx(_Fragment, { children: children }) }))) :
                        _jsx(_Fragment, { children: children }), _jsx("input", { multiple: multiple, accept: accept, onChange: handleFileChange, ref: fileInput, type: "file", className: "m-file-input", style: { display: 'none' } })] })), _jsx(UploadList, { fileList: fileList, onRemove: handleRemove })] }));
};
Upload.defaultProps = {
    name: 'file',
};
export default Upload;
