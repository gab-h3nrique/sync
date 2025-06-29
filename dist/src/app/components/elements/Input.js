'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
function Input(props) {
    const { onChange, value, icon, className, ...rest } = props;
    const initialValue = (0, react_1.useRef)(value);
    function change(e) {
        console.log('hehe');
    }
    return (
    // <button className={`w-fit description border bg-background-2 text-color-1 font-semibold py-1.5 px-4 rounded-lg hover:scale-[1.01] duration-150 ${className}`} {...rest}>
    //   {children}
    // </button>
    (0, jsx_runtime_1.jsxs)("label", { className: `flex gap-2 description bg-background-2 border border-border text-color-1 font-semibold py-[.438rem] px-4 rounded-lg hover:scale-[.998] duration-150 ${className}`, ...rest, children: [icon, (0, jsx_runtime_1.jsx)("input", { onChange: onChange, value: value || '', className: 'description text-color-1 dark:text-color-1-dark py-[.125rem] bg-transparent outline-0 w-full h-full', ...rest })] }));
}
exports.default = (0, react_1.memo)(Input);
