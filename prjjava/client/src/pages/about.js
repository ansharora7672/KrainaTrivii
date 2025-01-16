import {Navbar} from "../components/navbar.js";
import backgroundImage from '../assets/homebackground.jpg';
import mainImage from '../assets/personimg.png';
export const About = () => {
    return (
        <div className="home" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <Navbar/>
        <div className="main-content">
            <h2 className="tagline">What is this?!</h2>
            <p className="subtext">"Kraina Trivii" is a trivia app that blends learning with fun, offering quizzes in categories like sports, history, and pop culture. It features real-time feedback,and hints for a competitive edge, making knowledge testing engaging and enjoyable.</p>
        </div>

        <div className="main-image">
            <img src={mainImage} alt="this guy is gangster" />
        </div>
    </div>);
};