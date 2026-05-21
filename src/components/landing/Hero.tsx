"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
}

function WordsPullUp({ text, className, showAsterisk }: WordsPullUpProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const words = text.split(" ");

  return (
    <span ref={ref} className="inline-flex flex-wrap justify-start relative">
      {words.map((word, idx) => {
        const isLastWord = idx === words.length - 1;
        return (
          <span 
            key={idx} 
            className={`relative inline-block overflow-hidden pb-[0.05em] mr-[0.25em] last:mr-0 ${
              isLastWord && showAsterisk ? "pr-[0.35em]" : ""
            }`}
          >
            <motion.span
              initial={{ y: "100%" }}
              animate={isInView ? { y: 0 } : { y: "100%" }}
              transition={{
                duration: 0.8,
                delay: idx * 0.08,
                ease: [0.16, 1, 0.3, 1]
              }}
              className={`inline-block ${className || ""}`}
            >
              {word}
              {isLastWord && showAsterisk && (
                <span 
                  className="absolute top-[0.65em] -right-[0.1em] text-[0.31em] pointer-events-none select-none"
                  style={{ color: "#E1E0CC" }}
                >
                  *
                </span>
              )}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}

export default function Hero() {
  const containerRef = useRef(null);

  return (
    <section className="h-screen w-full bg-black p-4 md:p-6 relative z-10 flex flex-col">
      <div 
        ref={containerRef}
        className="relative w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden flex flex-col justify-between"
      >
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
            type="video/mp4"
          />
        </video>

        {/* Noise overlay */}
        <div className="absolute inset-0 z-[1] noise-overlay opacity-[0.7] mix-blend-overlay pointer-events-none" />

        {/* Gradient overlay */}
        <div className="absolute inset-0 z-[2] bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none" />

        {/* Navbar Hanging Pill */}
        <nav className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
          <div className="bg-black rounded-b-2xl md:rounded-b-3xl px-6 py-3 flex items-center gap-6 md:gap-12 whitespace-nowrap border-b border-x border-white/5">
            <Link 
              href="/" 
              style={{ color: "#E1E0CC" }}
              className="text-xs sm:text-sm font-bold tracking-wider uppercase transition-colors hover:text-[#DEDBC8]"
            >
              Welcome on board
            </Link>
            <Link 
              href="/register" 
              style={{ backgroundColor: "#DEDBC8", color: "#000000" }}
              className="px-4 py-1.5 rounded-full text-xs font-semibold hover:bg-[#E1E0CC] transition-colors"
            >
              Register Now
            </Link>
          </div>
        </nav>

        {/* Hero Content (bottom-aligned) */}
        <div className="relative z-10 w-full mt-auto p-6 sm:p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            
            {/* Left Column: Heading */}
            <div className="lg:col-span-8 flex flex-col justify-end">
              <h1 className="text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[7.5vw] xl:text-[6.5vw] font-medium leading-[0.85] tracking-[-0.07em] text-[#E1E0CC] select-none text-left">
                <WordsPullUp 
                  text="Welcome on board" 
                  showAsterisk={true}
                />
              </h1>
            </div>

            {/* Right Column: Description & Button */}
            <div className="lg:col-span-4 flex flex-col gap-6 items-start text-left lg:pl-4">
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="text-[#DEDBC8]/70 text-xs sm:text-sm md:text-base font-light leading-[1.2]"
              >
                Welcome on board is a worldwide network of visual artists, filmmakers and storytellers bound not by place, status or labels but by passion and hunger to unlock potential through our unique perspectives.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.7,
                  ease: [0.16, 1, 0.3, 1]
                }}
              >
                <Link 
                  href="/register" 
                  className="group inline-flex items-center gap-2 rounded-full pl-6 pr-1.5 py-1.5 bg-[#DEDBC8] text-black font-semibold text-sm sm:text-base transition-all duration-300 hover:gap-3"
                >
                  <span>Register For Arenas</span>
                  <div className="bg-black rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transition-transform group-hover:scale-110">
                    <ArrowRight className="w-5 h-5 text-white" />
                  </div>
                </Link>
              </motion.div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
