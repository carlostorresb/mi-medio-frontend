'use client'
import { motion } from 'framer-motion'
import { ArticleCard } from './ArticleCard'

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export function ArticleGrid({ title, articles }) {
  if (!articles || articles.length === 0) return null

  return (
    <section className="py-12 lg:py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <h2 className="font-serif text-3xl font-bold text-foreground relative inline-block">
            {title}
            <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-destructive" />
          </h2>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
        >
          {articles.map(art => (
            <motion.div key={art.slug} variants={itemVariants} className="h-full">
              <ArticleCard art={art} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
