import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp();
const fcm = admin.messaging();

export const sendNotification = functions.firestore
  .document("notiTokens/{token}")
  .onCreate(async snapshot => {
    const name = snapshot.get("from");
    const payload: admin.messaging.MessagingPayload = {
      notification: {
        title: `New message from ${name}`,
        body: snapshot.get("message"),
        clickAction: "FLUTTER_NOTIFICATION_CLICK"
      }
    };

    const token: string = snapshot.get("token");

    return fcm.sendToDevice(token, payload);
  });
