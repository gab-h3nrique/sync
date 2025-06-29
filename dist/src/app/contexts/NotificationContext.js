'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationProvider = exports.DispatchNotificationContext = exports.NotificationContext = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const NotificationsItem_1 = __importDefault(require("../components/elements/NotificationsItem"));
exports.NotificationContext = (0, react_1.createContext)(undefined);
exports.DispatchNotificationContext = (0, react_1.createContext)(undefined);
const NotificationProvider = ({ children }) => {
    const [list, setList] = (0, react_1.useState)([]);
    const removeItem = (0, react_1.useCallback)((id) => {
        setList((prev) => (prev.filter(e => e._id !== id)));
    }, []);
    const push = (0, react_1.useCallback)((item) => {
        const TIMER = item.time && item.time >= 3000 ? item.time : 3000;
        const ID = parseInt(String(Math.random() * 9543));
        setList((prev) => {
            setTimeout(() => removeItem(ID), TIMER);
            return [...prev, { ...item, _id: ID, time: TIMER }];
        });
    }, []);
    const contextValue = (0, react_1.useMemo)(() => ({
        list,
        push
    }), [list]);
    return ((0, jsx_runtime_1.jsx)(exports.NotificationContext.Provider, { value: contextValue, children: (0, jsx_runtime_1.jsxs)(exports.DispatchNotificationContext.Provider, { value: push, children: [(0, jsx_runtime_1.jsx)("section", { className: 'z-[999] w-full h-full flex absolute pointer-events-none overflow-hidden', children: (0, jsx_runtime_1.jsx)("div", { className: 'relative flex flex-col ml-auto p-3', children: list?.map(item => (0, jsx_runtime_1.jsx)(NotificationsItem_1.default, { notification: item, onClose: () => removeItem(item._id || -1) }, item._id)) }) }), children] }) }));
};
exports.NotificationProvider = NotificationProvider;
