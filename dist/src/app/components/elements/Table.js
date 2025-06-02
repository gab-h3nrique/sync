"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Th = exports.Td = exports.Tr = exports.Tbody = exports.Table = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const Table = (props) => {
    const { className, children, ...rest } = props;
    return ((0, jsx_runtime_1.jsx)("table", { className: `gap-[1px] w-fit h-fit flex flex-col border bg-border dark:border-dark dark:bg-border-dark rounded-xl overflow-hidden ${className}`, ...rest, children: children }));
};
exports.Table = Table;
const Tbody = (props) => {
    const { className, children, ...rest } = props;
    return ((0, jsx_runtime_1.jsx)("tbody", { className: `gap-[1px] w-fit h-fit flex flex-col ${className}`, ...rest, children: children }));
};
exports.Tbody = Tbody;
const Tr = (props) => {
    const { className, children, ...rest } = props;
    return ((0, jsx_runtime_1.jsx)("tr", { className: `gap-[1px] flex ${className}`, ...rest, children: children }));
};
exports.Tr = Tr;
const Td = (props) => {
    const { className, children, ...rest } = props;
    return ((0, jsx_runtime_1.jsx)("td", { className: `p-2 w-full bg-background-2 text-color-2 dark:bg-background-2-dark dark:text-color-2-dark truncate ${className}`, ...rest, children: children }));
};
exports.Td = Td;
const Th = (props) => {
    const { className, children, ...rest } = props;
    return ((0, jsx_runtime_1.jsx)("th", { className: `p-2 w-full bg-background-2 text-color-2 dark:bg-background-2-dark dark:text-color-2-dark truncate ${className}`, ...rest, children: children }));
};
exports.Th = Th;
