import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";

const kanit = Kanit({
  variable: "--font-kanit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zaw Wana -- Platform / Site Reliability Engineer",
  description:
    "Zaw Wana is a Certified Kubernetes Administrator and Platform / Site Reliability Engineer in Singapore. Explore production platforms, GitOps delivery, IoT systems, and engineering experience.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${kanit.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#0C0C0C]">{children}</body>
    </html>
  );
}
