import Navbar from '../components/navbar';
import Footer from '../components/footer';
import './searchPage.css';

export default function searchPage() {
    return (
        <div className='search-page'>
            <Navbar />
            <div id='search-intro'>
                <h1>Find your dream internship.</h1>
                <h2>Search from thousands of real internships, updated daily.</h2>
            </div>
            <Footer />
        </div>
    )
};