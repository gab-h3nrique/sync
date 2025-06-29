"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Title = Title;
exports.Subtitle = Subtitle;
exports.Paragraph = Paragraph;
exports.Description = Description;
exports.Label = Label;
const jsx_runtime_1 = require("react/jsx-runtime");
function Title(props) {
    const { className, children, ...rest } = props;
    return ((0, jsx_runtime_1.jsx)("h1", { className: `title text-color-1 ${className}`, ...rest, children: children }));
}
function Subtitle(props) {
    const { className, children, ...rest } = props;
    return ((0, jsx_runtime_1.jsx)("h3", { className: `subtitle text-color-2 ${className}`, ...rest, children: children }));
}
function Paragraph(props) {
    const { className, children, ...rest } = props;
    return ((0, jsx_runtime_1.jsx)("p", { className: `paragraph text-color-2 ${className}`, ...rest, children: children }));
}
function Description(props) {
    const { className, children, ...rest } = props;
    return ((0, jsx_runtime_1.jsx)("span", { className: `description text-color-2 ${className}`, ...rest, children: children }));
}
function Label(props) {
    const { className, children, ...rest } = props;
    return ((0, jsx_runtime_1.jsx)("label", { className: `label text-color-2 ${className}`, ...rest, children: children }));
}
const Text = {
    Title,
    Subtitle,
    Paragraph,
    Description,
    Label
};
exports.default = Text;
