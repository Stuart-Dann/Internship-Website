import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/landingPage';
import SearchPage from './pages/searchPage';
import AdminPage from './pages/adminPage';
import { AuthProvider } from './contexts/authContext';
import CookieConsentBanner from './components/cookieConsentBanner';
import CookiePage from './pages/cookiePage';

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
