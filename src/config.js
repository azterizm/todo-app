import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyCjR-t6c9DCM8d48Ec3dgkQcTgtmfF9xWI',
  authDomain: 'todo-app-cecd7.firebaseapp.com',
  databaseURL: 'https://todo-app-cecd7.firebaseio.com',
  projectId: 'todo-app-cecd7',
  storageBucket: 'todo-app-cecd7.appspot.com',
  messagingSenderId: '469020240518',
  appId: '1:469020240518:web:67f892bf43709360797f07',
  measurementId: 'G-3Z39KXLJ8G',
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
