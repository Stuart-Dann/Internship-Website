import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Footer.css';
import MailingDialog from './MailingDialog';

export default function Footer() {
    let [isOpen, setIsOpen] = useState(false);
    return (
        <div className="footer">
            <div className='footer-links'>
                <div id='contact-links'>
                    <p>Contact Us:</p>
                    <a href='mailto:StemSearcher.inquiries@gmail.com'>StemSearcher.inquiries@gmail.com</a>
                </div>
                <p><Link to="/cookie-policy">Cookie Policy</Link></p>
            </div>
            <div>
                <button id='mailing-dialog-button' onClick={() => setIsOpen(true)}>Subscribe to our mailing list!</button>
            </div>
            <MailingDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </div>
    );
}