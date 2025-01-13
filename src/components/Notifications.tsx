import React, { useEffect, useState } from 'react';
import Button from './Button';

type MessageType = 'success' | 'error' | 'warning' | 'info';
interface NotifyProps {
    Message: string;
    MsgType: MessageType;
}

interface InternalState extends NotifyProps {
    timeleft: number;
}

const Notifications: React.FC = () => {
    const [notifications, setNotifications] = useState<InternalState[]>([]);
    const [testState, setTestState] = useState(0);

    const addNotification = (notification: NotifyProps) => {
        setNotifications((prev) => {
            const newNotifications = [...prev, { ...notification, timeleft: Date.now(), hidden: false }];
            if (newNotifications.length > 3) newNotifications.shift();
            return newNotifications;
        });
    };

    const handleNotification = (notificationJson: string) => {
        try {
            const notification: NotifyProps = JSON.parse(notificationJson);
            addNotification(notification);
        } catch (error) {
            console.error('Invalid notification JSON', error);
            addNotification({ MsgType: 'error', Message: 'Įvyko klaida!' });
        }
    };

    const bgColorMap: { [key in MessageType]: string } = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        warning: 'bg-yellow-500',
        info: 'bg-blue-500',
    };

    const getClassNames = (index: number, length: number) => {
        const baseClass = 'rounded-lg flex items-center justify-center p-5';
        const sizeClass =
            length === 3
                ? index === 0
                    ? 'h-5 w-4/6 text-xs'
                    : index === 1
                    ? 'h-7 w-5/6 text-sm'
                    : 'h-10 w-full text-base'
                : length === 2
                ? index === 0
                    ? 'h-7 w-5/6 text-sm'
                    : 'h-10 w-full text-base'
                : 'h-10 w-full text-base';
        return `${baseClass} ${sizeClass}`;
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setNotifications((prev) => prev.filter((notification) => notification.timeleft + 5000 >= Date.now()));
        }, 100);

        if (typeof window !== 'undefined' && 'alt' in window) {
            alt.on('WebView:SendNotification', handleNotification);
        }

        return () => {
            clearInterval(interval);
            if (typeof window !== 'undefined' && 'alt' in window) {
                alt.off('WebView:SendNotification', handleNotification);
            }
        };
    }, []);

    return (
        <>
            {!('alt' in window) && (
                <Button
                    className="w-20 absolute top-10 right-72"
                    btnText="Test notification"
                    onClick={() => {
                        addNotification({
                            MsgType: 'success',
                            Message: `Test notification dsa : ${testState}`,
                        });
                        setTestState((prev) => prev + 1);
                    }}
                />
            )}
            <div className="fixed w-screen top-3 flex flex-col items-center justify-center gap-2 font-bold pointer-events-none">
                {notifications.map((notification, index) => (
                    <div key={index + notification.timeleft} className="w-1/5 relative transition-all flex items-center justify-center">
                        <div
                            className={`absolute translate-y-1 -z-10 transition-all duration-500 ${
                                bgColorMap[notification.MsgType]
                            } ${getClassNames(index, notifications.length)}`}
                        ></div>
                        <div className={`bg-neutral-900 z-20 transition-all duration-500 ${getClassNames(index, notifications.length)}`}>
                            <div className="text-center overflow-hidden text-ellipsis whitespace-nowrap">{notification.Message}</div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Notifications;
