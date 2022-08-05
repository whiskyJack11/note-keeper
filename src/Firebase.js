// Import the functions you need from the SDKs you need


const { initializeApp } = require("firebase/app");
const { getDatabase, set, ref, push } = require("firebase/database");
 // TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDm2Gy_i2MKZsKsQmgIGR1tG36-BX77nxw",
  authDomain: "note-keeper-96ae8.firebaseapp.com",
  databaseURL: "https://note-keeper-96ae8-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "note-keeper-96ae8",
  storageBucket: "note-keeper-96ae8.appspot.com",
  messagingSenderId: "426638244261",
  appId: "1:426638244261:web:cdc8be3b342646ff0e504c",
  measurementId: "G-W8FC7ND608"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
// const notesListRef = ref(database, 'notes');
// const newNoteRef = push(notesListRef);

// set(newNoteRef, {
//   title: "BEST 24 SONGS",
//   tagline: "BEST @$ SONGS OF THE YEAR",
//   note: "okewppekwmpeovpwweldowdlodcledseodlsem,dkseodl",
//   isPinned: true
// });

// set(ref(database, 'notes/'), {
//     title: "BEST 24 SONGSSSSSSSSSSSS",
//     tagline: "BEST @$ SONGS OF THE YEAR",
//     note: "okewppekwmpeovpwweldowdlodcledseodlsem,dkseodl",
//     isPinned: true
// })



export  { database };