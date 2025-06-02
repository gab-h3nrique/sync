'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_dom_1 = __importDefault(require("react-dom"));
const Modal = ({ id, isOpen, onClose, children, className }) => {
    const ref = (0, react_1.useRef)(null);
    const ID = id || parseInt(String(Math.random() * 9584848443));
    const [portal, setPortal] = (0, react_1.useState)();
    (0, react_1.useEffect)(() => {
        if (typeof window !== "undefined") {
            setPortal(document.getElementById('portal'));
        }
    }, []);
    return (portal ? react_dom_1.default.createPortal((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { onClick: () => onClose && onClose(ref.current), className: `absolute backdrop-blur-[.8px] top-0 right-0 w-screen h-screen z-[50] ${isOpen ? 'flex' : 'hidden'}` }), (0, jsx_runtime_1.jsxs)("div", { ref: ref, id: `${ID}`, className: `absolute w-fit h-fit justify-center items-center top-0 right-0 bottom-0 left-0 m-auto z-[51] ${isOpen ? 'flex' : 'hidden'}`, children: [children, (0, jsx_runtime_1.jsx)("span", { className: "text-white", children: isOpen ? 'true' : 'false' })] })] }), portal) : null);
};
exports.default = (0, react_1.memo)(Modal);
