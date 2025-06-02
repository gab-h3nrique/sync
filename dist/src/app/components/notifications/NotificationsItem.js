"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Svg_1 = __importDefault(require("../icons/Svg"));
function NotificationItem({ notification, onClose }) {
    const [startTransition, setStartTransition] = (0, react_1.useState)(false);
    const [closeTransition, setCloseTransition] = (0, react_1.useState)(false);
    function start() {
        if (!notification.time)
            return;
        setStartTransition(true);
        setTimeout(() => setCloseTransition(true), (notification.time - 300));
    }
    (0, react_1.useEffect)(() => {
        start();
    }, []);
    return ((0, jsx_runtime_1.jsx)("article", { id: String(notification._id), className: `z-[999] flex w-80 relative duration-300 ${closeTransition ? 'h-0 opacity-0 overflow-hidden' : 'h-24'}`, children: (0, jsx_runtime_1.jsxs)("div", { className: `${startTransition ? '-translate-x-96' : ''} z-[999] absolute left-96 opacity-100 ease-in-out duration-700 bg-background-2 border dark:bg-background-2-dark dark:border-dark rounded-lg w-full h-full p-3 gap-3 flex shadow-sm pointer-events-auto`, children: [(0, jsx_runtime_1.jsx)("section", { className: "pt-1", children: notification.type == 'success' ? (0, jsx_runtime_1.jsx)(Svg_1.default.Check, { className: "h-5 w-5 fill-green-600" })
                        : notification.type == 'warning' ? (0, jsx_runtime_1.jsx)(Svg_1.default.TriangleExclamation, { className: "h-5 w-5 fill-yellow-500" })
                            : notification.type == 'error' ? (0, jsx_runtime_1.jsx)(Svg_1.default.Close, { className: "h-5 w-5 fill-red-600" })
                                : null }), (0, jsx_runtime_1.jsxs)("section", { className: 'flex flex-col gap-1 justify-around', children: [(0, jsx_runtime_1.jsx)("span", { className: 'font-semibold text-color-1 dark:text-color-1-dark text-base', children: notification.title }), (0, jsx_runtime_1.jsx)("p", { className: 'font-medium text-color-1 dark:text-color-1-dark opacity-90 text-sm', children: notification.description })] }), (0, jsx_runtime_1.jsx)("section", { onClick: () => setCloseTransition(true), className: "ml-auto", children: (0, jsx_runtime_1.jsx)(Svg_1.default.Close, { className: "fill-color-1 dark:fill-color-1-dark w-4 h-4 cursor-pointer" }) })] }) }, notification._id));
}
exports.default = (0, react_1.memo)(NotificationItem);
