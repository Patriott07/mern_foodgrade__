
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Sidebar from "../components/Sidebar";

import { store } from '../redux/store';
import ProviderWrapper from '../redux/Provider';
import { Provider } from 'react-redux';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `Foodgrade | Dashboard`,
  description: "A Homepage where user can see list the best foodgrade",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProviderWrapper>
      <html lang="en">
        <head>
          <link rel="shortcut icon" href="https://static-00.iconduck.com/assets.00/next-js-icon-512x512-zuauazrk.png" type="image/x-icon" />
        </head>
        <body className={inter.className}>
          <div className="flex">
            <Sidebar />
            {/* <div className="w-full p-4 sm:p-16 lg:px-24 lg:py-24"> */}
            {/* <div className="w-full"> */}
              {children}
            {/* </div> */}
          </div>
        </body>
      </html>
    </ProviderWrapper>
  );
}
