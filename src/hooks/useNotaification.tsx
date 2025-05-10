import { NotificationContext, DispatchNotificationContext } from "@/contexts/NotificationContext";
import { useContext } from "react";


export const useNotification = () => {

    const context = useContext(DispatchNotificationContext);

    if(!context) throw new Error('context should be used inside its provider');

    return context

};