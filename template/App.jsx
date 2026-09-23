"use client";

import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import FoodIntro from "./components/ui/food-intro";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import "./App.css";

const DEFAULT_DURATION = 3.6;

export default function App() {
  const [loading, setLoading] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      return sessionStorage.getItem("agromill:hasSeenIntro") !== "true";
    } catch {
      return false;
    }
  });

  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (!loading) return;

    const fadeTimer = setTimeout(() => setFadeOut(true), DEFAULT_DURATION - 600);
    const endTimer = setTimeout(() => {
      setLoading(false);
      try {
        sessionStorage.setItem("agromill:hasSeenIntro", "true");
      } catch {
        // ignore storage issues
      }
    }, DEFAULT_DURATION);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(endTimer);
    };
  }, [loading]);

  if (loading) {
    return (
      <div
        className={`loading-screen ${fadeOut ? "loading-screen--fadeout" : ""}`}
        aria-live="polite"
      >
        <FoodIntro duration={DEFAULT_DURATION} showReplay={false} />
        <div className="loading-hint">
          <span className="loading-dot" />
          <span>Préparation de votre expérience…</span>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/book-a-table" element={<Navigate to="/contact" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}