import './cookiePage.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function CookiePage() {
    return (
        <div>
            <Navbar />
            <div className="cookie-page">
                <h1>Cookie Policy</h1>
                <p>
                    This website uses cookies to improve your experience and provide essential functionality. Cookies are small text
                    files stored on your device that help us deliver services and protect your data.
                </p>
                <h2>Types of Cookies We Use</h2>
                <ul>
                    <li>
                    <strong>Essential Cookies:</strong> These cookies are necessary for the website to function properly. For
                    example:
                    <ul>
                        <li>Tracking your choice to accept or decline non-essential cookies.</li>
                    </ul>
                    </li>
                    <li>
                    <strong>Non-Essential Cookies:</strong> These cookies are used to enhance security and improve functionality.
                    For example:
                    <ul>
                        <li>
                        <strong>ReCAPTCHA v3:</strong> Protects our services from abuse and unauthorized access by verifying that
                        requests come from humans and not bots.
                        </li>
                    </ul>
                    </li>
                </ul>
                <h2>Managing Cookies</h2>
                <p>
                    You can manage your cookie preferences using the cookie banner on our site or through your browser settings.
                    Declining non-essential cookies may limit certain features, such as enhanced security provided by ReCAPTCHA v3.
                </p>
                <h2>Contact Us</h2>
                <p>
                    If you have any questions about our cookie policy, please contact us at{" "}
                    <a href="mailto:StemSearcher.inquiries@gmail.com">StemSearcher.inquiries@gmail.com</a>.
                </p>
            </div>
            <Footer />
        </div>
    );
}