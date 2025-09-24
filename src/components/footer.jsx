import './footer.css';
// import lancaster from '../assets/lancasterUniLogo.png';
// import ukaea from '../assets/ukaea.png'

export default function Footer() {
    return (
        <div className="footer">
            <div id='contact-links'>
                <p>Contact Us:</p>
                <a href='mailto:someone@example.com'>Email</a>
            </div>
            {/* <ul> */}
                {/* <li><img src={lancaster} alt='Lancaster University'></img></li>
                <li><img src={ukaea} alt='UK AEA'></img></li> */}
            {/* </ul> */}
        </div>
    );
}