import { Inter } from "next/font/google";
import "../globals.css";
import "../slideStyle.css";

import Navbar from "@/components/client/common/Navbar";
import Footer from "@/components/client/common/Footer";
import Trust from "@/components/client/common/Trust";
import RequireAuthProvider from "@/context/RequireAuth";
import LocalCartProvider from "@/context/cartContext";
import ProductContextProvider from "@/context/ProductContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return <html lang="en">
    <body className={inter.className}>
      <RequireAuthProvider>
        <LocalCartProvider>
          <ProductContextProvider>
            <Navbar />
            <div className="mx-4">{children}</div>
            <Trust />
            <Footer />
          </ProductContextProvider>
        </LocalCartProvider>
      </RequireAuthProvider>
    </body>
  </html>

}
