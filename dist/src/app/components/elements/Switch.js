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
function Switch(props) {
    const { onChange, value, ...rest } = props;
    const initialValue = (0, react_1.useRef)(value);
    function change(e) {
        console.log('hehe');
    }
    return ((0, jsx_runtime_1.jsxs)("label", { className: `relative p-[3px] min-w-[48px] w-[48px] h-[27px] rounded-full select-none cursor-pointer bg-color-3 dark:bg-color-3-dark has-[:checked]:bg-color-1 hover:scale-[1.02] duration-150 ${rest.className}`, children: [(0, jsx_runtime_1.jsx)("input", { checked: value ? true : false, type: "checkbox", onChange: onChange, className: 'hidden peer', value: '' }), (0, jsx_runtime_1.jsx)("article", { className: `bg-background-1 dark;bg-background-1-dark w-[50%] h-full rounded-full peer-checked:translate-x-[100%] duration-300 ease-in-out` })] }));
}
exports.default = Switch;
