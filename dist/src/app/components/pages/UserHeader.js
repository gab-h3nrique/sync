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
const Texts_1 = require("../texts/Texts");
const useUser_1 = __importDefault(require("@/hooks/useUser"));
const Svg_1 = __importDefault(require("../icons/Svg"));
function UserHeader(props) {
    const { className, ...rest } = props;
    const { user, setUser } = (0, useUser_1.default)();
    return ((0, jsx_runtime_1.jsxs)("section", { className: `flex gap-2 ${className}`, ...rest, children: [(0, jsx_runtime_1.jsxs)("article", { className: 'flex flex-col', children: [(0, jsx_runtime_1.jsx)(Texts_1.Description, { children: user && user.name }), (0, jsx_runtime_1.jsx)(Texts_1.Label, { className: 'text-color-3 dark:text-color-3', children: user && user.role == 100 ? 'Administrador' : 'técnico' })] }), (0, jsx_runtime_1.jsx)("article", { className: 'flex w-9 h-9 rounded-full bg-color-2 dark:bg-color-2-dark', children: (0, jsx_runtime_1.jsx)(Svg_1.default.User, { className: 'w-6 h-6 m-auto fill-background-2 dark:fill-background-2-dark' }) })] }));
}
exports.default = (0, react_1.memo)(UserHeader);
