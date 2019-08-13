import fcmClient from './index';
// Optional flow type

export default async (message) => {
    // handle your message
    console.log("messagte noti backgroun: ", message);
    fcmClient.processMessageData(message);
    return Promise.resolve();
};