import Hero from "@/components/landing/Hero";
import EventShowcase from "@/components/landing/EventShowcase";
import WhyJoin from "@/components/landing/WhyJoin";
import Timeline from "@/components/landing/Timeline";
import Pricing from "@/components/landing/Pricing";
import Testimonials from "@/components/landing/Testimonials";
import FAQ from "@/components/landing/FAQ";
import TypographyFooter from "@/components/landing/TypographyFooter";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050816] overflow-hidden">
      <Hero />
      <EventShowcase />
      <WhyJoin />
      <Timeline />
      <Pricing />
      <Testimonials />
      <FAQ />
      <TypographyFooter />
    </main>
  );
}
