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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Icon from "../Icon/icon";
import { Progress } from "../Progress/progress";
export var UploadList = function (props) {
    var fileList = props.fileList, onRemove = props.onRemove;
    return _jsx("ul", __assign({ className: "m-upload-list" }, { children: fileList.map(function (item) {
            return (_jsxs("li", __assign({ className: "m-upload-list-item" }, { children: [_jsxs("span", __assign({ className: "file-name file-name-".concat(item.status) }, { children: [_jsx(Icon, { icon: "file-alt", theme: "secondary" }), item.name] })), _jsxs("span", __assign({ className: "file-status" }, { children: [item.status === "uploading" && _jsx(Icon, { icon: "spinner", theme: "primary", spin: true }), item.status === "success" && _jsx(Icon, { icon: "check-circle", theme: "success" }), item.status === "error" && _jsx(Icon, { icon: "times-circle", theme: "danger" })] })), _jsx("span", __assign({ className: "file-action" }, { children: _jsx(Icon, { icon: "times", onClick: function () { return onRemove(item); } }) })), item.status === 'uploading' && _jsx(Progress, { percent: item.percent || 0 })] }), item.uid));
        }) }));
};
