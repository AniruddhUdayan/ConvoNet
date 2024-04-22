"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { CssBaseline } from "@mui/material";
import { Suspense } from "react";
import {Loaders} from "@/components/layout/Loaders";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { Toaster } from "react-hot-toast";
import { SocketProvider } from "@/socket";



const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  

  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <Suspense fallback={<Loaders />}>
            <CssBaseline />
            <SocketProvider>
            <div onContextMenu={(e) => e.preventDefault()}><Toaster position="bottom-center"/> {children}</div>
            </SocketProvider>
          </Suspense>
        </Provider>
      </body>
    </html>
  );
}
