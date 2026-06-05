import type { Metadata } from "next";
import { Fira_Sans, Fira_Sans_Extra_Condensed, Montserrat } from "next/font/google";
import "./globals.css";

const firaSans = Fira_Sans({
  variable: "--font-fira-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const firaSansCondensed = Fira_Sans_Extra_Condensed({
  variable: "--font-fira-condensed",
  subsets: ["latin"],
  weight: ["800"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "UAGC Prototypes",
  description: "University of Arizona Global Campus - Page Prototypes",
  icons: {
    icon: [
      { url: "/seo/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/seo/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/seo/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${firaSans.variable} ${firaSansCondensed.variable} ${montserrat.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>{children}</body>
    </html>
  );
}
