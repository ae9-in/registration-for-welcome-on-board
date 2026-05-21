import RegistrationForm from "@/components/register/RegistrationForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-[#050816] overflow-hidden relative py-12">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-40"
      >
        <source
          src="https://res.cloudinary.com/dfonotyfb/video/upload/v1775585556/dds3_1_rqhg7x.mp4"
          type="video/mp4"
        />
      </video>

      {/* Overlays */}
      <div className="absolute inset-0 z-1 bg-gradient-to-b from-[#050816]/60 via-transparent to-[#050816] pointer-events-none" />
      <div className="absolute inset-0 z-1 bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.05)_0%,transparent_65%)] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-6 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Home
        </Link>
        
        <RegistrationForm />
      </div>
    </main>
  );
}
