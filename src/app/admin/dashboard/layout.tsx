"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { LayoutDashboard, Users, LogOut, Settings, Menu, X } from "lucide-react";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const res = await fetch("/api/admin/logout", {
        method: "POST",
      });
      if (res.ok) {
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const navItems = [
    {
      name: "Overview",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
      iconColor: "text-[#00D4FF]",
    },
    {
      name: "Registrations",
      href: "/admin/dashboard/registrations",
      icon: Users,
      iconColor: "text-[#7C3AED]",
    },
    {
      name: "Settings",
      href: "#",
      icon: Settings,
      iconColor: "text-white/60",
    },
  ];

  return (
    <div className="min-h-screen bg-[#050816] flex flex-col md:flex-row">
      {/* Mobile Top Bar */}
      <header className="md:hidden flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0A1628]/80 backdrop-blur-md sticky top-0 z-50 w-full">
        <h2 className="text-xl font-bold text-white font-space-grotesk tracking-wide">
          <span className="text-[#00D4FF]">Admin</span> Panel
        </h2>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-white hover:text-[#00D4FF] focus:outline-none transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-[#0A1628]/95 backdrop-blur-xl border-b border-white/10 p-4 flex flex-col gap-2 z-50 animate-in slide-in-from-top duration-200">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-white/5 text-white border border-white/10"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${item.iconColor}`} />
                  {item.name}
                </Link>
              );
            })}
            <hr className="border-white/10 my-1" />
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors w-full text-left font-medium"
            >
              <LogOut className="w-5 h-5" />
              {isLoggingOut ? "Logging out..." : "Log Out"}
            </button>
          </div>
        )}
      </header>

      {/* Desktop Sidebar */}
      <aside className="w-full md:w-64 border-r border-white/10 bg-[#0A1628]/50 backdrop-blur-xl flex flex-col hidden md:flex">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-bold text-white font-space-grotesk tracking-wide">
            <span className="text-[#00D4FF]">Admin</span> Panel
          </h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-white/5 text-white border border-white/5"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className={`w-5 h-5 ${item.iconColor}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors w-full text-left font-medium disabled:opacity-50"
          >
            <LogOut className="w-5 h-5" />
            {isLoggingOut ? "Logging out..." : "Log Out"}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto h-screen relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1E6FFF]/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="p-4 sm:p-8 relative z-10">{children}</div>
      </main>
    </div>
  );
}
