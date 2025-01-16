import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import {Home} from "./pages/home.js";
import {Auth} from "./pages/auth.js";
import { Categories } from "./pages/categories.js";
import { Leaderboard } from "./pages/leaderboard.js";
import { Aiquiz } from "./pages/aiquiz.js";
import { About } from "./pages/about.js";
import { Firstpage } from "./pages/firstpage.js";
import { Quiz } from "./pages/quiz.js";
import { CategoryQuiz } from "./pages/CategoryQuiz.js";


function App() {
  return (
    <div className="App">
      <Router>
        
        
        <Routes>
        <Route path="/home" element={<Home />} />
        <Route path = "/" element = {<Firstpage/>} />
        <Route path="/auth" element={<Auth />} />
        
        <Route path="/categories" element={<Categories />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/aiquiz" element={<Aiquiz />} />
        <Route path="/about" element={<About />} />

        <Route path="/quiz/:category" element={<Quiz />} />
        <Route path="/categoryquiz/:category" element={<CategoryQuiz />} />

        </Routes>
        


    </Router>
    </div>
  );
}

export default App;
