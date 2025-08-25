import "./globals.css";

export const metadata = {
  title: "Arrora RBF",
  description: "Deal flow MVP for Arrora RBF",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
