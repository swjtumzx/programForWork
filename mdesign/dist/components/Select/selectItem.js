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
import { jsx as _jsx } from "react/jsx-runtime";
import { useContext } from 'react';
import classNames from 'classnames';
import { SelectContext } from './select';
export var SelectItem = function (props) {
    var disabled = props.disabled, value = props.value, className = props.className, style = props.style, children = props.children;
    var context = useContext(SelectContext);
    var classes = classNames('select-item', className, context.dropdownClassName, {
        'is-disabled': disabled,
        'is-active': context.valueText.toString() === value.toString()
    });
    var handleClick = function () {
        if (context.onSelect && !disabled) {
            context.onSelect(value);
        }
    };
    return (_jsx("div", __assign({ className: classes, style: style, onClick: handleClick }, { children: children })));
};
SelectItem.defaultProps = {
    disabled: false
};
SelectItem.displayName = 'SelectItem';
export default SelectItem;
