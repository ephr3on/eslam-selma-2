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
