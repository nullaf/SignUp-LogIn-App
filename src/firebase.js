import firebase from "firebase";
import "@firebase/auth";

const app = firebase.initializeApp({
    apiKey: "AIzaSyDYLBtvzQpf4IQAIJLdEZMBfQWmCbUoIPI",
    authDomain: "test-857df.firebaseapp.com",
    databaseURL: "https://test-857df.firebaseio.com",
    projectId: "test-857df",
    storageBucket: "test-857df.appspot.com",
    messagingSenderId: "850374636973",
    appId: "1:850374636973:web:c8a9a4037c68f4a455dd24",
    measurementId: "G-NW3WQ1KZ0W"
});

export default app;