'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
function Button(props) {
    const { className, children, ...rest } = props;
    return ((0, jsx_runtime_1.jsx)("button", { className: `flex items-center gap-2 button w-fit description border dark:border-dark font-semibold py-[.438rem] px-4 rounded-lg ${className}`, ...rest, children: children }));
}
exports.default = Button;
