"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Edit3, Calculator, Palette, Cpu, PenTool, CheckCircle2, AlertCircle, Zap, ChevronDown } from "lucide-react";
import confetti from "canvas-confetti";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const eventsList = [
  { id: "quiz", title: "Quiz", icon: Brain, gradient: "from-blue-500 to-cyan-400", glow: "rgba(59,130,246,0.35)", accent: "#3B82F6" },
  { id: "spell-bee", title: "Spell Bee", icon: Edit3, gradient: "from-purple-500 to-pink-400", glow: "rgba(168,85,247,0.35)", accent: "#A855F7" },
  { id: "math", title: "Math Challenge", icon: Calculator, gradient: "from-green-500 to-emerald-400", glow: "rgba(34,197,94,0.35)", accent: "#22C55E" },
  { id: "art", title: "Art & Craft", icon: Palette, gradient: "from-orange-500 to-yellow-400", glow: "rgba(249,115,22,0.35)", accent: "#F97316" },
  { id: "ai", title: "AI Using Tech", icon: Cpu, gradient: "from-indigo-500 to-blue-500", glow: "rgba(99,102,241,0.35)", accent: "#6366F1" },
  { id: "handwriting", title: "Handwriting", icon: PenTool, gradient: "from-rose-500 to-red-400", glow: "rgba(244,63,94,0.35)", accent: "#F43F5E" },
];

const formSchema = z.object({
  studentName: z.string().min(2, "Name is required").max(50),
  age: z.number().min(5).max(20),
  schoolName: z.string().min(2, "School name is required").max(100),
  standard: z.string().min(1, "Class/Standard is required"),
  parentName: z.string().min(2, "Parent name is required").max(50),
  parentContact: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((val) => !val || /^\d{10}$/.test(val), "Must be a valid 10-digit phone number"),
  gender: z.enum(["Male", "Female"], { message: "Gender is required" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function RegistrationForm() {
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [showBundleOffer, setShowBundleOffer] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successData, setSuccessData] = useState<{ id: string; amount: number } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const eventCount = selectedEvents.length;
  const isBundle = eventCount === 6;
  const totalAmount = isBundle ? 1000 : eventCount * 333;
  const savings = isBundle ? 6 * 333 - 1000 : 0;

  useEffect(() => {
    // Auto bundle logic
    if (eventCount >= 4 && eventCount < 6) {
      setShowBundleOffer(true);
    } else {
      setShowBundleOffer(false);
    }
  }, [eventCount]);

  const toggleEvent = (id: string) => {
    setSelectedEvents((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  const acceptBundle = () => {
    setSelectedEvents(eventsList.map((e) => e.id));
    setShowBundleOffer(false);
  };

  const onSubmit = async (data: FormValues) => {
    if (selectedEvents.length === 0) {
      alert("Please select at least one event.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          selectedEvents,
        }),
      });

      const result = await response.json();

      if (result.success) {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00D4FF', '#1E6FFF', '#7C3AED']
        });
        setSuccessData({ id: result.registrationId, amount: result.totalAmount });
      } else {
        alert(result.error || "Registration failed");
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto py-6 px-4 relative">
      <div className="flex-1 space-y-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
          <span className="inline-block py-1 px-3 rounded-full border border-[#00D4FF]/20 bg-[#00D4FF]/5 text-xs font-semibold uppercase tracking-wider text-[#00D4FF] border-glow">
            Secure Your Arena
          </span>
          <h1 className="text-4xl md:text-5xl font-space-grotesk font-bold text-white text-glow leading-tight">
            JOIN THE <span className="gradient-text">COMPETITION</span>
          </h1>
          <p className="text-white/60 font-light text-lg">Fill out the form below to secure your ultimate spot.</p>
        </motion.div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 glass-card p-8 rounded-2xl border-white/5 shadow-[0_0_50px_rgba(0,0,0,0.3)]">
          {/* Personal Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="studentName" className="text-white/90 text-sm font-semibold tracking-wide">Student Name</Label>
              <Input id="studentName" className="h-12 px-4 py-3 bg-white/5 border-white/10 text-white rounded-xl focus:border-[#00D4FF] focus:ring-2 focus:ring-[#00D4FF]/20 focus:bg-white/10 transition-all duration-300" {...register("studentName")} />
              {errors.studentName && <span className="text-red-400 text-sm flex items-center gap-1 mt-1"><AlertCircle className="w-3.5 h-3.5" />{errors.studentName.message}</span>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="age" className="text-white/90 text-sm font-semibold tracking-wide">Age</Label>
              <Input id="age" type="number" className="h-12 px-4 py-3 bg-white/5 border-white/10 text-white rounded-xl focus:border-[#00D4FF] focus:ring-2 focus:ring-[#00D4FF]/20 focus:bg-white/10 transition-all duration-300" {...register("age", { valueAsNumber: true })} />
              {errors.age && <span className="text-red-400 text-sm flex items-center gap-1 mt-1"><AlertCircle className="w-3.5 h-3.5" />{errors.age.message}</span>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="schoolName" className="text-white/90 text-sm font-semibold tracking-wide">School Name</Label>
              <Input id="schoolName" className="h-12 px-4 py-3 bg-white/5 border-white/10 text-white rounded-xl focus:border-[#00D4FF] focus:ring-2 focus:ring-[#00D4FF]/20 focus:bg-white/10 transition-all duration-300" {...register("schoolName")} />
              {errors.schoolName && <span className="text-red-400 text-sm flex items-center gap-1 mt-1"><AlertCircle className="w-3.5 h-3.5" />{errors.schoolName.message}</span>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="standard" className="text-white/90 text-sm font-semibold tracking-wide">Class / Standard</Label>
              <Input id="standard" className="h-12 px-4 py-3 bg-white/5 border-white/10 text-white rounded-xl focus:border-[#00D4FF] focus:ring-2 focus:ring-[#00D4FF]/20 focus:bg-white/10 transition-all duration-300" {...register("standard")} />
              {errors.standard && <span className="text-red-400 text-sm flex items-center gap-1 mt-1"><AlertCircle className="w-3.5 h-3.5" />{errors.standard.message}</span>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-2">
              <Label htmlFor="parentName" className="text-white/90 text-sm font-semibold tracking-wide">Parent Name</Label>
              <Input id="parentName" className="h-12 px-4 py-3 bg-white/5 border-white/10 text-white rounded-xl focus:border-[#00D4FF] focus:ring-2 focus:ring-[#00D4FF]/20 focus:bg-white/10 transition-all duration-300" {...register("parentName")} />
              {errors.parentName && <span className="text-red-400 text-sm flex items-center gap-1 mt-1"><AlertCircle className="w-3.5 h-3.5" />{errors.parentName.message}</span>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="parentContact" className="text-white/90 text-sm font-semibold tracking-wide">Parent Contact (10 digits) (Optional)</Label>
              <Input id="parentContact" className="h-12 px-4 py-3 bg-white/5 border-white/10 text-white rounded-xl focus:border-[#00D4FF] focus:ring-2 focus:ring-[#00D4FF]/20 focus:bg-white/10 transition-all duration-300" {...register("parentContact")} />
              {errors.parentContact && <span className="text-red-400 text-sm flex items-center gap-1 mt-1"><AlertCircle className="w-3.5 h-3.5" />{errors.parentContact.message}</span>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="gender" className="text-white/90 text-sm font-semibold tracking-wide">Gender</Label>
            <div className="relative">
              <select
                id="gender"
                defaultValue=""
                className="w-full h-12 pl-4 pr-10 bg-white/5 border border-white/10 text-white rounded-xl focus:border-[#00D4FF] focus:ring-2 focus:ring-[#00D4FF]/20 focus:bg-white/10 transition-all duration-300 outline-none appearance-none cursor-pointer"
                {...register("gender")}
              >
                <option value="" disabled className="text-white/40 bg-[#050816]">Select Gender</option>
                <option value="Male" className="text-white bg-[#050816]">Male</option>
                <option value="Female" className="text-white bg-[#050816]">Female</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">
                <ChevronDown className="w-5 h-5" />
              </div>
            </div>
            {errors.gender && <span className="text-red-400 text-sm flex items-center gap-1 mt-1"><AlertCircle className="w-3.5 h-3.5" />{errors.gender.message}</span>}
          </div>

          {/* Event Selection */}
          <div className="pt-8 border-t border-white/10">
            <h3 className="text-2xl font-bold font-space-grotesk text-white mb-2">Select Your Arenas</h3>
            <p className="text-white/40 text-sm mb-6 font-light">Choose one or more fields of competition. Enter all six for maximum benefits.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {eventsList.map((event) => {
                const isSelected = selectedEvents.includes(event.id);
                return (
                  <motion.div
                    key={event.id}
                    whileHover={{ scale: 1.02, translateY: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggleEvent(event.id)}
                    className={`cursor-pointer rounded-xl p-4 flex items-center gap-4 border transition-all duration-300 ${
                      isSelected 
                        ? `bg-white/5 border-glow` 
                        : "bg-white/5 border-white/10 hover:border-white/30"
                    }`}
                    style={isSelected ? {
                      borderColor: event.accent,
                      boxShadow: `0 0 20px ${event.glow}`
                    } : undefined}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 bg-gradient-to-br ${event.gradient} text-white`}>
                      <event.icon className="w-5 h-5" />
                    </div>
                    <span className="text-white font-medium flex-1">{event.title}</span>
                    <div 
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300`}
                      style={{
                        borderColor: isSelected ? event.accent : "rgba(255, 255, 255, 0.3)",
                        backgroundColor: isSelected ? event.accent : "transparent"
                      }}
                    >
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-black font-bold" />}
                    </div>
                  </motion.div>
                );
              })}
            </div>
            {selectedEvents.length === 0 && <span className="text-red-400 text-sm mt-3 block flex items-center gap-1 font-medium"><AlertCircle className="w-4 h-4" />Select at least one event to proceed.</span>}
          </div>
        </form>
      </div>

      {/* Sticky Summary Panel */}
      <div className="w-full lg:w-[400px]">
        <div className="sticky top-8 space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card rounded-2xl p-6 border-white/5 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00D4FF] rounded-full blur-3xl opacity-5 pointer-events-none" />
            <h3 className="text-xl font-bold text-white mb-6 font-space-grotesk border-b border-white/10 pb-4">Registration Summary</h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-white/70">
                <span className="font-light">Selected Events</span>
                <span className="font-bold text-white text-lg">{eventCount}</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span className="font-light">Pricing Model</span>
                <span className={`font-semibold px-2 py-0.5 rounded text-xs tracking-wider uppercase ${isBundle ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-blue-500/10 text-blue-400 border border-blue-500/20"}`}>
                  {isBundle ? "All-In Bundle" : "Single Entry"}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 mb-8">
              <div className="flex justify-between items-end mb-2">
                <span className="text-white/80 font-medium">Total Amount</span>
                <span className="text-4xl font-bold text-[#00D4FF] font-space-grotesk">₹{totalAmount}</span>
              </div>
              {savings > 0 && (
                <div className="text-right text-emerald-400 text-sm font-semibold tracking-wide animate-pulse">
                  Awesome! Saved ₹{savings} with Bundle!
                </div>
              )}
            </div>

            <button
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting || selectedEvents.length === 0}
              className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-primary via-[#00D4FF] to-[#7C3AED] hover:scale-[1.02] active:scale-[0.98] disabled:scale-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 relative overflow-hidden border-glow group"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isSubmitting ? "Processing..." : "Complete Registration"}
              </span>
            </button>
          </motion.div>

          <AnimatePresence>
            {showBundleOffer && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="glass-card border-[#7C3AED]/30 p-6 rounded-2xl bg-gradient-to-br from-[#7C3AED]/10 to-[#1E6FFF]/5 relative overflow-hidden shadow-xl"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#7C3AED] rounded-full blur-3xl opacity-20 pointer-events-none" />
                <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-400 animate-bounce" /> Super Saver Bundle!
                </h4>
                <p className="text-white/80 text-sm mb-4 leading-relaxed font-light">
                  You selected <span className="font-semibold text-white">{eventCount} arenas</span>. Unlock <span className="font-semibold text-white">all 6 arenas</span> for just <span className="font-bold text-[#00D4FF]">₹1000</span> total!
                </p>
                <button
                  onClick={acceptBundle}
                  className="w-full py-3 bg-[#7C3AED]/20 hover:bg-[#7C3AED]/30 hover:scale-[1.02] active:scale-[0.98] border border-[#7C3AED]/50 rounded-xl text-white font-semibold transition-all duration-300 shadow-[0_0_15px_rgba(124,58,237,0.2)]"
                >
                  Switch to Bundle (Save ₹{6 * 333 - 1000})
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Success Modal */}
      <Dialog open={!!successData} onOpenChange={() => setSuccessData(null)}>
        <DialogContent className="glass-card border-white/10 bg-[#060816]/95 text-white sm:max-w-md backdrop-blur-2xl rounded-2xl shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-space-grotesk text-center text-[#00D4FF] text-glow">Registration Successful!</DialogTitle>
            <DialogDescription className="text-center text-white/70 font-light">
              You are all set for the ultimate competition.
            </DialogDescription>
          </DialogHeader>
          {successData && (
            <div className="mt-6 relative bg-gradient-to-br from-[#1E6FFF]/15 to-[#7C3AED]/15 p-6 rounded-xl border border-white/5 text-center overflow-hidden">
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#00D4FF] rounded-full blur-3xl opacity-10" />
              <p className="text-white/40 mb-2 text-xs uppercase tracking-widest font-semibold">Your Ticket ID</p>
              <p className="text-3xl font-bold font-mono tracking-widest text-white mb-6 drop-shadow-md text-glow">
                {successData.id}
              </p>
              <div className="flex justify-between items-center px-4 py-3 bg-black/40 rounded-lg backdrop-blur-sm border border-white/5">
                <span className="text-white/60 text-sm font-light">Amount Paid</span>
                <span className="text-xl font-bold text-emerald-400">₹{successData.amount}</span>
              </div>
            </div>
          )}
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => window.location.href = '/'}
              className="px-8 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold transition-all border border-white/10 hover:border-white/20 active:scale-95"
            >
              Back to Home
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
