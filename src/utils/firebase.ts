// import * as firebase from 'firebase';
import { KEYS } from "../configs/keys";

const firebaseConfig = {
  apiKey: KEYS.firebase.configs.apiKey,
  authDomain: KEYS.firebase.configs.authDomain,
  databaseURL: KEYS.firebase.configs.databaseURL,
  projectId: KEYS.firebase.configs.projectId,
  storageBucket: KEYS.firebase.configs.storageBucket,
  messagingSenderId: KEYS.firebase.configs.messagingSenderId,
  appId: KEYS.firebase.configs.appId,
};

export async function init() {
  // Your web app's Firebase configuration
  // Initialize Firebase
  // firebase.initializeApp(firebaseConfig);
}