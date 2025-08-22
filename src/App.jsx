import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/landingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/blog" element={<LandingPage />} />
        <Route path="/faq" element={<LandingPage />} />
        <Route path="/internships" element={<LandingPage />} />
      </Routes>
    </Router>
  )
}

export default App
