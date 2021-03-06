export declare type WAConnectionState = 'open' | 'connecting' | 'close';
export declare type ConnectionState = {
    /** connection is now open, connecting or closed */
    connection: WAConnectionState;
    /** the error that caused the connection to close */
    lastDisconnect?: {
        error: Error;
        date: Date;
    };
    /** is this a new login */
    isNewLogin?: boolean;
    /** the current QR code */
    qr?: string;
    /** has the device received all pending notifications while it was offline */
    receivedPendingNotifications?: boolean;
};
