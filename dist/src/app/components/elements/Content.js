"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const NotificationContext_1 = require("../../contexts/NotificationContext");
function Content({ children }) {
    return ((0, jsx_runtime_1.jsx)("section", { className: 'flex w-full h-full flex-col bg-background-1 relative', children: (0, jsx_runtime_1.jsx)(NotificationContext_1.NotificationProvider, { children: children }) }));
}
exports.default = Content;
