import Navbar from '../components/Navbar'
import Footer from '../components/Footer';
import './LandingPage.css';
import CategoryStats from '../components/CategoryStats';
import { Link } from 'react-router-dom';
import RotatingText from '../components/RotatingText';
import AnimatedContent from '../components/AnimatedContent';
import useIsMobile from '../hooks/isMobile';    

export default function LandingPage() {
    const isMobile = useIsMobile();

    return (
    <div className='landing-page'>
        <Navbar />
        <div id='intro'>
            <AnimatedContent>
            <h1>Actual internships, in the field you love.</h1>
            <h2>We find them all, so you don't have to.</h2>
            {isMobile ? <p></p> : 
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
            }
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