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
exports.default = Select;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
const Svg_1 = __importDefault(require("../icons/Svg"));
const Modal_1 = __importDefault(require("../modals/Modal"));
function Select(props) {
    const { data, value, renderItem, className, style, childClassName, childStyle, ...rest } = props;
    const [isOpen, setIsOpen] = (0, react_1.useState)(false);
    const list = [];
    data && data.forEach((e, i) => {
        list.push(renderItem(e, i));
    });
    function close() {
        setIsOpen(false);
    }
    function open() {
        setIsOpen(true);
    }
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { onClick: close, className: `fixed top-0 left-0 backdrop-blur-[1.5px] w-full h-full ${!isOpen ? "opacity-0 pointer-events-none hidden" : "opacity-1 pointer-events-auto z-[30]"}` }), (0, jsx_runtime_1.jsxs)("div", { className: 'relative flex', children: [(0, jsx_runtime_1.jsxs)("button", { onClick: open, className: `relative flex gap-3 w-fit border description bg-background-2 text-color-1 dark:bg-background-2-dark dark:text-color-1-dark py-1.5 px-4 rounded-lg hover:scale-[1.01] duration-150 ${className}`, ...rest, children: [(0, jsx_runtime_1.jsx)("span", { children: value }), (0, jsx_runtime_1.jsx)(Svg_1.default.Angle, { className: 'ml-auto w-4 h-4 fill-color-1 dark:fill-color-1-dark rotate-180 mt-[.25rem]' })] }), (0, jsx_runtime_1.jsx)(Modal_1.default, { isOpen: isOpen, onClose: close, children: (0, jsx_runtime_1.jsx)("div", { className: "border rounded-lg bg-background-2 dark:bg-background-2-dark flex flex-col gap-2 py-4 px-5 w-fit h-fit max-h-72 text-color-1 dark:text-color-1-dark description overflow-auto", children: list.map((item, i) => ((0, jsx_runtime_1.jsx)("div", { className: 'cursor-pointer hover:scale-[1.01] duration-150', onClick: close, children: item }, i))) }) })] })] }));
}
