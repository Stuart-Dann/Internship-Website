import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/landingPage';
import SearchPage from './pages/searchPage';
import AdminPage from './pages/adminPage';
import { AuthProvider } from './contexts/authContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/blog" element={<LandingPage />} />
          <Route path="/faq" element={<LandingPage />} />
          <Route path="/internships" element={<SearchPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
