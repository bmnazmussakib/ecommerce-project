import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import ReduxProvider from "@/redux/ReduxProvider";
import Footer from "@/components/Footer";

// Metadata for SEO
export const metadata = {
  title: "Falcon - Your Online Store",
  description: "Shop for electronics, home appliances, and more at Falcon.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body>
        <ReduxProvider>
          <Toaster position="top-center" reverseOrder={false} />
          <Navbar />
          {children}
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}