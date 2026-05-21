"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "Who can participate in these competitions?",
    answer: "Students aged between 5 and 20 years from any school/academy are eligible to participate. Ensure you fill in the correct school name and age during registration."
  },
  {
    question: "How does the pricing engine work?",
    answer: "A single event costs ₹333. If you register for 2 events it costs ₹666, and 3 events cost ₹999. If you select 4 or more events, our system will automatically recommend the Bundle package which unlocks all 6 events for a flat price of just ₹1000!"
  },
  {
    question: "How do I access my registration ticket ID?",
    answer: "Upon submitting the form successfully, a confetti success animation will launch, and a ticket modal will reveal showing your custom alphanumeric Registration Ticket ID. This will be required for workshop access and competition check-ins."
  },
  {
    question: "What happens after I complete registration?",
    answer: "Your details are securely indexed in our database. You will receive email/SMS reminders regarding phase-wise dates. The mentorship workshop phase begins on June 18, 2026, where you'll receive prep materials."
  },
  {
    question: "Can I edit my registered arenas later?",
    answer: "Once submitted, registrations are locked for evaluation. If you need to make urgent changes, please contact the event coordination desk through your parent contact number."
  }
];

function FAQItem({ question, answer, isOpen, onClick }: { question: string, answer: string, isOpen: boolean, onClick: () => void }) {
  return (
    <div className="border-b border-white/10 last:border-0 py-4">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-4 text-left group"
      >
        <span className="text-lg font-semibold text-white/90 group-hover:text-white group-hover:text-glow transition-all font-space-grotesk">
          {question}
        </span>
        <div className={`w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-primary/45 transition-colors ${isOpen ? "text-[#00D4FF]" : "text-white"}`}>
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </div>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-white/60 font-light text-sm leading-relaxed pb-6 pr-12">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 relative z-10 bg-[#050816] overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#7C3AED]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block py-1 px-3 rounded-full border border-primary/20 bg-primary/5 text-xs font-semibold uppercase tracking-wider text-primary mb-4">
            Support
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-space-grotesk mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg font-light">
            Everything you need to know about the registration, pricing, and timelines.
          </p>
        </div>

        <div className="max-w-3xl mx-auto glass-card bg-[#0A1628]/30 backdrop-blur-xl border-white/5 rounded-2xl p-6 sm:p-8 shadow-2xl">
          {faqs.map((faq, idx) => (
            <FAQItem
              key={idx}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === idx}
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
