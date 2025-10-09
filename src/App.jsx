import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage';
import SearchPage from './pages/SearchPage';
import AdminPage from './pages/AdminPage';
import { AuthProvider } from './contexts/authContext';
import CookieConsentBanner from './components/CookieConsentBanner';
import CookiePage from './pages/CookiePage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <CookieConsentBanner />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/blog" element={<LandingPage />} />
          <Route path="/faq" element={<LandingPage />} />
          <Route path="/internships" element={<SearchPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/cookie-policy" element={<CookiePage />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
