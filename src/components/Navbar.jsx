import { useState, useCallback,  } from "react";
import { Description, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { signInWithEmailAndPassword, signOut as firebaseSignOut } from "firebase/auth";
import { auth } from "../services/firebase";
import { useAuth } from "../contexts/useAuth";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import logo from '../assets/logo.svg';
import './Navbar.css';

export default function Navbar() {
    const [open, setOpen] = useState(false); // burger menu
    let [isOpen, setIsOpen] = useState(false);
    let [isAdmin, setIsAdmin] = useState(false)
    const { user } = useAuth();

    const checkAdmin = useCallback(async () => {
        if (user) {
            try {
                const tokenResult = await user.getIdTokenResult();
                if (tokenResult.claims.admin) {
                    setIsAdmin(true);
                }
            } catch (error) {
                console.error('Failed to check admin status:', error);
                setIsAdmin(false);
            }
        }
    }, [user]);
    const signOut = async () => {
        await firebaseSignOut(auth);
        setIsAdmin(false);
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const email = formData.get('email');
        const password = formData.get('password');
        const honeypot = formData.get('honeypot');

        // Check if honeypot field is filled
        if (honeypot) {
            console.warn('Spam detected: Honeypot field was filled.');
            return; // Stop form submission
        }
        
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const tokenResult = await userCredential.user.getIdTokenResult();
            if (tokenResult.claims.admin){
                setIsAdmin(true)
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };
    useEffect(() => {
        if (isOpen) {
            checkAdmin();
        }
    }, [isOpen, checkAdmin]);
    
    return (
    <>
        <div className="navbar">
            <nav>
                <Link to="/" className="logo-link"><img src={logo} alt="STEM Searcher Logo" className="logo" /></Link>
                <div className={`burger ${open ? 'open' : ''}`} onClick={() => setOpen(!open)}>
                <span />
                <span />
                <span />
                </div>
                <ul className={open ? 'open' : ''}>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/internships">Internships</Link></li>
                    <li><button onClick={() => setIsOpen(true)} className='admin-login'>Staff</button></li>
                </ul>
                <Dialog open={isOpen} onClose={() => setIsOpen(false)} className={"dialog-root"}>
                    <div className="dialog-backdrop" aria-hidden="true" />
                    <div className="dialog-container">
                        <DialogPanel>
                            <DialogTitle>Admin Login</DialogTitle>
                            <Description>Login to access admin panel</Description>
                            {isAdmin ? 
                            <>
                                <p>Already logged in click <Link to='/admin'>here</Link> to access the admin screen.</p>
                                <p>or <button onClick={signOut} className="link-button">here</button> to sign out</p>
                            </>
                            :
                            <form onSubmit={handleLogin} className='login-form'>
                                <div className='login-label'>
                                    <label>Email:</label>
                                    <label>Password:</label>
                                </div>
                                <div className='login-input'>
                                    <input type="email" placeholder="Email" name='email' autoComplete='email'/>
                                    <input type="password" placeholder="Password" name='password' autoComplete='current-password'/>
                                </div>
                                {/* Honeypot field */}
                                <input
                                    type="text"
                                    name="honeypot"
                                    style={{ display: 'none' }}
                                    tabIndex={-1}
                                    autoComplete="off"
                                />                        <button type="submit" className='login-button'>Login</button>
                            </form>}
                        </DialogPanel>
                    </div>
                </Dialog>
            </nav>
        </div>
    </>
    );
}
