import "./globals.css";
import Header from "./components/Header";

export const metadata = {
  title: "Mizān",
  description: "Your Assessment Companion",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
