import Navbar from '../components/navbar'
import Footer from '../components/footer';
import './landingPage.css';
import rightArrow from '../assets/rightArrow.svg';
import CategoryStats from '../components/categoryStats';
import { Link } from 'react-router-dom';

export default function LandingPage() {
    return (
    <div className='landing-page'>
        <Navbar />
        <div id='intro'>
            <h2>We find them all, so you don't have to.</h2>
            <h1>Actual internships, in the field you love.</h1>
            <div id='search-stats'>
                <Link to="/internships"><button id='start-search'>Start Your Search now <img src={rightArrow} width={58} height={48} alt="Right Arow" className="rightArrow" /></button></Link>
                <CategoryStats />
            </div>
        </div>
        <Footer />
    </div>
    )
}