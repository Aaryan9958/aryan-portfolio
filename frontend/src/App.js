import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navigation from "./components/Navigation";
import { Toaster } from "./components/ui/toaster";
import Home from "./pages/Home";
import Experience from "./pages/Experience";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Preloader from "./components/Preloader";
import { SITE_CONFIG } from "./config/siteConfig";

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  // Check if this is first visit in this session
  const [hasShownPreloader] = useState(() => {
    const shown = sessionStorage.getItem('preloaderShown');
    return shown === 'true';
  });
  
  const shouldShowPreloader = SITE_CONFIG.ENABLE_PRELOADER && !hasShownPreloader;
  const [showPreloader, setShowPreloader] = useState(shouldShowPreloader);
  const [appReady, setAppReady] = useState(!shouldShowPreloader);

  const handlePreloaderComplete = () => {
    sessionStorage.setItem('preloaderShown', 'true');
    setShowPreloader(false);
    setAppReady(true);
  };

  // If preloader is disabled or already shown, app is immediately ready
  useEffect(() => {
    if (!shouldShowPreloader) {
      setAppReady(true);
    }
  }, [shouldShowPreloader]);

  return (
    <div className="App">
      {/* Preloader - only renders on first visit in session */}
      {showPreloader && (
        <Preloader onComplete={handlePreloaderComplete} />
      )}
      
      {/* Main app content */}
      {appReady && (
        <BrowserRouter>
          <Navigation />
          <AnimatedRoutes />
          <Toaster />
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
