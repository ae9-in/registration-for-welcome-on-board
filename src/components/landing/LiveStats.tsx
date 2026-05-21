"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users, School, Target, Award } from "lucide-react";

interface CounterProps {
  value: number;
  suffix?: string;
  duration?: number;
}

function AnimateCounter({ value, suffix = "", duration = 2 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = value;
    const totalMiliseconds = duration * 1000;
    const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 15);
    
    const timer = setInterval(() => {
      start += Math.ceil(end / (totalMiliseconds / incrementTime));
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="font-space-grotesk text-5xl md:text-6xl font-extrabold text-[#00D4FF] text-glow">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

const stats = [
  {
    icon: Users,
    value: 1000,
    suffix: "+",
    label: "Active Registrations",
    description: "Competitors ready to make it happen.",
    color: "text-blue-400"
  },
  {
    icon: School,
    value: 50,
    suffix: "+",
    label: "Schools Engaged",
    description: "Institutions competing for the top ranks.",
    color: "text-purple-400"
  },
  {
    icon: Target,
    value: 6,
    suffix: "",
    label: "Epic Arenas",
    description: "Fields of intellect and high-octane talent.",
    color: "text-[#00D4FF]"
  },
  {
    icon: Award,
    value: 50000,
    suffix: "+",
    label: "Grand Prize Pool (₹)",
    description: "Exciting rewards for ultimate champions.",
    color: "text-emerald-400"
  }
];

export default function LiveStats() {
  return (
    <section className="py-24 relative z-10 bg-[#050816] overflow-hidden border-y border-white/5">
      {/* Background Radial Light */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(0,212,255,0.05)_0%,transparent_60%)] pointer-events-none" />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="glass-card p-8 rounded-2xl border-white/5 bg-[#0A1628]/30 backdrop-blur-xl relative overflow-hidden flex flex-col items-center text-center shadow-xl hover:border-white/10 transition-all duration-300 group"
            >
              {/* Subtle background glow */}
              <div className="absolute -right-6 -top-6 w-20 h-20 bg-white/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all duration-500 pointer-events-none" />
              
              <div className={`w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>

              <div className="mb-2">
                <AnimateCounter value={stat.value} suffix={stat.suffix} />
              </div>

              <h4 className="text-white font-semibold text-lg mb-1 tracking-wide">{stat.label}</h4>
              <p className="text-white/40 font-light text-sm">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
