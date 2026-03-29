import "./globals.css";

export const metadata = {
  title: { default: "Mi Medio Digital", template: "%s · Mi Medio Digital" },
  description: "Noticias generadas automaticamente con inteligencia artificial",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  );
}
