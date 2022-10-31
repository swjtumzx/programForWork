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
import React, { createContext, useState, Children, cloneElement, useRef, useEffect } from 'react';
import classNames from 'classnames';
import Icon from '../Icon';
import Transition from '../Transition';
import { useClickOutside } from '../../hooks/useClickOutside';
export var SelectContext = createContext({ valueText: -1 });
export var Select = function (props) {
    var children = props.children, allowClear = props.allowClear, autoFocus = props.autoFocus, showSearch = props.showSearch, defaultValue = props.defaultValue, disabled = props.disabled, dropdownClassName = props.dropdownClassName, style = props.style, dropdownStyle = props.dropdownStyle, listHeight = props.listHeight, maxTagCount = props.maxTagCount, notFoundContent = props.notFoundContent, _a = props.placeholder, placeholder = _a === void 0 ? '' : _a, showArrow = props.showArrow, size = props.size, value = props.value, onBlur = props.onBlur, onFocus = props.onFocus, onSelect = props.onSelect, onChange = props.onChange, onSearch = props.onSearch, filterOption = props.filterOption, _b = props.open, open = _b === void 0 ? false : _b, _c = props.loading, loading = _c === void 0 ? false : _c, className = props.className;
    var _d = useState(''), currentShowText = _d[0], setShowText = _d[1];
    var _e = useState(defaultValue || value || ''), currentActiveValue = _e[0], setActiveValue = _e[1];
    var _f = useState(open), isShowDropMenu = _f[0], setShowDropMenu = _f[1];
    var _g = useState(false), isFocus = _g[0], setFocus = _g[1];
    var selectContainer = useRef(null);
    var selectInp = useRef(null);
    useEffect(function () {
        if ((children === null || children === void 0 ? void 0 : children.toString()) !== currentActiveValue) {
            React.Children.map(children, function (child) {
                var childElement = child;
                if (currentActiveValue.toString() === childElement.props.value.toString()) {
                    setShowText(childElement.props.children);
                }
            });
        }
    }, [currentActiveValue, children]);
    useClickOutside(selectContainer, function () {
        setShowDropMenu(false);
        setFocus(false);
    });
    var selCls = classNames('m-select', className, {
        'is-disabled': disabled,
        'select-large': size === 'large',
        'select-small': size === 'small',
        'is-opened': isShowDropMenu,
        'is-clear': allowClear
    });
    var handleSelectClick = function (value) {
        setActiveValue(value);
        onSelect && onSelect(value);
        setShowDropMenu(false);
    };
    var handleClearSelectorClick = function (e) {
        e.stopPropagation();
        setActiveValue('');
        setShowText('');
    };
    var handleFocus = function () {
        showSearch && setFocus(true);
        onFocus && onFocus();
    };
    var handleBlur = function () {
        showSearch && setFocus(false);
        onBlur && onBlur();
    };
    var handleChange = function (e) {
        setShowDropMenu(true);
        showSearch && setActiveValue(e.target.value);
        showSearch && setShowText(e.target.value);
        onChange && onChange(e.target.value);
    };
    var handleSearch = function (e) {
        if (e.keyCode === 13) {
            onSearch && onSearch(String(currentShowText));
        }
    };
    var selItemContext = {
        valueText: currentActiveValue,
        onSelect: handleSelectClick,
        defaultValue: defaultValue,
        dropdownStyle: dropdownStyle,
        dropdownClassName: dropdownClassName,
    };
    var renderChildren = function () {
        var childrenComponent = Children.map(children, function (child) {
            var childElement = child;
            var displayName = childElement.type.displayName;
            if (displayName === 'SelectItem') {
                var isRenderItem = filterOption && childElement && filterOption(String(currentActiveValue), childElement.props);
                if (filterOption) {
                    if (isRenderItem) {
                        return cloneElement(childElement, { value: childElement.props.value, });
                    }
                    else {
                        return null;
                    }
                }
                else {
                    return cloneElement(childElement, { value: childElement.props.value, });
                }
            }
            else {
                console.error('Warning: Menu has a child which is not a MenuItem');
                return null;
            }
        });
        return (_jsx(Transition, __assign({ in: isShowDropMenu, timeout: 200, animation: "zoom-in-top" }, { children: _jsxs("div", __assign({ className: "m-select-items", style: { maxHeight: "".concat(listHeight, "px"), overflow: 'auto' } }, { children: [childrenComponent === null || childrenComponent === void 0 ? void 0 : childrenComponent.slice(0, maxTagCount), (childrenComponent === null || childrenComponent === void 0 ? void 0 : childrenComponent.length) === 0 && _jsx("span", __assign({ className: "not-found" }, { children: notFoundContent }))] })) })));
    };
    var renderSearchSelector = function () { return (_jsx("div", __assign({ className: "m-select-selection-search" }, { children: _jsx("input", { type: "text", ref: selectInp, autoFocus: autoFocus, placeholder: placeholder, value: currentShowText, onFocus: handleFocus, onBlur: handleBlur, onChange: handleChange, className: "m-select-selection-search-input" }) }))); };
    var isShowDownIcon = !loading && showArrow && !isFocus;
    return (_jsxs("div", __assign({ className: selCls, ref: selectContainer, style: style, "data-testid": "test-select" }, { children: [_jsxs("div", __assign({ className: "m-selector", onKeyDown: handleSearch, "data-testid": "test-selector", onClick: function () { var _a; !disabled && setShowDropMenu(!isShowDropMenu); (_a = selectInp.current) === null || _a === void 0 ? void 0 : _a.focus(); } }, { children: [showSearch ? renderSearchSelector() : _jsx("span", { children: currentShowText }), isShowDownIcon &&
                        _jsx(Icon, { icon: "angle-down", className: classNames({
                                "arrow-icon": isShowDownIcon && !showSearch
                            }), size: "sm" }), showSearch && isFocus && _jsx(Icon, { icon: "search", size: "sm" }), allowClear && !showSearch &&
                        _jsx(Icon, { icon: "times-circle", className: "close-icon", size: "sm", onClick: function (e) { return handleClearSelectorClick(e); } }), !showSearch && loading && _jsx(Icon, { icon: "spinner", size: "sm", spin: true, theme: "primary" })] })), _jsx(SelectContext.Provider, __assign({ value: selItemContext }, { children: renderChildren() }))] })));
};
Select.defaultProps = {
    allowClear: false,
    autoFocus: false,
    disabled: false,
    listHeight: 256,
    notFoundContent: 'Not Found',
    showArrow: true,
    loading: false,
    open: false,
    maxTagCount: 100,
    size: 'middle'
};
export default Select;
