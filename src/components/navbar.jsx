import { Link } from 'react-router-dom';
import './navbar.css';
import logo from '../assets/logo.png';
import { useState } from 'react';

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <div className="navbar">
            <nav>
                <img src={logo} width={175} height={85} alt="Logo" className="logo" /> 
                {/* <ul className='desktop-menu'>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/blog">Blog</Link ></li>
                    <li><Link to="/faq">FAQ</Link ></li>
                    <li><Link to="/internships">Internships</Link ></li>
                </ul> */}
                <div className={`burger ${open ? 'open' : ''}`} onClick={() => setOpen(!open)}>
                    <span />
                    <span />
                    <span />
                </div>
                <ul className={open ? 'open' : ''}>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/blog">Blog</Link ></li>
                    <li><Link to="/faq">FAQ</Link ></li>
                    <li><Link to="/internships">Internships</Link ></li>
                </ul>
            </nav>
        </div>
    );
}