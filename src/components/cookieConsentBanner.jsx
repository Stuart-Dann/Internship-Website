import { useState, useEffect } from "react";
import { initializeAppCheckWithConsent } from "../services/firebase"; 
import "./cookieConsentBanner.css";
import { Link } from 'react-router-dom';

export default function CookieConsentBanner() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        
        const cookieConsent = getCookie("cookieConsent");

        if (!cookieConsent) {
            setIsVisible(true); 
        }
    }, []);

    const handleAccept = () => {
        const now = new Date().getTime();
        setCookie("cookieConsent", "accepted", 7); 
        setIsVisible(false); 
        initializeAppCheckWithConsent(); 
    };

    const handleDecline = () => {
        const now = new Date().getTime();
        setCookie("cookieConsent", "declined", 7); 
        setIsVisible(false); 
        initializeAppCheckWithConsent(); 
    };

    if (!isVisible) {
        return null; 
    }

    return (
        <div className="cookie-banner">
            <p>
                We use cookies to improve your experience. By continuing, you agree to our use of cookies. You can
                choose to accept or decline. Click here to read our <Link to="/cookie-policy" target="_blank" rel="noopener noreferrer">Cookie Policy</Link>.
            </p>
            <div className="cookie-banner-buttons">
                <button onClick={handleAccept} className="accept-button">
                    Accept
                </button>
                <button onClick={handleDecline} className="decline-button">
                    Decline
                </button>
            </div>
        </div>
    );
}


const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); 
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/;SameSite=Strict`;
};

const getCookie = (name) => {
    const cookies = document.cookie.split("; ");
    const cookie = cookies.find((row) => row.startsWith(`${name}=`));
    return cookie ? cookie.split("=")[1] : null;
};