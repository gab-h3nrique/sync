'use client';
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
function Textarea(props) {
    const { onChange, value, icon, className, ...rest } = props;
    return (
    // <button className={`w-fit description border bg-background-2 text-color-1 font-semibold py-1.5 px-4 rounded-lg hover:scale-[1.01] duration-150 ${className}`} {...rest}>
    //   {children}
    // </button>
    (0, jsx_runtime_1.jsx)("label", { className: `flex gap-2 description border bg-background-2 text-color-1 dark:bg-background-2-dark dark:text-color-1-dark font-semibold py-[.438rem] px-4 rounded-lg hover:scale-[1.01] duration-150 ${className}`, ...rest, children: (0, jsx_runtime_1.jsx)("textarea", { onChange: onChange, value: value || '', className: 'description text-color-1 dark:text-color-1-dark bg-transparent outline-0 w-full h-full', ...rest }) }));
}
exports.default = (0, react_1.memo)(Textarea);
