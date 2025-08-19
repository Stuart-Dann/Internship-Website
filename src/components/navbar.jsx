import { Link } from 'react-router-dom';
import './navbar.css';
import logo from '../assets/logo.png';

export default function Navbar() {
    return (
        <div className="navbar">
            <nav>
                <img src={logo} alt="Logo" className="logo" /> 
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/blog">Blog</Link ></li>
                    <li><Link to="/faq">FAQ</Link ></li>
                    <li><Link to="/internships">Internships</Link ></li>
                </ul>
            </nav>
        </div>
    );
}