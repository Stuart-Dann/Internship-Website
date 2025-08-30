import Navbar from '../components/navbar';
import Footer from '../components/footer';
import './searchPage.css';

export default function searchPage() {
    return (
        <div className='search-page'>
            <Navbar />
            <div id='search-page-body'>
                <div id='filter-body'>
                    <p className='filter-name'>Country</p>
                    <div className='filters'>
                        <div className='filter'>
                            <div className='filter-details'>
                                <input type="checkbox" id="usa" name="usa" value="USA" />
                                <label htmlFor="usa">USA</label>
                            </div>
                            <p className='filter-stats'>20</p>
                        </div>
                        <div className='filter'>
                            <div className='filter-details'>
                                <input type="checkbox" id="uk" name="uk" value="UK" />
                                <label htmlFor="uk">UK</label>
                            </div>
                            <p className='filter-stats'>8</p>
                        </div>
                    </div>
                    <p className='filter-name'>Subject</p>
                    <div className='filters'>
                        <div className='filter'>
                            <div className='filter-details'>
                                <input type="checkbox" id="physics" name="physics" value="Physics" />
                                <label htmlFor="physics">Physics</label>
                            </div>
                            <p className='filter-stats'>20</p>
                        </div>
                        <div className='filter'>
                            <div className='filter-details'>
                                <input type="checkbox" id="chemistry" name="chemistry" value="Chemistry" />
                                <label htmlFor="chemistry">Chemistry</label>
                            </div>
                            <p className='filter-stats'>8</p>
                        </div>
                    </div>
                </div>
                <div id='search-results'>
                    <div id='search-body'>
                        <div className='search-field'>
                            <p>Search:</p>
                            <input type="text" id="search-input" name="search" placeholder='Search Program Names e.g. Analyst...' />
                        </div>
                        <div className='search-field'>
                            <p>Filter By Status:</p>
                            <select name="status" id="status-select">
                                <option value="all">Any Status</option>
                                <option value="true">Applied</option>
                                <option value="false">No Applied</option>
                            </select>
                        </div>
                        <div id='open-program'>
                            <input type='checkbox' id='open-programs' name='open-programs' value='Show Only Open Programs'/>
                            <label htmlFor='open-programs'>Show Only Open Programs</label>
                        </div>
                    </div>
                        <div id='results-container'>
                            <div id='result-header'>
                                <p className='result-header-item' id='status'>Status</p>
                                <p className='result-header-item' id='program-name'>Program Name</p>
                                <p className='result-header-item' id='company-name'>Company Name</p>
                                <p className='result-header-item' id='location'>Location</p>
                                <p className='result-header-item' id='subject'>Subject</p>
                                <p className='result-header-item' id='closing-date'>Closing Date</p>
                            </div>
                            <div id='results'>
                                <div className='result'>
                                    <p className='result-item' id='status'>Applied</p>
                                    <p className='result-item' id='program-name'>Business Analyst Intern</p>
                                    <p className='result-item' id='company-name'>Goldman Sachs</p>
                                    <p className='result-item' id='location'>USA</p>
                                    <p className='result-item' id='subject'>Business</p>
                                    <p className='result-item' id='closing-date'>30th June 2024</p>
                                </div>
                                <div className='result'>
                                    <p className='result-item' id='status'>Applied</p>
                                    <p className='result-item' id='program-name'>Business Analyst Intern</p>
                                    <p className='result-item' id='company-name'>Goldman Sachs</p>
                                    <p className='result-item' id='location'>USA</p>
                                    <p className='result-item' id='subject'>Business</p>
                                    <p className='result-item' id='closing-date'>30th June 2024</p>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}