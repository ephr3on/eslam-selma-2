import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "إسلام و سلمى — دعوة الزفاف",
  description: "يسرّنا أن ندعوكم لمشاركتنا فرحة زفافنا — الجمعة ١١ سبتمبر ٢٠٢٦",
  manifest: "/site.webmanifest",
  openGraph: {
    title: "إسلام و سلمى",
    description: "دعوة زفاف — فندق بوليفارد عمان",
    locale: "ar",
    images: ["https://eslam-selma-2.vercel.app/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="preload" as="image" href="/wedding-photo.jpg" />
        <link rel="preload" as="image" href="/eslam.jpg" />
        <link rel="preload" as="image" href="/selma.jpg" />
        <link rel="preload" as="image" href="/stamp.png" />
        <link rel="preload" as="audio" href="/background_music.mp3" />
      </head>
      <body className="min-h-screen overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
