'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
function Observer({ isIntersecting }) {
    const ref = (0, react_1.useRef)(null);
    const [inViewport, setInViewport] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setInViewport(entry.isIntersecting);
        });
        if (ref.current)
            observer.observe(ref.current);
        return () => {
            if (ref.current)
                observer.unobserve(ref.current);
        };
    }, [ref]);
    (0, react_1.useEffect)(() => {
        if (inViewport)
            isIntersecting();
    }, [inViewport]);
    return ((0, jsx_runtime_1.jsx)("span", { ref: ref }));
}
exports.default = Observer;
