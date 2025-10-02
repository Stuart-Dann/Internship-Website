import LoginDialog from "./loginDialog";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from '../assets/logo.svg';
import './navbar.css';

export default function Navbar() {
    const [open, setOpen] = useState(false); // burger menu
    
    return (
    <>
        <div className="navbar">
            <LoginDialog />
            <nav>
                <Link to="/"><img src={logo} alt="STEM Searcher Logo" className="logo" /></Link>
                <div className={`burger ${open ? 'open' : ''}`} onClick={() => setOpen(!open)}>
                <span />
                <span />
                <span />
                </div>
                <ul className={open ? 'open' : ''}>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/internships">Internships</Link></li>
                </ul>
            </nav>
        </div>
    </>
    );
}
