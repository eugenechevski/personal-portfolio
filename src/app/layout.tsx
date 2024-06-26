"use client";

import "./globals.css";
import { Lato } from "next/font/google";
import { Providers } from "@/redux/providers";
import { SessionProvider } from "next-auth/react";
import { Analytics } from "@vercel/analytics/react";

import workerSrc from "../../pdf-worker.js";

import { pdfjs } from "react-pdf";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

const lato = Lato({
  weight: "400",
  subsets: ["latin-ext"],
  fallback: ["system-ui", "roboto", "arial"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="en">
        <head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="A personal portfolio website to showcase my experience and create the contact point for potential employers or business partners."
          />
          <title>Eugene Chevski - Software Engineer</title>
        </head>
        <body
          className={
            lato.className +
            " relative text-shadow purple-haze scroll-smooth hide-scrollbar snap-center snap-normal snap-mandatory max-h-max max-w-max"
          }
        >
          <SessionProvider>{children}</SessionProvider>
          <Analytics />
        </body>
      </html>
    </Providers>
  );
}
