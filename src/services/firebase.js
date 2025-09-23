// Import the functions you need from the SDKs you need
import { getFunctions } from "firebase/functions";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

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
const db = getFirestore(app);
const functions = getFunctions(app);

if (import.meta.env.MODE === "development") {
	self.FIREBASE_APPCHECK_DEBUG_TOKEN = import.meta.env.VITE_APP_CHECK_DEBUG_TOKEN_FROM_CI;
}

const Appcheck = initializeAppCheck(app, {
	provider: new ReCaptchaV3Provider(import.meta.env.VITE_RECAPTCHA_SITE_KEY),
	isTokenAutoRefreshEnabled: true,
});
export { auth, db, functions };
