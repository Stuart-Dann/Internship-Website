import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'
import { signInWithEmailAndPassword, signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '../services/firebase';
import './loginDialog.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';
import { useEffect } from 'react';
import { useCallback } from 'react';


export default function LoginDialog() {
    let [isOpen, setIsOpen] = useState(false);
    let [isAdmin, setIsAdmin] = useState(false)
    const { user } = useAuth();

    const checkAdmin = useCallback(async () => {
        if (user) {
            const tokenResult = await user.getIdTokenResult();
            if (tokenResult.claims.admin) {
                setIsAdmin(true);
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
        <button onClick={() => setIsOpen(true)} className='admin-login'>Admin Login</button>
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className={"dialog-root"}>
            <div className="dialog-backdrop" aria-hidden="true" />
            <div className="dialog-container">
                <DialogPanel>
                    <DialogTitle>Admin Login</DialogTitle>
                    <Description>Login to access admin panel</Description>
                    {isAdmin ? 
                    <>
                        <p>Already logged in click <Link to='/admin'>here</Link> to access the admin screen.</p>
                        <p>or <a onClick={signOut}>here</a> to sign out</p>
                    </>
                    :
                    <form onSubmit={handleLogin} className='login-form'>
                        <div className='login-label'>
                            <label>Email:</label>
                            <label>Password:</label>
                        </div>
                        <div className='login-input'>
                            <input type="email" placeholder="Email" name='email' />
                            <input type="password" placeholder="Password" name='password' />
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
        </>
    )
}