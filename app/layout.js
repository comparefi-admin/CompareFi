import './globals.css';
import { Inter, Work_Sans } from "next/font/google";

export const metadata = {
  title: 'CompareFi - Compare Financial Products',
  description: 'Compare credit cards, savings accounts, loans, and more. Find the best financial products for your needs.',
};

export const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-work-sans",
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${workSans.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
