import type { Metadata } from "next";
import { Inter, Space_Grotesk, Bebas_Neue } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas-neue",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Welcome on board",
  description: "Show your creativity, intelligence, innovation and talent in the most exciting school competition event.",
  openGraph: {
    title: "Welcome on board",
    description: "Ultra premium school competition platform",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${spaceGrotesk.variable} ${bebasNeue.variable} antialiased`} suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
