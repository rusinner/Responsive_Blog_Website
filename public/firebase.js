const firebaseConfig = {
    apiKey: "AIzaSyAD6uBiUiAQ8F7GXBjsOYFpLCH-1sTtBH4",
    authDomain: "blogging-project-d56c6.firebaseapp.com",
    projectId: "blogging-project-d56c6",
    storageBucket: "blogging-project-d56c6.appspot.com",
    messagingSenderId: "162818225689",
    appId: "1:162818225689:web:e4f2ac95149581d52b9c88"
  };

firebase.initializeApp(firebaseConfig);

  let db = firebase.firestore();