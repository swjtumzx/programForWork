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
import { useEffect, useState, useRef } from "react";
import Icon from "../Icon/icon";
import Input from "../Input/input";
import { useDebounce } from '../../hooks/useDebounce';
import classNames from 'classnames';
import { useClickOutside } from "../../hooks/useClickOutside";
var AutoComplete = function (props) {
    var onSelect = props.onSelect, fetchSuggestions = props.fetchSuggestions, value = props.value, renderOption = props.renderOption, restProps = __rest(props, ["onSelect", "fetchSuggestions", "value", "renderOption"]);
    var _a = useState(value), inputValue = _a[0], setInputValue = _a[1];
    var _b = useState([]), suggestions = _b[0], setSuggestions = _b[1];
    var _c = useState(false), loading = _c[0], setLoading = _c[1];
    var _d = useState(-1), highlightIndex = _d[0], setHighlightIndex = _d[1];
    var triggerSearch = useRef(false);
    var componentRef = useRef(null);
    var debouncedValue = useDebounce(inputValue);
    var handleChange = function (e) {
        var value = e.target.value.trim();
        setInputValue(value);
        triggerSearch.current = true;
    };
    useClickOutside(componentRef, function () { return setSuggestions([]); });
    useEffect(function () {
        if (debouncedValue && triggerSearch.current) {
            var results = fetchSuggestions(debouncedValue);
            if (results instanceof Promise) {
                setLoading(true);
                results.then(function (data) {
                    setLoading(false);
                    return setSuggestions(data);
                });
            }
            else {
                setSuggestions(results);
            }
        }
        else {
            setSuggestions([]);
        }
        setHighlightIndex(-1);
    }, [debouncedValue, fetchSuggestions]);
    var handleSelect = function (item) {
        setInputValue(item.value);
        setSuggestions([]);
        if (onSelect)
            onSelect(item);
        triggerSearch.current = false;
    };
    var renderTemplate = function (item) {
        return renderOption ? renderOption(item) : item.value;
    };
    var GenerateDropdown = function () {
        return _jsx("ul", __assign({ className: "suggestion-list" }, { children: suggestions.map(function (v, i) {
                var cnames = classNames('suggestion-item', {
                    'item-highlighted': i === highlightIndex
                });
                return _jsx("li", __assign({ className: cnames, onClick: function () { return handleSelect(v); } }, { children: renderTemplate(v) }), v.value);
            }) }));
    };
    var highlight = function (index) {
        if (index < 0)
            index = 0;
        if (index >= suggestions.length) {
            index = suggestions.length - 1;
        }
        setHighlightIndex(index);
    };
    var handleKeyDown = function (e) {
        switch (e.keyCode) {
            case 13:
                suggestions[highlightIndex] && handleSelect(suggestions[highlightIndex]);
                break;
            case 38:
                highlight(highlightIndex - 1);
                break;
            case 40:
                highlight(highlightIndex + 1);
                break;
            case 27:
                setSuggestions([]);
                break;
            default: break;
        }
    };
    return _jsxs("div", __assign({ className: "m-auto-complete", ref: componentRef }, { children: [_jsx(Input, __assign({ onChange: handleChange, value: inputValue }, restProps, { onKeyDown: handleKeyDown })), loading && _jsx("ul", { children: _jsx(Icon, { className: "suggestion-loading-icon", icon: 'spinner', spin: true }) }), suggestions.length ? _jsx(GenerateDropdown, {}) : null] }));
};
export default AutoComplete;
