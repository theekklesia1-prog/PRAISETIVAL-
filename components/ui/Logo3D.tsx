"use client";

import Image from "next/image";
import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

const SRC = "/images/brand/logo-white.png";
const LAYERS = 10; // extrusion depth = stacked copies of the wordmark
const STEP = 3.5; // px between layers

/**
 * The hero wordmark as a floating 3D object: a real extruded stack (front face
 * bright, body fading dark) that gently floats and sways on its own, and tilts
 * in 3D toward the cursor. Pure CSS 3D transforms — no WebGL.
 */
export function Logo3D({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  // cursor position, normalised to -0.5..0.5 around the viewport centre
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-18, 18]), {
    stiffness: 55,
    damping: 14,
  });
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [14, -14]), {
    stiffness: 55,
    damping: 14,
  });

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: MouseEvent) => {
      px.set(e.clientX / window.innerWidth - 0.5);
      py.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [px, py, reduce]);

  const layers = Array.from({ length: LAYERS });

  return (
    <div className={className} style={{ perspective: 1300 }}>
      {/* mouse-driven tilt */}
      <motion.div
        style={
          reduce
            ? { transformStyle: "preserve-3d" }
            : { rotateX, rotateY, transformStyle: "preserve-3d" }
        }
      >
        {/* self-driven float + sway */}
        <motion.div
          style={{ transformStyle: "preserve-3d" }}
          animate={
            reduce
              ? undefined
              : { rotateY: [-6, 6, -6], rotateX: [3.5, -3.5, 3.5], y: [0, -14, 0] }
          }
          transition={{
            rotateY: { duration: 9, repeat: Infinity, ease: "easeInOut" },
            rotateX: { duration: 7, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          {layers.map((_, i) => {
            const front = i === 0;
            // deeper layers sit further back and darker, forming the extruded body
            const brightness = front ? 1 : 0.42 - (i / LAYERS) * 0.24;
            return (
              <Image
                key={i}
                src={SRC}
                alt={front ? "Praisetival" : ""}
                aria-hidden={!front}
                width={640}
                height={253}
                priority={front}
                draggable={false}
                className={
                  front
                    ? "relative h-auto w-full select-none"
                    : "absolute left-0 top-0 h-auto w-full select-none"
                }
                style={{
                  transform: `translateZ(${-i * STEP}px)`,
                  filter: front
                    ? "drop-shadow(0 22px 45px rgba(0,0,0,0.55))"
                    : `brightness(${brightness})`,
                }}
              />
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
}
