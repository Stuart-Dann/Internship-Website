import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from '../contexts/useAuth';
import './AdminPage.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { addInternship } from '../services/firestore';

export default function AdminPage() {
    const [isAdmin, setIsAdmin] = useState(false);
    const { user } = useAuth();

    const notify = (msg, type) => {
        toast(msg, { type });
    };

    const addInternshipHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const internshipData = {
            program: formData.get("program"),
            company: formData.get("company"),
            subject: formData.getAll("subject").join('/'),
            href: formData.get("href"),
            location: formData.get("location"),
            openDate: new Date(formData.get("openDate")),
            closingDate: new Date(formData.get("closingDate")),
            pay: formData.get("pay"),
        };

        try {
            await addInternship(internshipData);
            notify("Internship added successfully!", 'success');
            e.target.reset(); // Reset form after success
        } catch (error) {
            notify("Failed to add internship. Please try again.", "error");
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

    const handleAllStemChange = (e) => {
        const subjectSelect = document.getElementById('subject');
        if (e.target.checked) {
            for (let option of subjectSelect.options) {
                option.selected = true;
            }
            notify("All STEM subjects selected", 'info');
        } else {
            
            for (let option of subjectSelect.options) {
                option.selected = false;
            }
        }
    };

    return (
        <div>
            <Navbar />
            {isAdmin ? (
                <div className='admin-page'>
                <h1 className='admin-title'>Welcome to the Admin Page</h1>
                <form className='admin-form' onSubmit={addInternshipHandler}>
                    <label htmlFor='program'>Program:</label>
                    <input id='program' type="text" name="program" autoComplete='off'/>
                    <label htmlFor='company'>Company:</label>
                    <input id='company' type="text" name="company" autoComplete='off'/>
                    <div id='all-stem-button'>
                        <label htmlFor='allStem'>All STEM:</label>
                        <input id='allStem' type="checkbox" name="allStem" onChange={handleAllStemChange}/>
                    </div>
                    <label htmlFor='subject'>Subject:</label>
                    <select id='subject' name="subject" multiple>
                        <option value="physics">Physics</option>
                        <option value="mathematics">Mathematics</option>
                        <option value="chemistry">Chemistry</option>
                        <option value="biology">Biology</option>
                        <option value="computer_science">Computer Science</option>
                        <option value="engineering">Engineering</option>
                        <option value="biotech">Biotech</option>
                        <option value="data_science">Data Science</option>
                    </select>
                    <label htmlFor='location'>Location:</label>
                    <input id='location' type="text" name="location" autoComplete='off'/>
                    <label htmlFor='href'>Link:</label>
                    <input id='href' type="text" name="href" autoComplete='off'/>
                    <label htmlFor='openDate'>Open Date:</label>
                    <input id='openDate' type="date" name="openDate" />
                    <label htmlFor='closingDate'>Closing Date:</label>
                    <input id='closingDate' type="date" name="closingDate" />
                    <label htmlFor='pay'>Pay (optional):</label>
                    <input id='pay' type="text" name="pay" autoComplete='off'/>
                    <button type="submit">Add</button>
                </form>
                <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
                </div>
            ) : (
                <p>You do not have permission to view this page.</p>
            )}
            <Footer />
        </div>
    );
}