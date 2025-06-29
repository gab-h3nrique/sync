"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
function Button(props) {
    const { className, children, ...rest } = props;
    return ((0, jsx_runtime_1.jsx)("button", { className: `flex items-center gap-2 w-fit description border border-border font-semibold py-[.438rem] px-4 rounded-lg hover:scale-[.98] duration-150 cursor-pointer ${className}`, ...rest, children: children }));
}
exports.default = Button;
