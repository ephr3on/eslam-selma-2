import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="ar" dir="rtl">
      <body className="min-h-screen overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
