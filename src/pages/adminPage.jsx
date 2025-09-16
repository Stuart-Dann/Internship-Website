import { useState, useEffect } from "react";
import { useAuth } from '../contexts/useAuth';
import './adminPage.css';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { addInternship } from '../services/firestore';

export default function AdminPage() {
    const [isAdmin, setIsAdmin] = useState(false);
    const { user } = useAuth();

    const addInternshipHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const internshipData = {
            program: formData.get("program"),
            company: formData.get("company"),
            subject: formData.get("subject"),
            href: formData.get("href"),
            location: formData.get("location"),
            closingDate: new Date(formData.get("closingDate")),
        };

        try {
            await addInternship(internshipData);
            alert("Internship added successfully!");
        } catch (error) {
            alert("Failed to add internship. Please try again.");
        }
    };

    useEffect(() => {
        const checkAdminStatus = async () => {
            if (user) {
                const tokenResult = await user.getIdTokenResult();
                setIsAdmin(!!tokenResult.claims.admin);
            } else {
                setIsAdmin(false);
            }
        };

        checkAdminStatus();
    }, [user]);

    return (
        <div>
            <Navbar />
            {isAdmin ? (
                <div className='admin-page'>
                <h1 className='admin-title'>Welcome to the Admin Page</h1>
                <form className='admin-form' onSubmit={addInternshipHandler}>
                    <label>Program:</label>
                    <input type="text" name="program" />
                    <label>Company:</label>
                    <input type="text" name="company" />
                    <label>Subject:</label>
                    <input type="text" name="subject" />
                    <label>Location:</label>
                    <input type="text" name="location" />
                    <label>Link:</label>
                    <input type="text" name="href" />
                    <label>Closing Date:</label>
                    <input type="date" name="closingDate" />
                    <button type="submit">Add</button>
                </form>
                </div>
            ) : (
                <p>You do not have permission to view this page.</p>
            )}
            <Footer />
        </div>
    );
}