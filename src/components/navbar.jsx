import LoginDialog from "./loginDialog";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from '../assets/logo.png';
import './navbar.css';

export default function Navbar() {
    const [open, setOpen] = useState(false); // burger menu
    const isAdmin = false;
    
    return (
    <>
        <div className="navbar">
            <LoginDialog />
            <nav>
                <Link to="/"><img src={logo} width={175} height={85} alt="Logo" className="logo" /></Link>
                <div className={`burger ${open ? 'open' : ''}`} onClick={() => setOpen(!open)}>
                <span />
                <span />
                <span />
                </div>
                <ul className={open ? 'open' : ''}>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/internships">Internships</Link></li>
                {isAdmin && <li><Link to="/admin">Admin</Link></li>}
                </ul>
            </nav>
        </div>
    </>
    );
}
