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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
const Svg_1 = __importDefault(require("../icons/Svg"));
function Checkbox(props) {
    const { onChange, value, ...rest } = props;
    const initialValue = (0, react_1.useRef)(value);
    return ((0, jsx_runtime_1.jsxs)("label", { className: 'flex cursor-pointer hover:scale-[1.03] duration-150', children: [(0, jsx_runtime_1.jsx)("input", { checked: value ? true : false, type: "checkbox", onChange: (e) => onChange && onChange(e), className: 'hidden', value: '' }), (0, jsx_runtime_1.jsx)(Svg_1.default.CircleCheck, { className: `h-[23px] w-[23px] fill-color-1 dark:fill-color-1-dark ${!value && 'hidden'} ${rest.className}` }), (0, jsx_runtime_1.jsx)(Svg_1.default.Circle, { className: `h-[23px] w-[23px] fill-color-3 dark:color-3-dark ${value && 'hidden'} ${rest.className}` })] }));
}
exports.default = (0, react_1.memo)(Checkbox);
