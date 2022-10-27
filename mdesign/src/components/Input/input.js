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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import classNames from 'classnames';
import Icon from '../Icon/icon';
/**
 * ## Input 输入框
 * ---
 * 通过鼠标或键盘输入内容，是最基础的表单域的包装。
 *
 * ### 何时使用
 * ---
 * - 需要用户输入表单域内容时。
 * - 提供组合型输入框，带搜索的输入框，还可以进行大小选择。
 *
 */
export var Input = function (props) {
    var _a;
    //取出props
    var children = props.children, disabled = props.disabled, size = props.size, icon = props.icon, prepend = props.prepend, append = props.append, style = props.style, restProps = __rest(props, ["children", "disabled", "size", "icon", "prepend", "append", "style"]);
    var classes = classNames('m-input-wrapper', (_a = {},
        _a["input-size-".concat(size)] = size,
        _a['is-disabled'] = disabled,
        _a['input-group'] = prepend || append,
        _a['input-group-append'] = !!append,
        _a['input-group-prepend'] = !!prepend,
        _a));
    var fixControlledValue = function (value) {
        if (value === null || value === undefined) {
            return '';
        }
        return value;
    }; //调试时使用受控组件时，如果一开始的值为空或者undefined，会弹出警告，故存在value时检查value的值
    if ('value' in props) {
        delete restProps.defaultValue;
        restProps.value = fixControlledValue(props.value);
    } //兼容受控非受控组件
    return (_jsxs("div", __assign({ className: classes, style: style }, { children: [prepend && _jsx("div", __assign({ className: "m-input-group-prepend" }, { children: prepend })), icon && _jsx("div", __assign({ className: "icon-wrapper" }, { children: _jsx(Icon, { icon: icon, title: "title-".concat(icon) }) })), _jsx("input", __assign({ className: "m-input-inner", disabled: disabled }, restProps)), append && _jsx("div", __assign({ className: "m-input-group-append" }, { children: append }))] })));
};
var defaultStyle = { width: '300px' };
Input.defaultProps = {
    placeholder: 'Input',
    size: 'sm',
    style: defaultStyle
};
export default Input;
