"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/admin/dashboard");
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center relative overflow-hidden px-4">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#1E6FFF]/20 blur-[150px] rounded-full pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card w-full max-w-md p-8 rounded-2xl relative z-10 border-white/10"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-space-grotesk font-bold text-white mb-2">Admin Access</h1>
          <p className="text-white/60">Enter your credentials to continue</p>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-200 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2 relative">
            <Mail className="absolute left-3 top-3 w-5 h-5 text-white/40" />
            <Input
              type="email"
              placeholder="Email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 text-white focus:border-[#00D4FF] h-11"
            />
          </div>

          <div className="space-y-2 relative">
            <Lock className="absolute left-3 top-3 w-5 h-5 text-white/40" />
            <Input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 text-white focus:border-[#00D4FF] h-11"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-11 rounded-lg font-bold text-[#050816] bg-[#00D4FF] hover:bg-white transition-colors disabled:opacity-50 shadow-[0_0_15px_rgba(0,212,255,0.4)]"
          >
            {isLoading ? "Authenticating..." : "Login to Dashboard"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
