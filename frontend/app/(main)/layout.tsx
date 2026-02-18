import type { Metadata } from "next";
import "../globals.css";
import Header from "../components/header";
import Footer from "../components/footer";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
