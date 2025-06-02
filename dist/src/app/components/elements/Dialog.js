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
function Dialog(props) {
    const { isOpen, onClose, children, className, ...rest } = props;
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { onClick: (e) => { e.stopPropagation(); onClose && onClose(); }, className: `dialog-backdrop fixed top-0 left-0 backdrop-blur-[.8px] w-screen h-screen ${!isOpen ? "opacity-0 pointer-events-none hidden" : "opacity-1 pointer-events-auto z-[30]"}` }), (0, jsx_runtime_1.jsx)("section", { onClick: (e) => { e.stopPropagation(); onClose && onClose(); }, className: `dialog absolute top-0 left-0 m-auto w-fit h-fit z-[31] ${isOpen ? 'flex' : 'hidden'}`, children: (0, jsx_runtime_1.jsx)("div", { className: `flex w-fit h-fit bg-background-2 dark:bg-background-2-dark ${className}`, ...rest, children: children }) })] }));
}
exports.default = (0, react_1.memo)(Dialog);
