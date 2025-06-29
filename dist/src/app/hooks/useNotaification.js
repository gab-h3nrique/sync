"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useNotification = void 0;
const react_1 = require("react");
const NotificationContext_1 = require("../contexts/NotificationContext");
const useNotification = () => {
    const context = (0, react_1.useContext)(NotificationContext_1.DispatchNotificationContext);
    if (!context)
        throw new Error('context should be used inside its provider');
    return context;
};
exports.useNotification = useNotification;
