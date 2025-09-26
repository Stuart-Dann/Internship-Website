import { Link } from 'react-router-dom';
import './footer.css';
// import lancaster from '../assets/lancasterUniLogo.png';
// import ukaea from '../assets/ukaea.png'

export default function Footer() {
    return (
        <div className="footer">
            <div id='contact-links'>
                <p>Contact Us:</p>
                <a href='mailto:StemSearcher.inquiries@gmail.com'>StemSearcher.inquiries@gmail.com</a>
            </div>
            <p><Link to="/cookie-policy">Cookie Policy</Link></p>
        </div>
    );
}