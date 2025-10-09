import './CategoryStats.css';

export default function CategoryStats() {
    return (
        <div className="category-stats">
            <h2>Internships per Subject</h2>
            <ul>
                <li><span>20</span> Computer Science</li>
                <li><span>30</span> Business</li>
                <li><span>10</span> Engineering</li>
                <li><span>5</span> Design</li>
                <li><span>10</span> Marketing</li>
            </ul>
        </div>
    );
}
