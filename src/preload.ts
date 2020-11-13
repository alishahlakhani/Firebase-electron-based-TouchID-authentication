// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
import { KEYS } from "./configs/keys"
const { ipcRenderer,systemPreferences,contextBridge } = require('electron')

const {START_NOTIFICATION_SERVICE,NOTIFICATION_SERVICE_STARTED,NOTIFICATION_SERVICE_ERROR,NOTIFICATION_RECEIVED,TOKEN_UPDATED} = require('electron-push-receiver/src/constants')

window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector: string, text: string) => {
    const element = document.getElementById(selector);
    if (element) {
      element.innerText = text;
    }
  };

  for (const type of ["chrome", "node", "electron"]) {
    replaceText(`${type}-version`, (process.versions as any)[type]);
  }
});

// Listen for service successfully started
ipcRenderer.on(NOTIFICATION_SERVICE_STARTED, (_, token) => {
  console.log(`service successfully started: token: ${token}`)
})

// Handle notification errors
ipcRenderer.on(NOTIFICATION_SERVICE_ERROR, (_, error) => {
  console.log(`notification error: error: ${error}`)
})

// Send FCM token to backend
ipcRenderer.on(TOKEN_UPDATED, (_, token) => {
  console.log(`token updated: token: ${token}`)
})

// Display notification
ipcRenderer.on(NOTIFICATION_RECEIVED, (_: any, serverNotificationPayload: any) => {
  // check to see if payload contains a body string, if it doesn't consider it a silent push
  if (serverNotificationPayload.notification.body) {
    // payload has a body, so show it to the user
    console.log(`display notification: serverNotificationPayload:  ${JSON.stringify(serverNotificationPayload, null, 2)}`)
    let myNotification = new Notification(serverNotificationPayload.notification.title, {
      body: serverNotificationPayload.notification.body
    })

    myNotification.onclick = () => {
      console.log('Notification clicked')
      ipcRenderer.send('Inform')

    }
  } else {
    // payload has no body, so consider it silent (and just consider the data portion)
    console.log(`do something with the key/value pairs in the data: serverNotificationPayload.data: ${JSON.stringify(serverNotificationPayload.data, null, 2)}`)
  }
})

// Start service
const senderId = KEYS.firebase.messaging.senderId // <-- replace with FCM sender ID from FCM web admin under Settings->Cloud Messaging
console.log('starting service and registering a client')
ipcRenderer.send(START_NOTIFICATION_SERVICE, senderId)
