import type { Metadata } from "next";
import "../globals.css";
import Header from "../components/header";
import Footer from "../components/footer";
import { QueryProvider } from "../providers/QueryProvider";
import { defaultMetadata } from "../lib/constants";

export const metadata: Metadata = defaultMetadata;

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <Header />
      <main>{children}</main>
      <Footer />
    </QueryProvider>
  );
}
