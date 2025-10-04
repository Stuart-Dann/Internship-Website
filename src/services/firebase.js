// Import the functions you need from the SDKs you need
import { getFunctions } from "firebase/functions";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
	measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);

if (import.meta.env.MODE === "development") {
	self.FIREBASE_APPCHECK_DEBUG_TOKEN = import.meta.env.VITE_APP_CHECK_DEBUG_TOKEN_FROM_CI;
}

export const initializeAppCheckWithConsent = () => {
	const cookieConsent = getCookie("cookieConsent");

	if (cookieConsent === "accepted") {
		// Initialize App Check only if cookies are accepted
		if (import.meta.env.MODE === "development") {
			self.FIREBASE_APPCHECK_DEBUG_TOKEN = import.meta.env.VITE_APP_CHECK_DEBUG_TOKEN_FROM_CI;
		}

		initializeAppCheck(app, {
			provider: new ReCaptchaV3Provider(import.meta.env.VITE_RECAPTCHA_SITE_KEY),
			isTokenAutoRefreshEnabled: true,
		});
		console.log("App Check initialized with ReCAPTCHA v3.");
	} else {
		console.warn("App Check not initialized due to lack of valid cookie consent.");
	}
};

const getCookie = (name) => {
	const cookies = document.cookie.split("; ");
	const cookie = cookies.find((row) => row.startsWith(`${name}=`));
	return cookie ? cookie.split("=")[1] : null;
};

// Initialize App Check on page load
initializeAppCheckWithConsent();

export { auth, db, functions };
