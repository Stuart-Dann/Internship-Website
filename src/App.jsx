import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/landingPage';
import SearchPage from './pages/searchPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/blog" element={<LandingPage />} />
        <Route path="/faq" element={<LandingPage />} />
        <Route path="/internships" element={<SearchPage />} />
      </Routes>
    </Router>
  )
}

export default App
