'use client'
import { Inter } from "next/font/google";
import "./../globals.css";
import { CssBaseline } from "@mui/material";
import { Suspense } from "react";
import Loaders from "@/components/layout/Loaders";

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={<Loaders />}>
          <CssBaseline />
          {children}
        </Suspense>
      </body>
    </html>
  );
}
