'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const Texts_1 = require("../texts/Texts");
function Status(props) {
    const { value, ...rest } = props;
    function titleCase(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    if (value == 'em andamento')
        return ((0, jsx_runtime_1.jsxs)("div", { className: `flex gap-1 w-fit py-1 px-2 items-center bg-blue-200/10 rounded-md ${rest.className}`, ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: 'h-2 w-2 rounded-full bg-blue-500' }), (0, jsx_runtime_1.jsx)(Texts_1.Label, { className: 'text-blue-500 truncate', children: titleCase(value) })] }));
    if (value == 'aguardando peça')
        return ((0, jsx_runtime_1.jsxs)("div", { className: `flex gap-1 w-fit py-1 px-2 items-center bg-yellow-200/10 rounded-md ${rest.className}`, ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: 'h-2 w-2 rounded-full bg-yellow-500' }), (0, jsx_runtime_1.jsx)(Texts_1.Label, { className: 'text-yellow-500 truncate', children: titleCase(value) })] }));
    if (value == 'sem solução')
        return ((0, jsx_runtime_1.jsxs)("div", { className: `flex gap-1 w-fit py-1 px-2 items-center bg-red-200/10 rounded-md ${rest.className}`, ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: 'h-2 w-2 rounded-full bg-red-500' }), (0, jsx_runtime_1.jsx)(Texts_1.Label, { className: 'text-red-500 truncate', children: titleCase(value) })] }));
    if (value == 'finalizado')
        return ((0, jsx_runtime_1.jsxs)("div", { className: `flex gap-1 w-fit py-1 px-2 items-center bg-green-200/10 rounded-md ${rest.className}`, ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: 'h-2 w-2 rounded-full bg-green-500' }), (0, jsx_runtime_1.jsx)(Texts_1.Label, { className: 'text-green-500', children: titleCase(value) })] }));
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {});
}
exports.default = Status;
