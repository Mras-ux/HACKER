import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Members from './pages/Members';
import Solutions from './pages/Solutions';
import Resources from './pages/Resources';
import Discussion from './pages/Discussion';
import Contests from './pages/Contests';
import Login from './pages/Login';
import Admin from './pages/Admin';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/members" element={<Members />} />
              <Route path="/solutions" element={<Solutions />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/discussion" element={<Discussion />} />
              <Route path="/contests" element={<Contests />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;