import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp();
const fcm = admin.messaging();

export const sendNotification = functions.firestore
  .document("messages/{docId}")
  .onCreate(async snapshot => {
    const payload: admin.messaging.MessagingPayload = {
      notification: {
        title: snapshot.get("sender_name"),
        body: snapshot.get("message"),
        clickAction: "FLUTTER_NOTIFICATION_CLICK"
      }
    };

    return fcm.sendToTopic("messages", payload);
  });
