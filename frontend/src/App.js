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
  const [showPreloader, setShowPreloader] = useState(SITE_CONFIG.ENABLE_PRELOADER);
  const [appReady, setAppReady] = useState(!SITE_CONFIG.ENABLE_PRELOADER);

  const handlePreloaderComplete = () => {
    setShowPreloader(false);
    setAppReady(true);
  };

  // If preloader is disabled, app is immediately ready
  useEffect(() => {
    if (!SITE_CONFIG.ENABLE_PRELOADER) {
      setAppReady(true);
    }
  }, []);

  return (
    <div className="App">
      {/* Preloader - only renders if enabled */}
      {SITE_CONFIG.ENABLE_PRELOADER && showPreloader && (
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
