"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Th = exports.Td = exports.Tr = exports.Table = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Table = (props) => {
    const { className, children, ...rest } = props;
    return (
    // <article className="table-wrapper flex border-2 border-color-3 rounded-2xl overflow-hidden">
    // <article className="table-wrapper">
    (0, jsx_runtime_1.jsx)("table", { className: ``, children: (0, jsx_runtime_1.jsx)("tbody", { className: ` ${className || ''}`, ...rest, children: children }) })
    // </article>
    );
};
exports.Table = Table;
const Tr = (props) => {
    const { className, children, ...rest } = props;
    return ((0, jsx_runtime_1.jsx)("tr", { className: `${className || ''}`, ...rest, children: children }));
};
exports.Tr = Tr;
const Td = (props) => {
    const { className, children, ...rest } = props;
    return ((0, jsx_runtime_1.jsx)("td", { className: `${className || ''}`, ...rest, children: children }));
};
exports.Td = Td;
const Th = (props) => {
    const { className, children, ...rest } = props;
    return ((0, jsx_runtime_1.jsx)("th", { className: `${className || ''}`, ...rest, children: children }));
};
exports.Th = Th;
