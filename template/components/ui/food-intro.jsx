import { motion } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";

const DEFAULT_DURATION = 3.6;

const LAYERS = [
  {
    name: "Basilic",
    src: "https://images.unsplash.com/photo-1618375531912-867984bdfd87?auto=format&fit=crop&w=800&q=80",
    initialScale: 1.18,
    revealDelay: 0.35,
    position: { top: "8%", left: "4%" },
    size: "55%",
    rotate: -12,
  },
  {
    name: "Tomate",
    src: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
    initialScale: 1.28,
    revealDelay: 0.5,
    position: { top: "58%", left: "8%" },
    size: "28%",
    rotate: 18,
  },
  {
    name: "Avocat",
    src: "https://images.unsplash.com/photo-1601039641847-7857b994d704?auto=format&fit=crop&w=800&q=80",
    initialScale: 1.35,
    revealDelay: 0.65,
    position: { top: "18%", right: "6%" },
    size: "32%",
    rotate: -22,
  },
  {
    name: "Citron",
    src: "https://images.unsplash.com/photo-1590502593747-42a996133562?auto=format&fit=crop&w=800&q=80",
    initialScale: 1.42,
    revealDelay: 0.78,
    position: { bottom: "16%", right: "10%" },
    size: "26%",
    rotate: 14,
  },
  {
    name: "Graines",
    src: "https://images.unsplash.com/photo-1517093602195-b40af9688b46?auto=format&fit=crop&w=800&q=80",
    initialScale: 1.55,
    revealDelay: 0.9,
    position: { bottom: "8%", left: "38%" },
    size: "20%",
    rotate: -8,
  },
  {
    name: "Bol",
    src: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1400&q=80",
    initialScale: 1.3,
    revealDelay: 1.05,
    position: { top: "50%", left: "50%" },
    size: "75%",
    rotate: 0,
    translate: "-50%, -50%",
    circular: true,
    isHero: true,
  },
  {
    name: "Menthe",
    src: "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?auto=format&fit=crop&w=800&q=80",
    initialScale: 1.7,
    revealDelay: 1.25,
    position: { top: "12%", left: "50%" },
    size: "24%",
    rotate: 25,
    translate: "-50%, 0",
  },
  {
    name: "AgroMill logo",
    type: "text",
    initialScale: 1.2,
    revealDelay: 0.8,
    initial: { opacity: 1, clipPath: "inset(0% 0% 100% 0%)" },
    animate: { clipPath: "inset(0% 0% 0% 0%)" },
  },
];

const DEFAULT_LOGO_SPRING = {
  type: "spring",
  visualDuration: 4,
  bounce: 0.5,
};

export function FoodIntro({
  duration = DEFAULT_DURATION,
  cameraScale = 1.14,
  fit = 0.96,
  depth = 1,
  logoBlur = 4,
  posterRadius = 24,
  background = "radial-gradient(circle at 50% 30%, #fef3e2, #e8d5c0 60%, #c9a67d 100%)",
  showReplay = false,
  logoSpring = DEFAULT_LOGO_SPRING,
  className,
}) {
  const stageRef = useRef(null);
  const [size, setSize] = useState(500);
  const [playKey, setPlayKey] = useState(0);
  const timeScale = duration / DEFAULT_DURATION;

  useLayoutEffect(() => {
    const element = stageRef.current;
    if (!element) return;

    const update = () => {
      const bounds = element.getBoundingClientRect();
      const next = Math.min(bounds.width, bounds.height) * fit;
      if (next > 10) setSize(next);
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, [fit]);

  const logoTransition = {
    clipPath: { ...logoSpring, delay: 0.8 * timeScale },
    filter: { ...logoSpring, delay: 0.8 * timeScale },
  };

  return (
    <div
      ref={stageRef}
      className={`relative flex h-screen w-full items-center justify-center overflow-hidden ${className ?? ""}`}
      style={{ background }}
    >
      <motion.div
        key={playKey}
        className="relative"
        style={{
          width: size,
          height: size,
          borderRadius: posterRadius,
          transformOrigin: "center",
        }}
        initial={{ scale: cameraScale, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration, ease: [0.33, 0, 0.2, 1] }}
      >
        {LAYERS.map((layer, index) => {
          const isLogo = layer.name === "AgroMill logo";
          const scale = 1 + (layer.initialScale - 1) * depth;
          const initialFilter = isLogo ? `blur(${logoBlur}px)` : undefined;
          const animateFilter = isLogo ? "blur(0px)" : undefined;

          if (isLogo) {
            return (
              <motion.div
                key={layer.name}
                className="pointer-events-none absolute inset-0 flex items-center justify-center"
                style={{ zIndex: 999 }}
                initial={{
                  opacity: 1,
                  scale,
                  filter: initialFilter,
                  ...layer.initial,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  filter: animateFilter,
                  ...layer.animate,
                }}
                transition={{
                  scale: { duration, ease: [0.16, 1, 0.3, 1] },
                  ...logoTransition,
                }}
              >
                <span
                  className="select-none font-black tracking-[0.2em] uppercase"
                  style={{
                    fontSize: `clamp(2rem, ${size * 0.09}px, 5rem)`,
                    color: "#3b2a1a",
                    textShadow:
                      "0 2px 12px rgba(255,255,255,0.6), 0 1px 2px rgba(0,0,0,0.08)",
                  }}
                >
                  AgroMill
                </span>
              </motion.div>
            );
          }

          const style = {
            position: "absolute",
            zIndex: index,
            transformOrigin: "center",
            willChange: "transform, opacity, filter",
            width: layer.size,
            height: "auto",
            ...layer.position,
            ...(layer.translate ? { transform: `translate(${layer.translate})` } : {}),
            ...(layer.circular
              ? {
                  aspectRatio: "1",
                  borderRadius: "50%",
                  objectFit: "cover",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.18)",
                }
              : {
                  filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.12))",
                }),
          };

          return (
            <motion.img
              key={layer.name}
              src={layer.src}
              alt={layer.name}
              draggable={false}
              className="pointer-events-none select-none"
              style={style}
              initial={{
                opacity: 0,
                scale,
                rotate: layer.rotate ?? 0,
                ...layer.initial,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: layer.rotate ?? 0,
                ...layer.animate,
              }}
              transition={{
                scale: { duration, ease: [0.16, 1, 0.3, 1] },
                opacity: {
                  duration: 0.7 * timeScale,
                  delay: layer.revealDelay * timeScale,
                  ease: "easeOut",
                },
                rotate: {
                  duration: duration * 1.2,
                  ease: [0.16, 1, 0.3, 1],
                },
              }}
            />
          );
        })}
      </motion.div>

      {showReplay ? (
        <button
          type="button"
          onClick={() => setPlayKey((key) => key + 1)}
          aria-label="Replay intro"
          className="absolute top-4 left-4 z-10 flex size-10 items-center justify-center rounded-full bg-black/10 text-sm font-medium text-stone-800 backdrop-blur-md transition hover:bg-black/20 active:scale-[0.98]"
        >
          <ReplayIcon className="size-4" />
        </button>
      ) : null}
    </div>
  );
}

const ReplayIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M19.933 13.041a8 8 0 1 1 -9.925 -8.788c3.899 -1 7.935 1.007 9.425 4.747" />
      <path d="M20 4v5h-5" />
    </svg>
  );
};

export default FoodIntro;
