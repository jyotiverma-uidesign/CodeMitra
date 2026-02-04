import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useAnimation,
} from "framer-motion";

interface InteractiveCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  magneticStrength?: number;
  tiltIntensity?: number;
}

export const InteractiveCard: React.FC<InteractiveCardProps> = ({
  children,
  className = "",
  onClick,
  disabled = false,
  magneticStrength = 0.3,
  tiltIntensity = 1,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  /* ---------------- MOTION VALUES ---------------- */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cardX = useMotionValue(0);
  const cardY = useMotionValue(0);

  /* ---------------- SPRINGS ---------------- */
  const magneticSpring = { stiffness: 160, damping: 18, mass: 0.15 };
  const tiltSpring = { stiffness: 420, damping: 28, mass: 0.9 };
  const breathingSpring = { stiffness: 40, damping: 20, mass: 1 };

  /* ---------------- MAGNETIC FOLLOW ---------------- */
  const magneticX = useSpring(
    useTransform(mouseX, (v) => v * magneticStrength * 20),
    magneticSpring
  );

  const magneticY = useSpring(
    useTransform(mouseY, (v) => v * magneticStrength * 20),
    magneticSpring
  );

  /* ---------------- 3D TILT ---------------- */
  const rotateX = useSpring(
    useTransform(cardY, [-0.5, 0.5], [-15 * tiltIntensity, 15 * tiltIntensity]),
    tiltSpring
  );

  const rotateY = useSpring(
    useTransform(cardX, [-0.5, 0.5], [15 * tiltIntensity, -15 * tiltIntensity]),
    tiltSpring
  );

  /* ---------------- PARALLAX ---------------- */
  const bgX = useTransform(cardX, (v) => v * 6);
  const bgY = useTransform(cardY, (v) => v * 6);

  const contentX = useTransform(cardX, (v) => v * 3);
  const contentY = useTransform(cardY, (v) => v * 3);

  const highlightX = useTransform(cardX, (v) => v * 8);
  const highlightY = useTransform(cardY, (v) => v * 8);

  /* ---------------- LIGHTING (NO MULTI INPUT ❗) ---------------- */
  const lightAngle = useTransform(cardX, (x) =>
    x * 180
  );

  const lightIntensity = useTransform(cardY, (y) =>
    Math.min(Math.abs(y) * 0.6, 0.5)
  );

  /* ---------------- BREATHING ---------------- */
  const breathing = useMotionValue(0);
  const breathingY = useSpring(
    useTransform(breathing, [-1, 1], [1.5, -1.5]),
    breathingSpring
  );

  const controls = useAnimation();

  /* ---------------- POINTER ---------------- */
  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!cardRef.current || disabled) return;

      const rect = cardRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const rawX = (e.clientX - cx) / (rect.width / 2);
      const rawY = (e.clientY - cy) / (rect.height / 2);

      const resistance = 0.75;
      const dampX =
        Math.sign(rawX) * (1 - Math.exp(-Math.abs(rawX) * resistance));
      const dampY =
        Math.sign(rawY) * (1 - Math.exp(-Math.abs(rawY) * resistance));

      mouseX.set(rawX);
      mouseY.set(rawY);
      cardX.set(dampX);
      cardY.set(dampY);
    },
    [disabled]
  );

  const reset = () => {
    mouseX.set(0);
    mouseY.set(0);
    cardX.set(0);
    cardY.set(0);
  };

  /* ---------------- STATES ---------------- */
  const handleEnter = () => {
    if (disabled) return;
    setIsHovered(true);
    controls.start({ scale: 1.03 });
  };

  const handleLeave = () => {
    setIsHovered(false);
    setIsPressed(false);
    reset();
    controls.start({ scale: 1 });
  };

  const handleDown = () => {
    if (disabled) return;
    setIsPressed(true);
    controls.start({ scale: 0.97 });
  };

  const handleUp = () => {
    setIsPressed(false);
    controls.start({ scale: isHovered ? 1.03 : 1 });
  };

  /* ---------------- IDLE ---------------- */
  useEffect(() => {
    if (!isHovered && !isPressed) {
      const i = setInterval(() => {
        breathing.set(Math.random() * 2 - 1);
      }, 5000);
      return () => clearInterval(i);
    }
  }, [isHovered, isPressed]);

  /* ---------------- RENDER ---------------- */
  return (
    <motion.div
      ref={cardRef}
      className={`relative cursor-pointer ${className}`}
      style={{
        x: magneticX,
        y: magneticY,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      animate={controls}
      onPointerMove={handlePointerMove}
      onPointerEnter={handleEnter}
      onPointerLeave={handleLeave}
      onPointerDown={handleDown}
      onPointerUp={handleUp}
      onClick={onClick}
    >
      {/* BACKGROUND */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{
          x: bgX,
          y: bgY,
          background:
            "radial-gradient(circle at center, rgba(139,92,246,0.12), transparent 70%)",
        }}
      />

      {/* LIGHT */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{
          x: highlightX,
          y: highlightY,
          background: useTransform(
            lightAngle,
            (a) =>
              `conic-gradient(from ${a}deg, rgba(139,92,246,${lightIntensity.get()}), transparent 60%)`
          ),
        }}
      />

      {/* CONTENT */}
      <motion.div
        className="relative bg-card/80 backdrop-blur-md border rounded-2xl p-6"
        style={{
          x: contentX,
          y: contentY,
          translateY: breathingY,
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};
