"use client";

import { motion } from "framer-motion";

const milestones = [
  {
    phase: "Phase 01",
    title: "Registrations Live",
    date: "May 20 - June 15, 2026",
    description: "Secure your arena. Single entries cost ₹333, or lock in all six arenas for the grand ₹1000 bundle value.",
    status: "active"
  },
  {
    phase: "Phase 02",
    title: "Mentorship & Prep Workshops",
    date: "June 18 - June 22, 2026",
    description: "Learn from top industry veterans and mentors. Masterclasses targeting Quiz, AI Tech, and Art/Craft strategies.",
    status: "upcoming"
  },
  {
    phase: "Phase 03",
    title: "Preliminary Rounds",
    date: "June 25 - June 28, 2026",
    description: "Online knockout rounds testing quick thinking and accuracy. Top 15 competitors from each arena advance.",
    status: "upcoming"
  },
  {
    phase: "Phase 04",
    title: "The Grand Finale",
    date: "July 05, 2026",
    description: "On-stage showdowns, final presentations, and live evaluations in front of a stellar jury.",
    status: "upcoming"
  },
  {
    phase: "Phase 05",
    title: "Awards Ceremony",
    date: "July 05, 2026 (Evening)",
    description: "Grand announcement of winners, cash distribution, distribution of elite certification and trophy reveal.",
    status: "upcoming"
  }
];

export default function Timeline() {
  return (
    <section className="py-24 relative z-10 bg-[#050816] overflow-hidden">
      {/* Background soft blur gradient */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#1E6FFF]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-[#7C3AED]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <span className="inline-block py-1 px-3 rounded-full border border-primary/20 bg-primary/5 text-xs font-semibold uppercase tracking-wider text-primary mb-4">
            Timeline
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-space-grotesk mb-4">
            The Road to <span className="gradient-text">Glory</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg font-light">
            Stay aligned with key dates and phases. Prepare for the ultimate showcase of talent.
          </p>
        </div>

        {/* Timeline Path */}
        <div className="relative max-w-4xl mx-auto">
          {/* Central Line Track */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#00D4FF] via-[#1E6FFF] to-[#7C3AED]/20 -translate-x-1/2 pointer-events-none" />

          <div className="space-y-12">
            {milestones.map((item, idx) => {
              const isEven = idx % 2 === 0;
              const isActive = item.status === "active";

              return (
                <div key={idx} className="relative flex flex-col md:flex-row md:items-center">
                  {/* Central Glow Point */}
                  <div 
                    className={`absolute left-4 md:left-1/2 top-2 md:top-auto w-6 h-6 rounded-full border-4 -translate-x-1/2 z-20 flex items-center justify-center transition-all duration-500 ${
                      isActive 
                        ? "bg-[#00D4FF] border-white shadow-[0_0_15px_#00D4FF] scale-110" 
                        : "bg-[#050816] border-white/20 hover:border-white/50"
                    }`}
                  />

                  {/* Left Side (Even items get details here on desktop) */}
                  <div className={`w-full md:w-1/2 pl-12 md:pl-0 md:pr-12 md:text-right flex justify-end ${
                    isEven ? "md:order-1 flex" : "hidden md:flex md:order-2 opacity-0 pointer-events-none"
                  }`}>
                    {isEven && (
                      <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className={`glass-card p-6 rounded-2xl border-white/5 bg-[#0A1628]/35 backdrop-blur-xl relative hover:border-white/10 transition-colors w-full ${
                          isActive ? "border-[#00D4FF]/30 shadow-[0_0_20px_rgba(0,212,255,0.1)]" : ""
                        }`}
                      >
                        <span className={`text-xs font-semibold tracking-wider uppercase mb-1 block ${isActive ? "text-[#00D4FF]" : "text-white/40"}`}>
                          {item.phase} {isActive && "• Active"}
                        </span>
                        <h3 className="text-xl font-bold text-white mb-1 font-space-grotesk">{item.title}</h3>
                        <p className="text-xs text-white/50 mb-3 font-semibold">{item.date}</p>
                        <p className="text-white/60 font-light text-sm leading-relaxed">{item.description}</p>
                      </motion.div>
                    )}
                  </div>

                  {/* Right Side (Odd items get details here on desktop) */}
                  <div className={`w-full md:w-1/2 pl-12 md:pl-12 flex justify-start ${
                    !isEven ? "md:order-2 flex" : "hidden md:flex md:order-1 opacity-0 pointer-events-none"
                  }`}>
                    {!isEven && (
                      <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className={`glass-card p-6 rounded-2xl border-white/5 bg-[#0A1628]/35 backdrop-blur-xl relative hover:border-white/10 transition-colors w-full ${
                          isActive ? "border-[#00D4FF]/30 shadow-[0_0_20px_rgba(0,212,255,0.1)]" : ""
                        }`}
                      >
                        <span className={`text-xs font-semibold tracking-wider uppercase mb-1 block ${isActive ? "text-[#00D4FF]" : "text-white/40"}`}>
                          {item.phase} {isActive && "• Active"}
                        </span>
                        <h3 className="text-xl font-bold text-white mb-1 font-space-grotesk">{item.title}</h3>
                        <p className="text-xs text-white/50 mb-3 font-semibold">{item.date}</p>
                        <p className="text-white/60 font-light text-sm leading-relaxed">{item.description}</p>
                      </motion.div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
