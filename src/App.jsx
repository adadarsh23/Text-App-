import React, { useEffect, useState } from 'react';
import Navbar from './Components/Navbar';
import Tab from './Components/Tab';
import TextArea from './Components/TextArea';
import About from './Components/about';
import Cookies from 'js-cookie';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// Simple confetti animation using CSS
function Confetti() {
  return (
    <div style={confettiStyles.container}>
      {[...Array(30)].map((_, i) => (
        <div key={i} style={{
          ...confettiStyles.piece,
          left: `${Math.random() * 100}%`,
          background: confettiStyles.colors[i % confettiStyles.colors.length],
          animationDelay: `${Math.random()}s`
        }} />
      ))}
    </div>
  );
}

const confettiStyles = {
  container: {
    position: 'absolute',
    top: 0, left: 0, width: '100%', height: '100%',
    pointerEvents: 'none',
    overflow: 'hidden',
    zIndex: 10000,
  },
  piece: {
    position: 'absolute',
    width: 10, height: 20,
    borderRadius: 3,
    opacity: 0.7,
    animation: 'confetti-fall 1s linear forwards',
  },
  colors: ['#f44336', '#4caf50', '#2196f3', '#ffeb3b', '#ff9800', '#9c27b0']
};

// Add confetti keyframes to the page
const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes confetti-fall {
  0% { transform: translateY(-40px) rotate(0deg);}
  100% { transform: translateY(350px) rotate(360deg);}
}
`;
document.head.appendChild(styleSheet);

// Cookie Consent Card Component
function CookieConsent({ onAccept, onReject, showConfetti }) {
  return (
    <div style={styles.overlay}>
      <div style={styles.card}>
        {showConfetti && <Confetti />}
        <h3 style={{marginTop: 0}}>🍪 Cookie Preferences</h3>
        <p>
          We use cookies to enhance your experience, analyze site usage, and assist in our marketing efforts.
          You can accept or reject all cookies.
        </p>
        <div style={styles.buttonRow}>
          <button style={styles.acceptBtn} onClick={onAccept}>Accept All</button>
          <button style={styles.rejectBtn} onClick={onReject}>Reject All</button>
        </div>
      </div>
    </div>
  );
}

function App() {
  const location = useLocation();
  const [showConsent, setShowConsent] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (!Cookies.get('cookieConsent')) {
      setShowConsent(true);
    } else {
      setShowConsent(false);
    }
  }, []);

  useEffect(() => {
    if (Cookies.get('cookieConsent') === 'accepted') {
      Cookies.set('lastVisited', location.pathname, { expires: 7 });
      if (!Cookies.get('visited')) {
        Cookies.set('visited', 'true', { expires: 7 });
      }
    }
  }, [location]);

  const handleAccept = () => {
    Cookies.set('cookieConsent', 'accepted', { expires: 365 });
    setShowConfetti(true);
    Cookies.set('lastVisited', location.pathname, { expires: 7 });
    Cookies.set('visited', 'true', { expires: 7 });
    setTimeout(() => {
      setShowConfetti(false);
      setShowConsent(false);
    }, 1200); // Show confetti for 1.2s
  };

  const handleReject = () => {
    Cookies.set('cookieConsent', 'rejected', { expires: 365 });
    setShowConsent(false);
    Cookies.remove('lastVisited');
    Cookies.remove('visited');
  };

  return (
    <>
      <Navbar title="TEXT" home="Tools" tool="About" />
      <Tab />
      <Routes>
        <Route path="/" element={<TextArea />} />
        <Route path="/about" element={<About />} />
      </Routes>
      {showConsent && (
        <CookieConsent onAccept={handleAccept} onReject={handleReject} showConfetti={showConfetti} />
      )}
    </>
  );
}

// Responsive and centered styles
const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0,
    width: '100vw', height: '100vh',
    background: 'rgba(0,0,0,0.25)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    padding: 0,
  },
  card: {
    position: 'relative',
    background: '#fff',
    borderRadius: '18px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
    padding: '32px 24px',
    maxWidth: '95vw',
    width: '370px',
    textAlign: 'center',
    margin: '0 8px',
    animation: 'popup-in 0.4s cubic-bezier(.68,-0.55,.27,1.55)'
  },
  buttonRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '18px',
    marginTop: '28px'
  },
  acceptBtn: {
    background: 'linear-gradient(90deg,#4caf50,#43e97b)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 28px',
    fontWeight: 'bold',
    fontSize: '1rem',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(76,175,80,0.12)',
    transition: 'transform 0.1s',
  },
  rejectBtn: {
    background: 'linear-gradient(90deg,#f44336,#ff8a65)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 28px',
    fontWeight: 'bold',
    fontSize: '1rem',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(244,67,54,0.12)',
    transition: 'transform 0.1s',
  }
};

// Add popup animation keyframes
const popupStyle = document.createElement("style");
popupStyle.innerText = `
@keyframes popup-in {
  0% { transform: scale(0.7); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
`;
document.head.appendChild(popupStyle);

// Wrap App in BrowserRouter to use `useLocation`
export default function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}