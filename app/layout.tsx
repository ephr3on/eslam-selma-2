import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "إسلام و سلمى — دعوة الزفاف",
  description: "يسرّنا أن ندعوكم لمشاركتنا فرحة زفافنا — الجمعة ١١ سبتمبر ٢٠٢٦",
  manifest: "/site.webmanifest",
  openGraph: {
    title: "🤍 دعوة حفل زفاف إسلام وسلمى 🤍",
    // Real newlines render inside the content attribute exactly as &#10; does —
    // React escapes a literal "&#10;" string into "&amp;#10;", which would show
    // the entity as visible text in the preview.
    // ⁧ / ⁩ are RTL isolate marks; they keep ﴿ ﴾ on the correct
    // sides of the verse regardless of the surrounding text direction.
    description:
      "\n﷽\n" +
      "⁧﴿وَجَعَلَ بَيْنَكُم مَوَدَّةً وَرَحْمَةً﴾⁩\n\n" +
      "بكل الحب، يسعدنا أن تشاركونا فرحة زفافنا ✨\n\n" +
      "♥︎ الجمعة، 11 سبتمبر 2026\n" +
      "♥︎ الساعة 07:00 مساءً\n" +
      "♥︎ فندق بوليفارد عُمان\n",
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
