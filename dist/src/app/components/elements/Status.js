'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Status;
const jsx_runtime_1 = require("react/jsx-runtime");
function Status(props) {
    const { type, value, ...rest } = props;
    function valueCase() {
        return value.charAt(0).toUpperCase() + value.slice(1);
    }
    function handleColor() {
        if (type == 'neutral')
            return { op: 'bg-blue-200/10', bg: 'bg-blue-500', tx: 'text-blue-500' };
        if (type == 'success')
            return { op: 'bg-green-200/10', bg: 'bg-green-500', tx: 'text-green-500' };
        if (type == 'warning')
            return { op: 'bg-yellow-200/10', bg: 'bg-yellow-500', tx: 'text-yellow-500' };
        if (type == 'error')
            return { op: 'bg-red-200/10', bg: 'bg-red-500', tx: 'text-red-500' };
        return { op: 'bg-blue-200/10', bg: 'bg-blue-500', tx: 'text-blue-500' };
    }
    const color = handleColor();
    return ((0, jsx_runtime_1.jsxs)("article", { className: `flex gap-2 w-fit py-1 px-2 items-center ${color.op} rounded-md ${rest.className}`, ...rest, children: [(0, jsx_runtime_1.jsx)("label", { className: `h-2 w-2 rounded-full ${color.bg}` }), (0, jsx_runtime_1.jsx)("label", { className: `label text-color-1 truncate`, children: valueCase() })] }));
}
