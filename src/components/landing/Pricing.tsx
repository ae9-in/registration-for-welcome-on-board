"use client";

import { motion } from "framer-motion";
import { Check, Zap } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export default function Pricing() {
  return (
    <section className="py-24 relative z-10 bg-[#050816]">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold font-space-grotesk mb-4"
          >
            Simple, Transparent <span className="text-[#00D4FF]">Pricing</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/60 max-w-2xl mx-auto text-lg"
          >
            Choose single events or grab the all-access bundle for maximum value.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-center">
          {/* Single Event */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="glass-card border-white/10 p-8 h-full">
              <h3 className="text-2xl font-bold text-white mb-2">Single Event</h3>
              <p className="text-white/50 mb-6">Perfect for specialists</p>
              <div className="mb-8">
                <span className="text-5xl font-bold text-white">₹333</span>
                <span className="text-white/50"> / event</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-white/80">
                  <Check className="w-5 h-5 text-primary" /> Participate in 1 to 3 events
                </li>
                <li className="flex items-center gap-3 text-white/80">
                  <Check className="w-5 h-5 text-primary" /> E-Certificate of Participation
                </li>
                <li className="flex items-center gap-3 text-white/80">
                  <Check className="w-5 h-5 text-primary" /> Access to live leaderboard
                </li>
              </ul>
              <Link
                href="/register"
                className="block w-full py-3 text-center rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors border border-white/10"
              >
                Register Now
              </Link>
            </Card>
          </motion.div>

          {/* Bundle */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-[#00D4FF] via-[#1E6FFF] to-[#7C3AED] rounded-2xl blur opacity-30 animate-pulse" />
            <Card className="relative glass-card border-[#00D4FF]/30 p-8 h-full bg-[#050816]/80">
              <div className="absolute top-0 right-0 bg-gradient-to-r from-[#00D4FF] to-[#1E6FFF] text-white text-xs font-bold px-4 py-1 rounded-bl-lg rounded-tr-lg uppercase tracking-wider">
                Best Value
              </div>
              
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-6 h-6 text-[#00D4FF] fill-[#00D4FF]/20" />
                <h3 className="text-2xl font-bold text-white">All-Access Bundle</h3>
              </div>
              
              <p className="text-white/50 mb-6">The ultimate challenger package</p>
              <div className="mb-8 flex items-baseline gap-2">
                <span className="text-5xl font-bold text-white">₹1000</span>
                <span className="text-white/50 line-through text-lg">₹1998</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-white">
                  <Check className="w-5 h-5 text-[#00D4FF]" /> Participate in all 6 events
                </li>
                <li className="flex items-center gap-3 text-white">
                  <Check className="w-5 h-5 text-[#00D4FF]" /> Premium E-Certificate
                </li>
                <li className="flex items-center gap-3 text-white">
                  <Check className="w-5 h-5 text-[#00D4FF]" /> Priority Support
                </li>
                <li className="flex items-center gap-3 text-white">
                  <Check className="w-5 h-5 text-[#00D4FF]" /> Exclusive Swag Kit Eligibility
                </li>
              </ul>
              <Link
                href="/register?bundle=true"
                className="block w-full py-3 text-center rounded-lg bg-gradient-to-r from-[#00D4FF] to-[#1E6FFF] hover:opacity-90 text-white font-medium transition-opacity shadow-[0_0_20px_rgba(0,212,255,0.4)]"
              >
                Claim Bundle
              </Link>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
