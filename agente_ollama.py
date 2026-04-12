import json, re, base64, os, urllib.request, urllib.parse, http.client, html
from datetime import datetime
from pathlib import Path

def extraer_og_image(url, timeout=8):
    """
    Intenta obtener og:image del artículo original.
    Devuelve la URL de la imagen o cadena vacía si falla.
    """
    try:
        req = urllib.request.Request(
            url,
            headers={
                "User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1)",
                "Accept": "text/html",
            }
        )
        with urllib.request.urlopen(req, timeout=timeout) as r:
            # Leer solo los primeros 50KB para encontrar las meta tags sin bajar todo
            chunk = r.read(50_000).decode("utf-8", errors="ignore")

        # Busca og:image
        for pattern in [
            r'<meta[^>]+property=["\']og:image["\'][^>]+content=["\']([^"\']+)["\']',
            r'<meta[^>]+content=["\']([^"\']+)["\'][^>]+property=["\']og:image["\']',
            r'<meta[^>]+name=["\']twitter:image["\'][^>]+content=["\']([^"\']+)["\']',
        ]:
            m = re.search(pattern, chunk, re.IGNORECASE)
            if m:
                img_url = m.group(1).strip()
                if img_url.startswith("http"):
                    return img_url
    except Exception:
        pass
    return ""

GITHUB_TOKEN = os.environ.get("GITHUB_TOKEN", "")
GITHUB_REPO = "carlostorresb/mi-medio-digital"
GITHUB_BRANCH = "main"

MEDIASTACK_KEY = "b17d7c1839695a1964b1970fb8137365"

SECCIONES = {
    "el_pais": {
        "nombre": "El Pais",
        "categories": "general",
        "countries": "pe",
        "languages": "es",
        "keywords": "",
        "estilo": "Eres periodista peruano. Cubres noticias nacionales de Peru. Escribes en español peruano neutral.",
    },
    "internacional": {
        "nombre": "Internacional",
        "categories": "general",
        "countries": "",
        "languages": "es,en",
        "keywords": "",
        "estilo": "Eres corresponsal internacional. Cubres noticias del mundo con enfoque en Latinoamerica.",
    },
    "economia": {
        "nombre": "Economia",
        "categories": "business",
        "countries": "pe,us,ar,cl,co,mx",
        "languages": "es,en",
        "keywords": "",
        "estilo": "Eres periodista economico peruano. Cubres finanzas y negocios.",
    },
    "sociedad": {
        "nombre": "Sociedad",
        "categories": "general",
        "countries": "pe",
        "languages": "es",
        "keywords": "sociedad,educacion,justicia",
        "estilo": "Eres periodista de sociedad. Cubres educacion, justicia y vida cotidiana en Peru.",
    },
    "tecnologia": {
        "nombre": "Tecnologia",
        "categories": "technology",
        "countries": "",
        "languages": "es,en",
        "keywords": "",
        "estilo": "Eres periodista de tecnologia. Cubres IA, startups e innovacion digital.",
    },
    "ciencia": {
        "nombre": "Ciencia",
        "categories": "science",
        "countries": "",
        "languages": "es,en",
        "keywords": "",
        "estilo": "Eres periodista cientifico. Explicas descubrimientos cientificos de forma accesible.",
    },
    "salud": {
        "nombre": "Salud",
        "categories": "health",
        "countries": "",
        "languages": "es,en",
        "keywords": "",
        "estilo": "Eres periodista de salud. Cubres noticias medicas y salud publica.",
    },
    "cultura": {
        "nombre": "Cultura",
        "categories": "entertainment",
        "countries": "pe,es,ar,mx",
        "languages": "es",
        "keywords": "",
        "estilo": "Eres periodista cultural peruano. Cubres arte, musica, cine y literatura.",
    },
    "deportes": {
        "nombre": "Deportes",
        "categories": "sports",
        "countries": "pe,ar,es,br",
        "languages": "es,en",
        "keywords": "",
        "estilo": "Eres periodista deportivo peruano. Cubres futbol peruano, Premier League y el Inter Miami de Messi.",
    },
}

PROCESADOS = Path("noticias_procesadas.json")

def cargar(): return set(json.loads(PROCESADOS.read_text()).get("urls",[])) if PROCESADOS.exists() else set()
def guardar(urls): PROCESADOS.write_text(json.dumps({"urls":list(urls)},indent=2))

def noticias(cfg, procesados):
    """Obtiene noticias desde Mediastack API con imagen incluida."""
    params = {
        "access_key": MEDIASTACK_KEY,
        "limit": 10,
        "sort": "published_desc",
        "categories": cfg["categories"],
    }
    if cfg.get("countries"): params["countries"] = cfg["countries"]
    if cfg.get("languages"): params["languages"] = cfg["languages"]
    if cfg.get("keywords"):  params["keywords"]  = cfg["keywords"]

    query = urllib.parse.urlencode(params)
    result = []
    try:
        conn = http.client.HTTPConnection("api.mediastack.com", timeout=15)
        conn.request("GET", f"/v1/news?{query}")
        resp = conn.getresponse()
        data = json.loads(resp.read().decode("utf-8"))
        conn.close()

        if "error" in data:
            print(f"  Error Mediastack: {data['error'].get('message','')}")
            return []

        for art in data.get("data", []):
            url = art.get("url", "")
            if not url or url in procesados:
                continue
            # Intenta og:image del artículo; si falla usa el thumbnail de Mediastack
            mediastack_img = art.get("image") or ""
            og_img = extraer_og_image(url)
            imagen = og_img if og_img else mediastack_img
            print(f"  imagen: {'og:image' if og_img else 'mediastack'} → {imagen[:60]}")

            result.append({
                "titulo":   html.unescape(art.get("title", "")),
                "resumen":  html.unescape((art.get("description") or "")[:400]),
                "url":      url,
                "imagen":   imagen,
            })
            if len(result) >= 2:
                break
    except Exception as e:
        print(f"  Error conectando Mediastack: {e}")
    return result

def ollama(prompt):
    data = json.dumps({"model":"mistral","prompt":prompt,"stream":False}).encode()
    req = urllib.request.Request("http://localhost:11434/api/generate",data=data,headers={"Content-Type":"application/json"})
    with urllib.request.urlopen(req) as r:
        return json.loads(r.read())["response"].strip()

def periodista(noticia, estilo, seccion):
    prompt = f"""{estilo}

Redacta un articulo periodistico en español sobre esta noticia.
IMPORTANTE: Responde UNICAMENTE con este JSON, sin texto antes ni despues, sin markdown:

TITULO ORIGINAL: {noticia['titulo']}
RESUMEN: {noticia['resumen']}

{{"titular":"titulo atractivo en español","subtitulo":"una oracion de contexto","cuerpo":"<p>parrafo 1</p><p>parrafo 2</p><p>parrafo 3</p>","tags":["tag1","tag2"],"resumen_seo":"descripcion de 160 caracteres"}}"""
    try:
        t = ollama(prompt)
        t = t.replace("\\n", " ").replace("\\t", " ").replace("\\'", "'")
        start = t.find("{")
        end = t.rfind("}") + 1
        if start == -1:
            raise ValueError("No JSON")
        t_json = t[start:end]
        t_json = re.sub(r',\s*}', '}', t_json)
        t_json = re.sub(r',\s*]', ']', t_json)
        t_json = re.sub(r'[\x00-\x1f]', ' ', t_json)
        a = json.loads(t_json)
        a.update({
            "seccion":          seccion,
            "url_fuente":       noticia["url"],
            "imagen_url":       noticia.get("imagen", ""),   # ← nuevo campo
            "fecha_generacion": datetime.now().isoformat(),
        })
        return a
    except Exception as e:
        print(f"  Error periodista: {e}"); return None

def editor(art):
    prompt = f"""Eres editor jefe de un medio digital peruano.
Revisa este articulo y devuelve SOLO JSON valido sin markdown:

TITULAR: {art.get("titular","sin titulo")}
CUERPO: {art.get("cuerpo","sin cuerpo")}

Si es buen articulo: {{"aprobado":true,"titular":"titular mejorado","subtitulo":"subtitulo","cuerpo":"<p>cuerpo</p>","puntuacion":8}}
Si es malo: {{"aprobado":false}}"""
    try:
        t = ollama(prompt)
        t = t.replace("\\n", " ").replace("\\t", " ").replace("\\'", "'")
        start = t.find("{")
        end = t.rfind("}") + 1
        if start == -1:
            raise ValueError("No JSON")
        t_json = t[start:end]
        t_json = re.sub(r',\s*}', '}', t_json)
        t_json = re.sub(r',\s*]', ']', t_json)
        t_json = re.sub(r'[\x00-\x1f]', ' ', t_json)
        r = json.loads(t_json)
        if not r.get("aprobado"): return None
        art.update(r); return art
    except Exception as e:
        print(f"  Error editor: {e}"); return None

def publicar(art):
    slug = re.sub(r"\s+","-",re.sub(r"[^a-z0-9\s]","",art.get("titular","articulo").lower())[:50])
    slug += "-" + datetime.now().strftime("%Y%m%d%H%M")
    art["slug"] = slug
    Path("contenido").mkdir(exist_ok=True)
    Path(f"contenido/{slug}.json").write_text(json.dumps(art,ensure_ascii=False,indent=2))
    print(f"  Guardado local: contenido/{slug}.json")
    if not GITHUB_TOKEN: return
    ruta = f"contenido/{slug}.json"
    payload = json.dumps({
        "message":f"[IA] {art['seccion']}: {art.get('titular','articulo')[:60]}",
        "content":base64.b64encode(json.dumps(art,ensure_ascii=False,indent=2).encode()).decode(),
        "branch":GITHUB_BRANCH
    }).encode()
    req = urllib.request.Request(
        f"https://api.github.com/repos/{GITHUB_REPO}/contents/{ruta}",
        data=payload,
        headers={"Authorization":f"Bearer {GITHUB_TOKEN}","Content-Type":"application/json","Accept":"application/vnd.github+json"},
        method="PUT")
    try:
        with urllib.request.urlopen(req) as r:
            if r.status in (200,201): print(f"  Publicado en GitHub!")
    except Exception as e: print(f"  Error GitHub: {e}")

def main(secciones=None):
    print(f"\n{'='*40}\n  SALA DE REDACCION {datetime.now().strftime('%d/%m/%Y %H:%M')}\n{'='*40}\n")
    procesados = cargar()
    nuevas = set()
    for clave in (secciones or list(SECCIONES.keys())):
        cfg = SECCIONES[clave]
        print(f"Seccion: {cfg['nombre'].upper()}")
        arts = noticias(cfg, procesados)
        if not arts: print("  Sin noticias nuevas\n"); continue
        for n in arts:
            print(f"  -> {n['titulo'][:60]}...")
            nuevas.add(n["url"])
            print("  Periodista redactando...")
            a = periodista(n, cfg["estilo"], clave)
            if not a: continue
            print("  Editor revisando...")
            af = editor(a)
            if not af: print("  Rechazado por editor\n"); continue
            publicar(af)
        print()
    procesados.update(nuevas); guardar(procesados)
    print("Listo!")

if __name__ == "__main__":
    import sys
    main(sys.argv[1:] or None)
