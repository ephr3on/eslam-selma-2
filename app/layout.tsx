import type { Metadata } from "next";
import { Amiri, Cairo } from "next/font/google";
import "./globals.css";

const amiri = Amiri({
  weight: ["400", "700"],
  subsets: ["arabic", "latin"],
  variable: "--font-amiri",
  display: "swap",
  preload: true,
});

const cairo = Cairo({
  weight: ["300", "400", "500", "600"],
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "إسلام و سلمى — دعوة الزفاف",
  description: "يسرّنا أن ندعوكم لمشاركتنا فرحة زفافنا — الجمعة ١١ سبتمبر ٢٠٢٦",
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
    <html
      lang="ar"
      dir="rtl"
      className={`${amiri.variable} ${cairo.variable}`}
    >
      <body className="min-h-screen overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
