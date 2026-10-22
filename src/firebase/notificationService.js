import {
  getToken,
  onMessage,
} from "firebase/messaging";

import { getFirebaseMessaging } from "./firebase";

export async function requestFcmToken() {
  if (!("Notification" in window)) {
    throw new Error("Browser notifications are not supported");
  }

  if (!("serviceWorker" in navigator)) {
    throw new Error("Service workers are not supported");
  }

  const messaging = await getFirebaseMessaging();

  if (!messaging) {
    throw new Error("Firebase Messaging is not supported");
  }

  const permission = await Notification.requestPermission();

  if (permission !== "granted") {
    return null;
  }

  const registration = await navigator.serviceWorker.register(
    "/firebase-messaging-sw.js"
  );

  const token = await getToken(messaging, {
    vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
    serviceWorkerRegistration: registration,
  });

  return token || null;
}


export async function subscribeToForegroundMessages(callback) {
  const messaging = await getFirebaseMessaging();

  if (!messaging) {
    return () => {};
  }

  return onMessage(messaging, (payload) => {
    callback(payload);
  });
}