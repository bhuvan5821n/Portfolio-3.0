"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import type { CSSProperties, PointerEvent } from "react";

const objectAssets: Record<string, { src: string; width: number; height: number }> = {
  friday: { src: "/media/curiosity-arcade/microphone.webp", width: 186, height: 375 },
  fleetmind: { src: "/media/curiosity-arcade/fleet-table.webp", width: 372, height: 321 },
  "grain-za": { src: "/media/curiosity-arcade/grain-za.webp", width: 362, height: 350 },
  markwell: { src: "/media/curiosity-arcade/markwell.webp", width: 360, height: 358 },
  "space-shooter": { src: "/media/curiosity-arcade/spacecraft.webp", width: 356, height: 306 },
  "procedural-frontier": { src: "/media/curiosity-arcade/terrain.webp", width: 366, height: 355 },
};

export function ProjectObject({ slug, priority = false }: { slug: string; priority?: boolean }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start end", "end start"],
  });
  const scrollShift = useTransform(scrollYProgress, [0, 0.5, 1], [8, 0, -8]);
  const asset = objectAssets[slug];

  if (!asset) return null;

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType === "touch") return;
    const element = wrapperRef.current;
    if (!element) return;
    const bounds = element.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    element.style.setProperty("--object-x", `${x * 9}px`);
    element.style.setProperty("--object-y", `${y * 7}px`);
    element.style.setProperty("--object-rotate", `${x * 2.2}deg`);
  };

  const reset = () => {
    const element = wrapperRef.current;
    element?.style.setProperty("--object-x", "0px");
    element?.style.setProperty("--object-y", "0px");
    element?.style.setProperty("--object-rotate", "0deg");
  };

  return (
    <div
      ref={wrapperRef}
      className={`project-object project-object--${slug}`}
      style={{ "--object-x": "0px", "--object-y": "0px", "--object-rotate": "0deg" } as CSSProperties}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      aria-hidden="true"
    >
      <motion.div className="project-object__motion" style={{ y: reduceMotion ? 0 : scrollShift }}>
        <Image
          src={asset.src}
          alt=""
          width={asset.width}
          height={asset.height}
          priority={priority}
          sizes="(max-width: 767px) 70vw, 36vw"
        />
      </motion.div>
    </div>
  );
}
