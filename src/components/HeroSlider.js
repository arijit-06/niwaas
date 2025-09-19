// src/components/HeroSlider.js
import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PropTypes from 'prop-types';
import '../styles/HeroSlider.css';

export const HeroSlider = ({ slides, activeIndex, onSlideChange }) => {
  const [internalIndex, setInternalIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const index = activeIndex ?? internalIndex;

  const next = useCallback(() => {
    if (transitioning) return;
    setTransitioning(true);
    const nextIndex = (index + 1) % slides.length;
    if (activeIndex == null) setInternalIndex(nextIndex);
    onSlideChange?.(nextIndex);
    setTimeout(() => setTransitioning(false), 300);
  }, [index, slides.length, transitioning, activeIndex, onSlideChange]);

  const prev = useCallback(() => {
    if (transitioning) return;
    setTransitioning(true);
    const prevIndex = (index - 1 + slides.length) % slides.length;
    if (activeIndex == null) setInternalIndex(prevIndex);
    onSlideChange?.(prevIndex);
    setTimeout(() => setTransitioning(false), 300);
  }, [index, slides.length, transitioning, activeIndex, onSlideChange]);

  useEffect(() => {
    const iv = setInterval(next, 5000);
    return () => clearInterval(iv);
  }, [next]);

  useEffect(() => {
    if (activeIndex != null && activeIndex !== internalIndex) {
      setInternalIndex(activeIndex);
    }
  }, [activeIndex, internalIndex]);

  if (!slides?.length) return null;
  const { name, tagline, imageUrl } = slides[index];

  return (
    <div className="hero-slider">
      <img src={imageUrl} alt={name} className="hero-image" />
      <div className="hero-overlay">
        <h2 className="hero-title">{name.toUpperCase()}</h2>
        <p className="hero-tagline">"{tagline}"</p>
      </div>
      <button className="hero-nav prev" onClick={prev}><ChevronLeft size={32}/></button>
      <button className="hero-nav next" onClick={next}><ChevronRight size={32}/></button>
    </div>
  );
};

HeroSlider.propTypes = {
  slides: PropTypes.array.isRequired,
  activeIndex: PropTypes.number,
  onSlideChange: PropTypes.func,
};