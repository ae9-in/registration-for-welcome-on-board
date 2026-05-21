"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const reviews = [
  {
    name: "Aarav Sharma",
    role: "Student, Class 10",
    school: "St. Xavier's Academy",
    quote: "The AI Using Tech competition was mind-blowing! I built my first machine learning project and got constructive feedback from actual tech founders. The platform feels next-gen.",
    glow: "rgba(59,130,246,0.15)"
  },
  {
    name: "Sneha Iyer",
    role: "Parent of Spell Bee Champion",
    school: "Delhi Public School",
    quote: "Securing the ₹1,000 bundle register was the best decision. My daughter participated in Spell Bee and Handwriting, winning second place! The ticketing and cash payouts were incredibly seamless.",
    glow: "rgba(168,85,247,0.15)"
  },
  {
    name: "Rohan Das",
    role: "Student, Class 12",
    school: "Venkateshwar Global School",
    quote: "Math Challenge tested my speed to the limit. The real-time scoring and live stats kept us fully on edge. I loved every second of it! Can't wait for the next season.",
    glow: "rgba(16,185,129,0.15)"
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 relative z-10 bg-[#050816] overflow-hidden">
      {/* Background lights */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[#00D4FF]/5 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block py-1 px-3 rounded-full border border-primary/20 bg-primary/5 text-xs font-semibold uppercase tracking-wider text-primary mb-4">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-space-grotesk mb-4">
            What Competitors <span className="gradient-text">Say</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg font-light">
            Real feedback from pupils, mentors, and parents who entered the arena.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {reviews.map((rev, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="glass-card p-8 rounded-2xl border-white/5 bg-[#0A1628]/30 backdrop-blur-xl relative hover:border-white/10 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              style={{
                boxShadow: `0 0 20px ${rev.glow}`
              }}
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                  <Quote className="w-5 h-5 text-[#00D4FF]" />
                </div>
                <p className="text-white/80 font-light text-base leading-relaxed italic mb-8">
                  "{rev.quote}"
                </p>
              </div>

              <div className="border-t border-white/10 pt-4 mt-auto">
                <h4 className="text-white font-bold tracking-wide">{rev.name}</h4>
                <p className="text-xs text-white/50">{rev.role}</p>
                <p className="text-xs text-[#00D4FF] font-semibold mt-0.5">{rev.school}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
