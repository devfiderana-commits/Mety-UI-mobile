"use client";

import React, { useRef, useState } from "react";
import { motion } from "motion/react";

const cn = (...classes) => classes.filter(Boolean).join(" ");

export function HeroParallax({ products }) {
  const ref = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    setOffset({ x: x * 22, y: y * 18 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className="hero-parallax"
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
    >
      <div className="hero-parallax-header">
        <p className="eyebrow">Chef’s selection</p>
        <h2>Curated flavors for every mood</h2>
      </div>

      <div className="hero-parallax-grid">
        {products.map((product, index) => {
          const shiftX = offset.x * (index % 2 === 0 ? 1 : -1) * (1 + index * 0.08);
          const shiftY = offset.y * (index % 2 === 0 ? 1 : -1) * (1 + index * 0.06);

          return (
            <motion.a
              key={product.title}
              href={product.link}
              target="_blank"
              rel="noreferrer"
              className={cn("parallax-card", index % 2 === 0 ? "parallax-card--left" : "parallax-card--right")}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              whileHover={{ scale: 1.02, y: -8 }}
              style={{
                transform: `translate(${shiftX}px, ${shiftY}px)`,
              }}
            >
              <img src={product.thumbnail} alt={product.title} />
              <div className="parallax-card-label">
                <span>{product.title}</span>
              </div>
            </motion.a>
          );
        })}
      </div>
    </div>
  );
}

export function HeroParallaxDemo() {
  return <HeroParallax products={products} />;
}

export const products = [
  {
    title: "Moonbeam",
    link: "https://gomoonbeam.com",
    thumbnail:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Cursor",
    link: "https://cursor.so",
    thumbnail:
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Rogue",
    link: "https://userogue.com",
    thumbnail:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Editorially",
    link: "https://editorially.org",
    thumbnail:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Editrix AI",
    link: "https://editrix.ai",
    thumbnail:
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Pixel Perfect",
    link: "https://app.pixelperfect.quest",
    thumbnail:
      "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Algochurn",
    link: "https://algochurn.com",
    thumbnail:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Aceternity UI",
    link: "https://ui.aceternity.com",
    thumbnail:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Tailwind Master Kit",
    link: "https://tailwindmasterkit.com",
    thumbnail:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "SmartBridge",
    link: "https://smartbridgetech.com",
    thumbnail:
      "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Renderwork Studio",
    link: "https://renderwork.studio",
    thumbnail:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Creme Digital",
    link: "https://cremedigital.com",
    thumbnail:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=900&q=80",
  },
];

export default HeroParallax;
