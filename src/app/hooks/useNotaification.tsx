import { useContext } from "react";
import { DispatchNotificationContext } from "../contexts/NotificationContext";


export const useNotification = () => {

    const context = useContext(DispatchNotificationContext);

    if(!context) throw new Error('context should be used inside its provider');

    return context

};