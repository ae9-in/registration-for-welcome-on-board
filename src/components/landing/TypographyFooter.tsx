"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Trophy, Zap } from "lucide-react";

export default function TypographyFooter() {
  const brandName = "WELCOME ON BOARD";
  const letters = Array.from(brandName);

  // Parent stagger container
  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.03,
      },
    },
  };

  // Single letter variants
  const letterVariants = {
    initial: { y: "100%" },
    animate: {
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section className="pt-24 pb-12 bg-[#050816] relative z-10 border-t border-white/5 overflow-hidden w-full flex flex-col items-center justify-between">
      {/* Dynamic glowing lights */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-t from-primary/10 via-[#00D4FF]/5 to-transparent blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Main Registration Area (Formally FinalCTA content) */}
      <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl mb-24">
        {/* Subtle trophy icon/badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-6"
        >
          <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.03)]">
            <Trophy className="w-6 h-6 text-primary" />
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-space-grotesk text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6"
        >
          Ready to <span className="gradient-text">Make It Happen?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/60 text-base sm:text-lg font-light max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Join 1,000+ top competitors across 50+ schools. Claim your spot, showcase your talent, and dominate the arena.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href="/register?bundle=true"
            className="group relative flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#00D4FF] to-[#1E6FFF] text-white rounded-full font-semibold text-base hover:shadow-[0_0_25px_rgba(0,212,255,0.35)] transition-all duration-300 w-full sm:w-auto"
          >
            <Zap className="w-4 h-4 fill-white/20" />
            <span>Claim All-Access Bundle</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/register"
            className="group flex items-center justify-center gap-2 px-8 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white rounded-full font-semibold text-base backdrop-blur-md transition-all duration-300 w-full sm:w-auto"
          >
            <span>Register Standard</span>
          </Link>
        </motion.div>
      </div>

      {/* Massive Typography visual */}
      <div className="w-full relative select-none overflow-hidden my-8">
        <motion.div
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-10%" }}
          className="flex justify-center items-center w-full"
        >
          <div className="flex flex-row flex-nowrap justify-center items-center whitespace-nowrap font-bebas text-[5.5vw] sm:text-[7vw] md:text-[8.5vw] lg:text-[9.5vw] leading-none tracking-tighter text-center uppercase text-[#E1E0CC]/10 select-none px-4 w-full overflow-hidden">
            {letters.map((letter, idx) => {
              if (letter === " ") {
                return <span key={idx} className="w-[0.25em] flex-shrink-0 inline-block font-bebas" />;
              }
              return (
                <span key={idx} className="relative inline-block overflow-hidden pb-[0.05em] flex-shrink-0 font-bebas">
                  <motion.span
                    variants={letterVariants}
                    whileHover={{
                      y: -15,
                      color: "#DEDBC8",
                      textShadow: "0 0 40px rgba(222, 219, 200, 0.4)",
                      scale: 1.08,
                      transition: { type: "spring", stiffness: 350, damping: 10 }
                    }}
                    className="inline-block cursor-default transition-colors duration-200 font-bebas"
                    style={{
                      WebkitTextStroke: "1px rgba(222, 219, 200, 0.15)",
                    }}
                  >
                    {letter}
                  </motion.span>
                </span>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Footer Info Row */}
      <div className="w-full max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/5 relative z-10 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        <div className="space-y-1">
          <p className="text-white/40 text-xs sm:text-sm">
            © 2026 Welcome on board. All rights reserved.
          </p>
          <p className="text-white/20 text-[10px] sm:text-xs">
            Showcase, learn, and grow through creative competitions.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 text-xs text-white/30">
          <Link href="/register" className="hover:text-primary transition-colors">Register</Link>
          <Link href="/admin" className="hover:text-primary transition-colors">Admin Portal</Link>
          <span className="text-white/10">|</span>
          <span className="text-white/30 select-none">Competitions Make It Happen</span>
        </div>
      </div>
    </section>
  );
}
