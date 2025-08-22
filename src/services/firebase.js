// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: "internship-website-cede9",
	storageBucket: "internship-website-cede9.firebasestorage.app",
	messagingSenderId: "897953965153",
	appId: "1:897953965153:web:26d68ec31a99e7285c7620",
	measurementId: "G-N52SKL06E1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

//Detect auth state
onAuthStateChanged(auth, (user) => {
	if (user) {
		console.log("User is signed in");
	} else {
		console.log("No user is signed in");
	}
});
