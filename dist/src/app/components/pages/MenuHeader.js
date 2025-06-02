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
function MenuHeader(props) {
    const { className, ...rest } = props;
    console.log('redering header......');
    return ((0, jsx_runtime_1.jsxs)("section", { className: `ml-6 gap-5 cursor-pointer flex justify-center items-center ${className}`, ...rest, children: [(0, jsx_runtime_1.jsx)(Svg_1.default.Bars, { className: 'button h-5 w-5 fill-color-1 dark:fill-color-1-dark' }), (0, jsx_runtime_1.jsx)(Svg_1.default.Logo, { className: 'h-10 w-12 scale-[1.2] fill-color-1 dark:fill-color-1-dark' })] }));
}
exports.default = (0, react_1.memo)(MenuHeader);
