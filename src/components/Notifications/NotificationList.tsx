import React, { useEffect } from 'react';
import { useNotification, NotifyProps, MessageType } from './NotificationContext';

const NotificationList: React.FC = () => {
    const { notifications } = useNotification();

    return (
        <div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center mt-4 text-center">
            {notifications.map((notification, index) => (
                <Notification key={index} MsgType={notification.MsgType} Message={notification.Message} index={index} />
            ))}
        </div>
    );
};

const Notification: React.FC<NotifyProps & { index: number }> = ({ MsgType, Message, index }) => {
    const { removeNotification } = useNotification();

    useEffect(() => {
        const timer = setTimeout(() => {
            removeNotification(index);
        }, 3000);

        return () => clearTimeout(timer);
    }, [index, removeNotification]);

    const borderColorMap: { [key in MessageType]: string } = {
        success: 'border-green-500',
        error: 'border-red-500',
        warning: 'border-yellow-500',
        info: 'border-blue-500',
    };

    return (
        <>
            <div className={`flex items-center w-full max-w-2xl p-4 mt-2 rounded-lg shadow text-white bg-contentbackground border-b-4 ${borderColorMap[MsgType]}`}>
                <div className="text-sm font-normal">{Message}</div>
            </div>
        </>
        
    );
};
export { NotificationList };