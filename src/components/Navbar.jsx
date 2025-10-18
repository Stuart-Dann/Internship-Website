import { useState  } from "react";
import { Link } from "react-router-dom";
import logo from '../assets/logo.svg';
import './Navbar.css';
import LoginDialog from './LoginDialog';

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
