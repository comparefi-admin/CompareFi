import './globals.css';
import { Inter, Work_Sans } from "next/font/google";

export const metadata = {
  title: "CompareFi – Compare LAS, LAMF & Financial Products in India",
  description:
    "CompareFi is an independent financial comparison platform to compare Loan Against Shares (LAS), Loan Against Mutual Funds (LAMF), Margin Trading Facility (MTF) and more in India.",
  keywords: [
    "CompareFi",
    "compare loans India",
    "loan against shares",
    "loan against mutual funds",
    "LAS comparison",
    "LAMF comparison",
    "MTF comparison",
  ],
  alternates: {
    canonical: "https://comparefi.in",
  },
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
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "CompareFi",
              url: "https://comparefi.in",
              description:
                "Independent financial comparison platform for LAS, LAMF and investment products in India",
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
