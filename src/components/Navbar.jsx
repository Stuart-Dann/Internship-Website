import { useState, useCallback,  } from "react";
import { Description, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { signInWithEmailAndPassword, signOut as firebaseSignOut } from "firebase/auth";
import { auth } from "../services/firebase";
import { useAuth } from "../contexts/useAuth";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import logo from '../assets/logo.svg';
import './Navbar.css';
import LoginDialog from './loginDialog';

export default function Navbar() {
    const [open, setOpen] = useState(false); // burger menu
    let [isOpen, setIsOpen] = useState(false);
    
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
                <LoginDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
            </nav>
        </div>
    </>
    );
}
