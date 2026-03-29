import fs from "fs";
import path from "path";
import Link from "next/link";

function cargarArticulos() {
  const carpeta = path.join(process.cwd(), "contenido");
  if (!fs.existsSync(carpeta)) return [];
  return fs
    .readdirSync(carpeta)
    .filter((f) => f.endsWith(".json"))
    .map((archivo) => {
      const texto = fs.readFileSync(path.join(carpeta, archivo), "utf8");
      const data = JSON.parse(texto);
      return { ...data, slug: archivo.replace(".json", "") };
    })
    .sort((a, b) => new Date(b.fecha_generacion) - new Date(a.fecha_generacion));
}

const SECCIONES = {
  tecnologia:     { label: "Tecnologia",     color: "bg-blue-100 text-blue-800" },
  economia:       { label: "Economia",       color: "bg-green-100 text-green-800" },
  ciberseguridad: { label: "Ciberseguridad", color: "bg-red-100 text-red-800" },
  politica:       { label: "Politica",       color: "bg-yellow-100 text-yellow-800" },
};

export default function Portada() {
  const articulos = cargarArticulos();
  const destacado = articulos[0];
  const resto = articulos.slice(1);

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Mi Medio Digital</h1>
            <p className="text-xs text-gray-500">Noticias generadas con IA</p>
          </div>
          <nav className="hidden md:flex gap-4 text-sm text-gray-600">
            {Object.entries(SECCIONES).map(([key, { label }]) => (
              <Link key={key} href={`/seccion/${key}`} className="hover:text-gray-900">{label}</Link>
            ))}
          </nav>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {articulos.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <p className="text-xl">Aun no hay articulos publicados.</p>
            <p className="text-sm mt-2">Ejecuta el agente periodista para generar contenido.</p>
          </div>
        ) : (
          <>
            {destacado && (
              <Link href={`/articulo/${destacado.slug}`} className="block mb-10 group">
                <div className="bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow p-8">
                  <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 ${SECCIONES[destacado.seccion]?.color ?? "bg-gray-100 text-gray-700"}`}>
                    {SECCIONES[destacado.seccion]?.label ?? destacado.seccion}
                  </span>
                  <h2 className="text-3xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors leading-tight mb-3">
                    {destacado.titular}
                  </h2>
                  <p className="text-lg text-gray-500">{destacado.subtitulo}</p>
                </div>
              </Link>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resto.map((art) => (
                <Link key={art.slug} href={`/articulo/${art.slug}`}
                  className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md transition-shadow group block">
                  <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-3 ${SECCIONES[art.seccion]?.color ?? "bg-gray-100 text-gray-700"}`}>
                    {SECCIONES[art.seccion]?.label ?? art.seccion}
                  </span>
                  <h3 className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors leading-snug mb-2">
                    {art.titular}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2">{art.subtitulo}</p>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
