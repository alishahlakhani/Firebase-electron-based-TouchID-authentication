# BioPass

Electron based Mac TouchID authentication app to allow developers to send push verification requests directly to mac using Firebase Cloud Messaging

# How does it work?

1. Clone the code
   1a. Run `npm install` to install all packages... duh!
   1b. Replace all Firebase keys and Firebase cloud messaging keys. Just create a new issue on Github if you can't figure out how to.
2. Run using `npm run start`
3. Open console and you'll see a token generated
4. Copy that to Firebase Cloud Messaging portal and create a test notification
5. Once that is generated your electron menu app will request for Touch ID
6. Once you sign it with TouchID, feel free to do whatever you want... you can create custom logic here... :D
