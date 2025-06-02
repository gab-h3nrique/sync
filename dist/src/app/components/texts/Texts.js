"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Title = Title;
exports.Subtitle = Subtitle;
exports.Paragraph = Paragraph;
exports.Description = Description;
exports.Label = Label;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
function Title(props) {
    const { className, children, ...rest } = props;
    return ((0, jsx_runtime_1.jsx)("h1", { className: `title text-color-1 dark:text-color-1-dark ${className}`, ...rest, children: children }));
}
function Subtitle(props) {
    const { className, children, ...rest } = props;
    return ((0, jsx_runtime_1.jsx)("h1", { className: `subtitle text-color-2 dark:text-color-2-dark ${className}`, ...rest, children: children }));
}
function Paragraph(props) {
    const { className, children, ...rest } = props;
    return ((0, jsx_runtime_1.jsx)("h1", { className: `paragraph text-color-2 dark:text-color-2-dark ${className}`, ...rest, children: children }));
}
function Description(props) {
    const { className, children, ...rest } = props;
    return ((0, jsx_runtime_1.jsx)("h1", { className: `description text-color-2 dark:text-color-2-dark ${className}`, ...rest, children: children }));
}
function Label(props) {
    const { className, children, ...rest } = props;
    return ((0, jsx_runtime_1.jsx)("h1", { className: `label text-color-2 dark:text-color-2-dark ${className}`, ...rest, children: children }));
}
const Text = {
    Title,
    Subtitle,
    Paragraph,
    Description,
    Label
};
exports.default = Text;
