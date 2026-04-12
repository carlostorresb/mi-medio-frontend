// Pure utilities — safe for client components (no fs/path imports)

export const SECCIONES_LABELS = {
  el_pais:       'El País',
  internacional: 'Internacional',
  economia:      'Economía',
  sociedad:      'Sociedad',
  tecnologia:    'Tecnología',
  ciencia:       'Ciencia',
  salud:         'Salud',
  cultura:       'Cultura',
  deportes:      'Deportes',
  opinion:       'Opinión',
}

export function tiempoRelativo(fechaStr) {
  if (!fechaStr) return ''
  const diff = Math.floor((new Date() - new Date(fechaStr)) / 1000)
  if (diff < 60)    return 'Hace un momento'
  if (diff < 3600)  return `Hace ${Math.floor(diff / 60)} min`
  if (diff < 86400) return `Hace ${Math.floor(diff / 3600)} h`
  return `Hace ${Math.floor(diff / 86400)} días`
}
