'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const Svg_1 = __importDefault(require("./icons/Svg"));
const useTheme_1 = __importDefault(require("@/hooks/useTheme"));
function ThemeButton({ className }) {
    const { theme, change } = (0, useTheme_1.default)();
    return ((0, jsx_runtime_1.jsxs)("article", { className: `flex gap-4 p-2 rounded-full h-fit w-fit cursor-pointer ${className}`, children: [(0, jsx_runtime_1.jsx)(Svg_1.default.Sun, { onClick: () => change('light'), className: `w-4 h-4 fill-color-1 dark:fill-color-1-dark ${theme == 'light' ? 'hidden' : ''}` }), (0, jsx_runtime_1.jsx)(Svg_1.default.Moon, { onClick: () => change('dark'), className: `w-4 h-4 fill-color-1 dark:fill-color-1-dark ${theme == 'dark' ? 'hidden' : ''}` })] }));
}
exports.default = ThemeButton;
