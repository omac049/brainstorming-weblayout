import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0C234B",
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
      <head>
        <script
          src="https://mcp.figma.com/mcp/html-to-design/capture.js"
          async
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){if(!location.hash.includes('figmacapture'))return;document.documentElement.classList.add('figma-capture');function revealAll(){document.querySelectorAll('.reveal-section,.scroll-reveal').forEach(function(el){el.classList.add('is-visible');});document.querySelectorAll('img').forEach(function(img){img.style.opacity='1';img.style.visibility='visible';});document.querySelectorAll('video').forEach(function(v){v.pause();v.style.display='none';});document.querySelectorAll('[aria-hidden="true"]').forEach(function(el){if(el.querySelector('img')){el.style.opacity='1';el.removeAttribute('aria-hidden');}});}function waitForImages(){return Promise.all(Array.from(document.images).map(function(img){if(img.complete&&img.naturalWidth>0)return Promise.resolve();return new Promise(function(res){img.addEventListener('load',res,{once:true});img.addEventListener('error',res,{once:true});setTimeout(res,8000);});}));}if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',revealAll);}else{revealAll();}window.addEventListener('load',function(){revealAll();waitForImages().then(function(){var y=0;var step=Math.max(400,window.innerHeight*0.8);var id=setInterval(function(){y+=step;window.scrollTo(0,y);revealAll();if(y>=document.body.scrollHeight){clearInterval(id);window.scrollTo(0,0);revealAll();}},120);});});})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>{children}</body>
    </html>
  );
}
