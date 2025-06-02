"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const Svg_1 = __importDefault(require("./icons/Svg"));
const Texts_1 = require("./texts/Texts");
function Loading() {
    return ((0, jsx_runtime_1.jsxs)("article", { className: "w-full h-full flex gap-2 justify-center items-center", children: [(0, jsx_runtime_1.jsx)(Texts_1.Description, { children: "Carregando " }), (0, jsx_runtime_1.jsx)(Svg_1.default.Spinner, { className: 'w-4 h-4 fill-color-1 dark:fill-color-1-dark' })] }));
}
exports.default = Loading;
