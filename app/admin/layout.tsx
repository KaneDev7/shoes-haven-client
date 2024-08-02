import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SideBarAdmin from "@/components/admin/sidebar/SideBar.admin";
import "../globals.css";
import "../slideStyle.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayoutAdmin({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex relative">
          <SideBarAdmin />
          <div className="flex-1 px-10 ">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
