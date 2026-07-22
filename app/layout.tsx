import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./styles/input.css";

const paulGrotesk = localFont({
  src: [
    {
      path: "./fonts/paul-grotesk/PaulGrotesk-Regular-Trail.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/paul-grotesk/PaulGrotesk-Thin-Trail.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "./fonts/paul-grotesk/PaulGrotesk-Bold-Trail.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-paul-grotesk",
});

const kamerik105 = localFont({
  src: [
    {
      path: "./fonts/kamerik-105/Kamerik105-Book.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/kamerik-105/Kamerik105-Light.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "./fonts/kamerik-105/Kamerik105-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-kamerik105",
});

export const metadata: Metadata = {
  title: "Career OS — Proof-of-Work Marketplace",
  description: "Hiring based on real evidence, not resumes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${paulGrotesk.variable} ${kamerik105.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
