"use client";

import { useEffect, useState } from "react";
import { Brain, Edit3, Calculator, Palette, Cpu, PenTool, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const events = [
  {
    id: "quiz",
    name: "QUIZ",
    title: "Quiz",
    role: "Test your general knowledge and quick thinking across various topics.",
    icon: Brain,
    color: "#00D4FF",
    glow: "rgba(0, 212, 255, 0.15)",
  },
  {
    id: "spell-bee",
    name: "SPELL BEE",
    title: "Spell Bee",
    role: "Master the vocabulary and showcase your spelling prowess.",
    icon: Edit3,
    color: "#A855F7",
    glow: "rgba(168, 85, 247, 0.15)",
  },
  {
    id: "math",
    name: "MATH",
    title: "Math",
    role: "Solve complex problems and prove your analytical skills.",
    icon: Calculator,
    color: "#22C55E",
    glow: "rgba(34, 197, 94, 0.15)",
  },
  {
    id: "art",
    name: "ART CRAFT",
    title: "Art",
    role: "Express your imagination and creativity through colors and shapes.",
    icon: Palette,
    color: "#F97316",
    glow: "rgba(249, 115, 22, 0.15)",
  },
  {
    id: "ai",
    name: "AI TECH",
    title: "AI Tech",
    role: "Build innovative solutions using artificial intelligence.",
    icon: Cpu,
    color: "#6366F1",
    glow: "rgba(99, 102, 241, 0.15)",
  },
  {
    id: "handwriting",
    name: "WRITING",
    title: "Writing",
    role: "Present the beauty of perfect cursive and calligraphy.",
    icon: PenTool,
    color: "#F43F5E",
    glow: "rgba(244, 63, 94, 0.15)",
  },
];

export default function EventShowcase() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const goTo = (idx: number) => {
    if (idx === current) return;
    setPrev(current);
    setCurrent(idx);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setPrev(null);
    }, 800);
    return () => clearTimeout(timer);
  }, [current]);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      goTo((current + 1) % events.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [current, isHovered]);

  return (
    <section 
      id="events" 
      className="min-h-screen flex flex-col justify-center py-20 relative z-10 bg-[#050816] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Dynamic Background Glow Spotlights */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] blur-[180px] rounded-full pointer-events-none transition-all duration-1000 ease-out opacity-25"
        style={{ backgroundColor: events[current].color }}
      />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10 flex flex-col justify-between min-h-[75vh] md:min-h-[80vh] py-8">
        
        {/* Top Section: Header & Thumbs */}
        <div className="text-center flex flex-col items-center w-full">
          <p className="text-white/40 text-xs font-semibold uppercase tracking-[0.25em] mb-2 select-none">
            Explore Arenas
          </p>

          {/* Thumbnail strip */}
          <div className="thumbs flex justify-start sm:justify-center gap-3 px-4 md:px-8 items-end relative z-20 overflow-x-auto pt-8 pb-6 scrollbar-none w-full">
            {events.map((evt, i) => {
              const isActive = i === current;
              return (
                <div
                  key={evt.id}
                  onMouseEnter={() => goTo(i)}
                  onClick={() => goTo(i)}
                  className={`relative rounded-xl overflow-hidden cursor-pointer flex-shrink-0 transition-all duration-500 bg-[#0A1628]/45 border w-24 h-24 ${
                    isActive
                      ? "scale-105 border-glow"
                      : "border-white/5 hover:border-white/20 hover:scale-105"
                  }`}
                  style={isActive ? { 
                    boxShadow: `0 0 25px ${evt.glow}`,
                    borderColor: evt.color 
                  } : {}}
                >
                  <div className="w-full h-full flex flex-col items-center justify-center p-2 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                    <evt.icon className={`w-6 h-6 mb-1 transition-all duration-300 ${isActive ? "scale-110" : "opacity-60"}`} style={{ color: isActive ? evt.color : "#ffffff" }} />
                    <span className={`text-[10px] font-bold tracking-wider font-space-grotesk ${isActive ? "text-white" : "text-white/40"}`}>
                      {evt.title}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Middle Section: Giant name reveal display */}
        <div className="name-display relative h-[180px] sm:h-[240px] md:h-[300px] lg:h-[360px] overflow-hidden cursor-pointer mt-4">
          {events.map((evt, eIdx) => {
            const isActive = eIdx === current;
            const isPrev = eIdx === prev;
            const isVisible = isActive || isPrev;

            if (!isVisible) return null;

            return (
              <div
                key={evt.id}
                className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${
                  isActive ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <Link href="/register" className="w-full h-full flex items-center justify-center group select-none">
                  <h3 
                    className="font-bebas text-[4.5rem] sm:text-[7rem] md:text-[10rem] lg:text-[13rem] leading-none tracking-tight flex items-center uppercase font-normal text-glow"
                    style={{ 
                      color: evt.color, 
                      textShadow: `0 0 45px ${evt.glow}` 
                    }}
                  >
                    <span 
                      className="inline-flex items-center justify-center w-[0.55em] h-[0.55em] rounded-full mr-4 sm:mr-6 transition-all duration-500 group-hover:scale-110 shadow-lg border border-white/10 flex-shrink-0 relative -top-[0.05em]"
                      style={{ backgroundColor: evt.color }}
                    >
                      <ArrowUpRight className="w-[50%] h-[50%] text-black stroke-[3.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                    {evt.name.split("").map((char, charIdx) => {
                      if (char === " ") return <span key={charIdx} className="w-[0.25em]" />;

                      let transformClass = "translate-y-[100%]";
                      if (isActive) {
                        transformClass = "translate-y-0";
                      } else if (isPrev) {
                        transformClass = "-translate-y-[110%]";
                      }

                      const delay = isActive ? charIdx * 30 : charIdx * 20;

                      return (
                        <span key={charIdx} className="inline-block overflow-hidden h-[1.1em] pointer-events-none">
                          <span
                            className={`inline-block transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${transformClass}`}
                            style={{ transitionDelay: `${delay}ms` }}
                          >
                            {char}
                          </span>
                        </span>
                      );
                    })}
                  </h3>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Bottom Section: Metadata & Nav Dots */}
        <div className="flex flex-col gap-6 mt-4">
          {/* Meta Bar */}
          <div className="member-meta flex flex-col items-center justify-center border-t border-white/10 pt-8 px-4 md:px-8 text-center relative w-full">
            <div className="max-w-xl flex flex-col items-center">
              <p className={`member-role text-xs sm:text-sm tracking-widest uppercase transition-all duration-500 ${
                prev !== null ? "text-primary opacity-50" : "text-white/60"
              }`}>
                {events[current].role}
              </p>
              <Link 
                href="/register" 
                className="inline-flex items-center gap-1.5 text-xs text-[#00D4FF] hover:underline uppercase tracking-[0.15em] font-semibold mt-4 transition-all duration-300 hover:text-white"
              >
                Secure Spot in this Arena &rarr;
              </Link>
            </div>

            <p className="absolute right-4 md:right-8 bottom-2 md:bottom-auto md:top-1/2 md:-translate-y-1/2 font-bebas text-7xl md:text-[6.5rem] text-[#111c30] font-normal leading-none select-none transition-colors duration-500">
              {String(current + 1).padStart(2, '0')}
            </p>
          </div>

          {/* Nav Dots */}
          <div className="nav-dots flex justify-center gap-2.5 px-4 md:px-8 pt-4">
            {events.map((_, i) => {
              const isActive = i === current;
              return (
                <div
                  key={i}
                  onClick={() => goTo(i)}
                  className={`dot h-0.5 rounded-full cursor-pointer transition-all duration-500 ${
                    isActive ? "w-12" : "w-6 bg-white/10 hover:bg-white/30"
                  }`}
                  style={isActive ? { backgroundColor: events[current].color } : {}}
                />
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
