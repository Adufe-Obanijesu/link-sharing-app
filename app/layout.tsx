import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Link Sharing App",
  description: "Link sharing made easy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="pb-8">
        {children}
      </body>
    </html>
  );
}
