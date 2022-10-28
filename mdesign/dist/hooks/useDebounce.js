import { useEffect, useState } from "react";
export var useDebounce = function (param, delay) {
    if (delay === void 0) { delay = 200; }
    var _a = useState(param), debouncedParam = _a[0], setDebouncedParam = _a[1];
    useEffect(function () {
        var timeout = setTimeout(function () { setDebouncedParam(param); }, delay);
        return function () { return clearTimeout(timeout); };
    }, [param, delay]);
    return debouncedParam;
};
