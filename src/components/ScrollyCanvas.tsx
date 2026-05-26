"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import Overlay from "./Overlay";

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const { scrollY } = useScroll();
  const [scrollDistance, setScrollDistance] = useState(3600); // Premium default

  useEffect(() => {
    const handleResize = () => {
      setScrollDistance(4 * window.innerHeight);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  // Absolute linear scroll progress mapped from window scrollY
  const scrollYProgress = useTransform(scrollY, [0, scrollDistance], [0, 1]);

  const numFrames = 120;
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, numFrames - 1]);
  
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [imagesPreloaded, setImagesPreloaded] = useState(false);
  const [wordsFinished, setWordsFinished] = useState(false);

  // Word list and cycling logic
  const words = ["Hello", "Namaste", "Nǐ Hǎo", "Marhaba", "Bonjour", "Hallo", "こんにちは", "Grüezi", "Hello"];
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    if (wordIndex === words.length - 1) {
      const finishTimeout = setTimeout(() => {
        setWordsFinished(true);
      }, 300);
      return () => clearTimeout(finishTimeout);
    }
    const timeout = setTimeout(() => {
      setWordIndex(wordIndex + 1);
    }, wordIndex === 0 ? 800 : 250);
    return () => clearTimeout(timeout);
  }, [wordIndex]);

  // Dimension mapping for responsive SVG curves
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const preloadImages = async () => {
      const promises = Array.from({ length: numFrames }, (_, i) => {
        return new Promise<HTMLImageElement>((resolve) => {
          const img = new Image();
          const paddedIndex = i.toString().padStart(3, "0");
          img.src = `/sequence/frame_${paddedIndex}_delay-0.07s.webp`;
          img.onload = () => {
            resolve(img);
          };
          img.onerror = () => {
            console.error(`Failed to load image index ${i}`);
            resolve(img); 
          };
        });
      });

      const loadedImages = await Promise.all(promises);
      setImages(loadedImages);
      setImagesPreloaded(true);
    };

    preloadImages();
  }, []);

  // Set loaded only when both images are loaded and greetings are finished
  useEffect(() => {
    if (imagesPreloaded && wordsFinished) {
      setIsLoaded(true);
      window.dispatchEvent(new CustomEvent("experience-loaded"));
    }
  }, [imagesPreloaded, wordsFinished]);

  const lastDrawnIndex = useRef<number>(-1);

  const drawImage = (index: number, force = false) => {
    if (!images[index] || !canvasRef.current) return;
    if (index === lastDrawnIndex.current && !force) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = images[index];
    if (!img.width) return; // Skip broken images
    
    const dpr = window.devicePixelRatio || 1;

    // Object-fit: cover logic using canvas pre-allocated width/height
    const imgRatio = img.width / img.height;
    const canvasRatio = canvas.width / canvas.height;

    let drawWidth = canvas.width / dpr;
    let drawHeight = canvas.height / dpr;
    let offsetX = 0;
    let offsetY = 0;

    if (imgRatio > canvasRatio) {
      // Image is wider than canvas
      drawWidth = (canvas.height / dpr) * imgRatio;
      offsetX = (canvas.width / dpr - drawWidth) / 2;
    } else {
      // Image is taller than canvas
      drawHeight = (canvas.width / dpr) / imgRatio;
      offsetY = (canvas.height / dpr - drawHeight) / 2;
    }

    // Clear and draw utilizing save/restore to prevent scale accumulation
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    ctx.restore();

    lastDrawnIndex.current = index;
  };

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    // Force redraw current scroll frame after resizing canvas buffer
    drawImage(Math.round(frameIndex.get()), true);
  };

  // Draw correct scroll-aligned frame when loaded and set up initial canvas size
  useEffect(() => {
    if (isLoaded && images.length > 0) {
      resizeCanvas();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, images]);

  // Handle window resize cleanly without redundant state lookups
  useEffect(() => {
    const handleResize = () => {
      if (isLoaded) {
        resizeCanvas();
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  // Scrub through images on scroll (performs instant draw using cached sizes)
  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (isLoaded) {
      drawImage(Math.round(latest));
    }
  });

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width/2} ${dimension.height} 0 ${dimension.height} Z`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width/2} ${dimension.height + 1000} 0 ${dimension.height} Z`;

  const slideUp = {
    initial: {
      top: 0
    },
    exit: {
      top: "-150vh",
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const, delay: 0.2 }
    }
  };

  const curve = {
    initial: {
      d: initialPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] as const }
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const, delay: 0.2 }
    }
  };

  return (
    <div ref={containerRef} className="relative h-[500vh] bg-[#121212] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full block"
        />

        <Overlay scrollYProgress={scrollYProgress} />
        
        {/* Loading overlay */}
        <AnimatePresence>
          {!isLoaded && (
            <motion.div 
              variants={slideUp}
              initial="initial"
              exit="exit"
              className={`fixed inset-0 flex items-center justify-center z-[100] loading-experience-overlay ${dimension.width === 0 ? 'bg-[#121212]' : ''}`}
              style={{ height: "100vh" }}
            >
              {dimension.width > 0 && (
                <div className="absolute inset-0 z-30 flex items-center justify-center select-none pointer-events-none">
                  <div className="flex items-center justify-center gap-4 md:gap-5">
                    <span className="text-white text-4xl md:text-6xl font-bold font-heading shrink-0 leading-none">/</span>
                    <p className="text-center text-white text-4xl md:text-6xl font-bold tracking-tight font-heading m-0 leading-none whitespace-nowrap">
                      {words[wordIndex]}
                    </p>
                  </div>
                </div>
              )}

              {/* Curved SVG Liquid Slide Up Backdrop */}
              {dimension.width > 0 && (
                <svg className="absolute top-0 w-full pointer-events-none fill-[#121212]" style={{ height: "calc(100% + 300px)" }}>
                  <motion.path 
                    variants={curve}
                    initial="initial"
                    exit="exit"
                  />
                </svg>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
