import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gowtham Velusamy | QA Test Engineer",
  description:
    "Personal portfolio of Gowtham Velusamy, QA Test Engineer experienced in Manual Testing, Automation, and ML-driven platforms.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
