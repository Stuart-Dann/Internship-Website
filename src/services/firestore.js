import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase"; // Ensure `db` is initialized in your `firebase.js`
import { onSnapshot } from "firebase/firestore";
import { getAnalytics, logEvent } from "firebase/analytics";

const analytics = getAnalytics();

// Add an internship
export async function addInternship(internshipData) {
	const { program, company, subject, href, location, closingDate } = internshipData;

	if (!program || !company || !subject || !href || !location || !closingDate) {
		throw new Error("Missing required fields.");
	}

	try {
		const docRef = await addDoc(collection(db, "internships"), {
			program,
			company,
			subject,
			href,
			location,
			closingDate: closingDate,
		});
		logEvent(analytics, "add_internship", { id: docRef.id });
		return { id: docRef.id, message: "Internship added successfully!" };
	} catch (error) {
		logEvent(analytics, "add_internship_error", { error: error.message });
		throw new Error("Failed to add internship.");
	}
}

// Get all internships
export async function getInternships() {
	try {
		const snapshot = await getDocs(collection(db, "internships"));
		const internships = snapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
			closingDate: doc.data().closingDate.toDate().toLocaleDateString("en-GB"), // Format date
		}));
		return internships;
	} catch (error) {
		logEvent(analytics, "get_internships_error", { error: error.message });
		throw new Error("Failed to fetch internships.");
	}
}

export function subscribeToItems(callback) {
	try {
		return onSnapshot(collection(db, "internships"), (snapshot) => {
			let programs = snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));

			// Format closingDate and filter sensitive fields
			programs = programs.map((prog) => ({
				...prog,
				closingDate: prog.closingDate.toDate().toLocaleDateString("en-GB"),
			}));

			callback(programs);
		});
	} catch (error) {
		logEvent(analytics, "subscribe_to_items_error", { error: error.message });
	}
}
