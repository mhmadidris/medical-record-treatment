import type { Metadata } from "next";
import { Poppins } from "next/font/google";
// import "./globals.css";
import { Providers } from './providers'
import { Suspense } from "react";
import Loading from "@/components/Loading";

const poppins = Poppins({ subsets: ["latin"], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] });

export const metadata: Metadata = {
  title: "Medical Treatment Record",
  description: "Medical Treatment Record",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Suspense fallback={<Loading />}>
          <Providers>
            {children}
          </Providers>
        </Suspense>
      </body>
    </html>
  );
}
