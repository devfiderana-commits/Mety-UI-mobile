"use client";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

// Petite alternative locale à `cn` — évite la dépendance externe
const cn = (...classes) => classes.filter(Boolean).join(" ");

const defaultSpring = {
  type: "spring",
  visualDuration: 0.6,
  bounce: 0.25,
};

export const controls = {
  spring: defaultSpring,
  activeScale: [1.15, 1, 1.6, 0.01],
  cardSpacing: [180, 40, 320, 5],
};

export const Cards = ({
  spring = defaultSpring,
  activeScale = 1.15,
  cardSpacing = 180,
} = {}) => {
  // --- Cartes adaptées au thème AgroMill (bowls, salades, jus...) ---
  const cards = [
    {
      title: "Fresh Bowls",
      description:
        "Des bols colorés préparés à la minute avec des produits de saison.",
      skeleton: (
        <div className="h-50 w-full overflow-hidden rounded-xl">
          <img
            src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80"
            alt="Fresh bowl"
            className="h-full w-full object-cover"
          />
        </div>
      ),
      className: "bg-[#d69055] [&_h2]:text-white",
      config: { y: -20, x: 0, rotate: -15, zIndex: 2 },
    },
    {
      title: "Signature Salads",
      description:
        "Des salades signature croquantes, fraîches et généreuses.",
      skeleton: (
        <div className="h-50 w-full overflow-hidden rounded-xl">
          <img
            src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=800&q=80"
            alt="Signature salad"
            className="h-full w-full object-cover"
          />
        </div>
      ),
      className: "bg-stone-200 [&_p]:text-black",
      config: { y: 20, x: 180, rotate: 8, zIndex: 3 },
    },
    {
      title: "Warm Plates",
      description:
        "Des assiettes chaudes réconfortantes, cuisinées avec soin.",
      skeleton: (
        <div className="h-50 w-full overflow-hidden rounded-xl">
          <img
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80"
            alt="Warm plate"
            className="h-full w-full object-cover"
          />
        </div>
      ),
      className: "bg-[#8a5a34] [&_h2]:text-white",
      config: { y: -80, x: 360, rotate: -5, zIndex: 4 },
    },
    {
      title: "Cold Press Juices",
      description:
        "Des jus pressés à froid, 100% fruits et légumes frais.",
      skeleton: (
        <div className="h-50 w-full overflow-hidden rounded-xl">
          <img
            src="https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=800&q=80"
            alt="Cold press juice"
            className="h-full w-full object-cover"
          />
        </div>
      ),
      className: "bg-emerald-700 [&_h2]:text-white",
      config: { y: 20, x: 540, rotate: 12, zIndex: 5 },
    },
    {
      title: "Sweet Endings",
      description:
        "Des desserts maison, légers et fruités pour finir en douceur.",
      skeleton: (
        <div className="h-50 w-full overflow-hidden rounded-xl">
          <img
            src="https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80"
            alt="Dessert"
            className="h-full w-full object-cover"
          />
        </div>
      ),
      className: "bg-neutral-900 [&_h2]:text-white",
      config: { y: 20, x: 720, rotate: -5, zIndex: 6 },
    },
  ];

  const [active, setActive] = useState(null);
  const [spacing, setSpacing] = useState(cardSpacing);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setActive(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () =>
      setSpacing(mq.matches ? cardSpacing : Math.round(cardSpacing * 0.39));
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [cardSpacing]);

  const middle = (cards.length - 1) / 2;
  const isAnyCardActive = () => active?.title;
  const isCurrentActive = (card) => active?.title === card.title;

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <motion.div
        ref={ref}
        onClick={() => setActive(null)}
        className="relative mx-auto flex h-[420px] w-full max-w-5xl items-center justify-center [--height:280px] [--width:200px] lg:h-[520px] lg:[--height:380px] lg:[--width:280px]"
      >
        {cards.map((card, index) => {
          const offsetX = (index - middle) * spacing;
          return (
            <motion.div key={card.title}>
              <motion.button
                initial={{ x: 0, scale: 0 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setActive(card);
                }}
                animate={{
                  y: isCurrentActive(card)
                    ? 0
                    : isAnyCardActive()
                    ? 400
                    : card.config.y,
                  x: isCurrentActive(card)
                    ? 0
                    : isAnyCardActive()
                    ? offsetX * 0.4
                    : offsetX,
                  rotate: isCurrentActive(card)
                    ? 0
                    : isAnyCardActive()
                    ? 0.2 * card.config.rotate
                    : card.config.rotate,
                  scale: isCurrentActive(card)
                    ? activeScale
                    : isAnyCardActive()
                    ? 0.7
                    : 1,
                }}
                whileHover={{
                  scale: isCurrentActive(card)
                    ? activeScale
                    : isAnyCardActive()
                    ? 0.7
                    : 1.05,
                }}
                transition={spring}
                style={{
                  width: `var(--width)`,
                  height: `var(--height)`,
                  marginLeft: `calc(var(--width) / -2)`,
                  marginTop: `calc(var(--height) / -2)`,
                  zIndex: isCurrentActive(card) ? 50 : card.config.zIndex,
                }}
                className={cn(
                  "absolute top-1/2 left-1/2 flex cursor-pointer flex-col items-start justify-between overflow-hidden rounded-2xl p-2 md:p-4",
                  card.className
                )}
              >
                {card.skeleton}
                <div className="mt-5">
                  <motion.h2
                    layoutId={card.title + "title"}
                    className="font-regular max-w-40 text-left text-base md:text-3xl"
                  >
                    {card.title}
                  </motion.h2>
                  <AnimatePresence mode="popLayout">
                    {active?.title === card.title && (
                      <motion.p
                        layoutId={card.title + "description"}
                        initial={{ opacity: 0, x: 20, y: 20, height: 0 }}
                        animate={{ opacity: 1, x: 0, y: 0, height: 100 }}
                        exit={{ opacity: 0, x: 40, y: 40 }}
                        transition={spring}
                        className="mt-3 text-left text-sm text-white/80 md:text-base"
                      >
                        {card.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </motion.button>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default Cards;