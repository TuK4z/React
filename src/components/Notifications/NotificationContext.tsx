import React, { createContext, useState, useContext, ReactNode } from 'react';

export type MessageType = "success" | "error" | "warning" | "info";
export interface NotifyProps {
    Message: string;
    MsgType: MessageType;
}

interface NotificationContextProps {
    notifications: NotifyProps[];
    addNotification: (notification: NotifyProps) => void;
    removeNotification: (index: number) => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [notifications, setNotifications] = useState<NotifyProps[]>([]);

    const addNotification = (notification: NotifyProps) => {
        setNotifications((prevNotifications) => [...prevNotifications, notification]);
    };

    const removeNotification = (index: number) => {
        setNotifications((prevNotifications) => prevNotifications.filter((_, i) => i !== index));
    };

    return (
        <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = (): NotificationContextProps => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};
