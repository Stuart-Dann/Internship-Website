import Navbar from '../components/Navbar'
import Footer from '../components/Footer';
import './landingPage.css';
import rightArrow from '../assets/rightArrow.svg';
import CategoryStats from '../components/CategoryStats';
import { Link } from 'react-router-dom';
import RotatingText from '../components/RotatingText';
import AnimatedContent from '../components/AnimatedContent';

export default function LandingPage() {
    return (
    <div className='landing-page'>
        <Navbar />
        <div id='intro'>
            <AnimatedContent>
            <h1>Actual internships, in the field you love.</h1>
            <h2>We find them all, so you don't have to.</h2>
            <p id='rotating-text-container'>
                Find internships in{" "}
                <RotatingText id="rotating-text"
                    texts={[
                    "Physics",
                    "Mathematics",
                    "Chemistry",
                    "Biology",
                    "Computer Science",
                    "Engineering",
                    "Biotech",
                    "Data Science",
                    ]}
                    transition={{ type: "spring", damping: 30, stiffness: 400 }}
                    staggerDuration={0.025}
                    rotationInterval={2000}
                    exit={{ y: "-120%" }}
                    staggerFrom="last"
                />
                </p>
            </AnimatedContent>
            <div id='search-stats'>
                <AnimatedContent
                delay={0.2}>
                    <Link to="/internships"><button id='start-search'>Click here to search internships</button></Link>
                </AnimatedContent>
                <AnimatedContent
                delay={0.4}>
                    <CategoryStats />
                </AnimatedContent>
            </div>
        </div>
        <Footer />
    </div>
    )
}