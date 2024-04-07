// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js');

const firebaseConfig = {
    "apiKey": "AIzaSyCHCMf9Uy2t9F5XFIcSErdiVpgaKt9U3tI",
    "authDomain": "backtrack-8231c.firebaseapp.com",
    "projectId": "backtrack-8231c",
    "storageBucket": "backtrack-8231c.appspot.com",
    "messagingSenderId": "261927245122",
    "appId": "1:261927245122:web:06664f285faf4b82e524db",
    "measurementId": "G-N5Y7J4ESNL"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
// Customize background notification handling here
messaging.onBackgroundMessage((payload) => {
    console.log('Background Message:', payload);
    alert(payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
});