'use client'
import { createContext, useContext, useState } from 'react'

const translations = {
  ES: {
    search: 'Buscar',
    dark: 'Oscuro',
    light: 'Claro',
    subscribe: 'Suscribirse',
    sections: 'Secciones',
    politics: 'Política',
    economy: 'Economía',
    technology: 'Tecnología',
    culture: 'Cultura',
    science: 'Ciencia',
    opinion: 'Opinión',
    latest_news: 'Últimas Noticias',
    trending: 'TENDENCIA',
    about_us: 'Sobre nosotros',
    contact: 'Contacto',
    privacy: 'Privacidad',
    terms: 'Términos',
    cookies: 'Cookies',
    all_rights: 'Todos los derechos reservados.',
  },
  EN: {
    search: 'Search',
    dark: 'Dark',
    light: 'Light',
    subscribe: 'Subscribe',
    sections: 'Sections',
    politics: 'Politics',
    economy: 'Economy',
    technology: 'Technology',
    culture: 'Culture',
    science: 'Science',
    opinion: 'Opinion',
    latest_news: 'Latest News',
    trending: 'TRENDING',
    about_us: 'About Us',
    contact: 'Contact',
    privacy: 'Privacy',
    terms: 'Terms',
    cookies: 'Cookies',
    all_rights: 'All rights reserved.',
  },
}

const LanguageContext = createContext({
  language: 'ES',
  setLanguage: () => {},
  t: (key) => key,
})

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('ES')
  const t = (key) => translations[language][key] || key
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
