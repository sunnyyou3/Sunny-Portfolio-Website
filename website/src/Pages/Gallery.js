import React from 'react';
import { motion } from 'framer-motion';

// Dynamically discover images in the Portfolio/Images folder so photos can be added without editing code
function importImages() {
  // require.context is supported by webpack (Create React App). It loads files matching the pattern from the images folder.
  const r = require.context('./../assets/Portfolio/Images', false, /\.(png|jpe?g|webp|gif)$/);
  // sort keys to get a predictable order
  const keys = r.keys().sort();
  return keys.map((k) => r(k));
}

const images = importImages();

export const slides = images.map((src, idx) => {
  // src is the module result; in CRA it resolves to a public URL string
  const url = src.default || src;
  return (
    <motion.div key={`gallery-slide-${idx}`} style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 12, boxSizing: 'border-box' }}>
      <img src={url} alt={`gallery-${idx}`} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: 8, boxShadow: '0 10px 30px rgba(0,0,0,0.6)' }} loading="lazy" />
    </motion.div>
  );
});

export default function Gallery() {
  return slides[0] || null;
}
