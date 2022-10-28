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
import React, { useContext, useState } from "react";
import { MenuContext } from "./menu";
import classNames from 'classnames';
import Icon from '../Icon/icon';
import Transition from "../Transition/transition";
var SubMenu = function (_a) {
    var index = _a.index, title = _a.title, children = _a.children, className = _a.className;
    var context = useContext(MenuContext);
    var openSubMenus = context.defaultOpenSubMenus;
    var isOpened = (index && context.mode === 'vertical') ? openSubMenus.includes(index) : false;
    var _b = useState(isOpened), menuOpen = _b[0], setOpen = _b[1];
    var classes = classNames('menu-item submenu-item', className, {
        'is-active': context.index === index,
        'is-opened': menuOpen,
        'is-vertical': context.mode === 'vertical'
    });
    var handleClick = function (e) {
        e.preventDefault();
        setOpen(!menuOpen);
    };
    var timer;
    var handleMouse = function (e, toggle) {
        clearTimeout(timer);
        e.preventDefault();
        timer = setTimeout(function () {
            setOpen(toggle);
        }, 300);
    };
    var clickEvents = context.mode === 'vertical' ? {
        onClick: handleClick
    } : {};
    var hoverEvents = context.mode === 'horizontal' ? {
        onMouseEnter: function (e) { return handleMouse(e, true); },
        onMouseLeave: function (e) { return handleMouse(e, false); }
    } : {};
    var renderChildren = function () {
        var subMenuClasses = classNames('m-submenu', {
            'menu-opened': menuOpen
        });
        var childrenComponent = React.Children.map(children, function (child, i) {
            var childElement = child;
            if (childElement.type.displayName === 'MenuItem') {
                return React.cloneElement(childElement, {
                    index: "".concat(index, "-").concat(i)
                });
            }
            else {
                console.log('MenuItem needed in SubMenu');
            }
        });
        return _jsx(Transition, __assign({ in: menuOpen, timeout: 300, animation: "zoom-in-top" }, { children: _jsx("ul", __assign({ className: subMenuClasses }, { children: childrenComponent })) }));
    };
    return _jsxs("li", __assign({ className: classes }, hoverEvents, { children: [_jsxs("div", __assign({ className: "submenu-title", onClick: handleClick }, clickEvents, { children: [title, _jsx(Icon, { className: "arrow-icon", icon: "angle-down" })] })), renderChildren()] }), index);
};
SubMenu.displayName = "SubMenu";
export default SubMenu;
