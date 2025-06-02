'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
function Hr(props) {
    const { className, children, ...rest } = props;
    return ((0, jsx_runtime_1.jsx)("hr", { className: `w-full opacity-50 ${className}`, ...rest }));
}
exports.default = Hr;
