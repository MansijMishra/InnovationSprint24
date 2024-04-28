import "./globals.css";

export const metadata = {
  title: "Innovation Sprint",
  description: "Our project for the 2024 Zahn Innovation Sprint",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
