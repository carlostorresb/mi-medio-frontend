import fs from "fs";
import path from "path";

export function cargarArticulos() {
  const carpeta = path.join(process.cwd(), "contenido");
  if (!fs.existsSync(carpeta)) return [];
  const ahora = new Date();
  return fs
    .readdirSync(carpeta)
    .filter((f) => f.endsWith(".json"))
    .map((archivo) => {
      const texto = fs.readFileSync(path.join(carpeta, archivo), "utf8");
      const data = JSON.parse(texto);
      return { ...data, slug: archivo.replace(".json", "") };
    })
    .filter((art) => {
      const fecha = new Date(art.fecha_generacion);
      const horas = (ahora - fecha) / (1000 * 60 * 60);
      const puntaje = art.puntuacion || art.puntuacion_editor || 0;
      if (puntaje >= 9) return horas < 48;
      if (puntaje >= 7) return horas < 24;
      return horas < 24;
    })
    .sort((a, b) => {
      const pa = b.puntuacion || b.puntuacion_editor || 0;
      const pb = a.puntuacion || a.puntuacion_editor || 0;
      if (pa !== pb) return pa - pb;
      return new Date(b.fecha_generacion) - new Date(a.fecha_generacion);
    });
}
