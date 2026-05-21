"use client";

import { motion, Variants } from "framer-motion";
import { Award, Trophy, Sparkles, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const benefits = [
  {
    icon: Trophy,
    title: "Prestigious Awards",
    description: "Compete for grand cash prizes, custom trophies, and medals that acknowledge your unique excellence.",
    color: "from-amber-500 to-yellow-400",
    glow: "rgba(245,158,11,0.15)",
  },
  {
    icon: Award,
    title: "Official Certification",
    description: "Earn verified certificates recognized by leading institutions to elevate your student profile.",
    color: "from-blue-500 to-cyan-400",
    glow: "rgba(59,130,246,0.15)",
  },
  {
    icon: Sparkles,
    title: "Skill Acceleration",
    description: "Push your creativity, quick thinking, and analytical abilities to new cinematic heights.",
    color: "from-purple-500 to-pink-400",
    glow: "rgba(168,85,247,0.15)",
  },
  {
    icon: Users,
    title: "Elite Networking",
    description: "Connect with high-caliber peers and industry experts, paving the way for future collaborations.",
    color: "from-emerald-500 to-teal-400",
    glow: "rgba(16,185,129,0.15)",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 15,
    },
  },
};

export default function WhyJoin() {
  return (
    <section className="py-24 relative z-10 bg-[#050816] overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#7C3AED]/5 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block py-1 px-3 rounded-full border border-primary/20 bg-primary/5 text-xs font-semibold uppercase tracking-wider text-primary mb-4"
          >
            Benefits
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold font-space-grotesk mb-4"
          >
            Why You Must <span className="gradient-text">Join Us</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/60 max-w-2xl mx-auto text-lg font-light"
          >
            This isn't just another competition. It's a premium platform built to catapult your potential.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {benefits.map((benefit, idx) => (
            <motion.div key={idx} variants={cardVariants}>
              <Card 
                className="glass-card group relative overflow-hidden h-full border-white/5 bg-[#0A1628]/40 backdrop-blur-xl hover:border-white/20 transition-all duration-500"
                style={{
                  boxShadow: `0 4px 30px rgba(0,0,0,0.4)`
                }}
              >
                {/* Glow Overlay */}
                <div 
                  className={`absolute -inset-px bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} 
                  style={{ filter: "blur(20px)" }}
                />
                
                <CardContent className="p-8 relative z-10 flex flex-col h-full items-start">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-gradient-to-br ${benefit.color} bg-opacity-20 border border-white/10 group-hover:scale-110 transition-transform duration-500`}>
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-all">
                    {benefit.title}
                  </h3>
                  
                  <p className="text-white/60 leading-relaxed font-light text-sm flex-grow">
                    {benefit.description}
                  </p>
                </CardContent>
                
                {/* Underline glow */}
                <div className={`absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r ${benefit.color} group-hover:w-full transition-all duration-700 ease-out`} />
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
