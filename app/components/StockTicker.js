'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'

const marketData = [
  { name: 'Nasdaq',   value: '+0.35%', isPositive: true },
  { name: 'S&P 500',  value: '-0.12%', isPositive: false },
  { name: 'Dow Jones', value: '+0.28%', isPositive: true },
  { name: 'Bitcoin',  value: '+2.4%',  isPositive: true },
  { name: 'EUR/USD',  value: '-0.05%', isPositive: false },
]

export function StockTicker() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % marketData.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  const item = marketData[currentIndex]

  return (
    <div className="h-6 overflow-hidden relative flex items-center justify-end w-40">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentIndex}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="absolute flex items-center space-x-1.5 text-[11px] md:text-sm font-medium font-sans"
        >
          <span className="text-foreground">{item.name}</span>
          <span className={`flex items-center ${item.isPositive ? 'text-green-600' : 'text-destructive'}`}>
            {item.value}
            {item.isPositive
              ? <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
              : <ArrowDownRight className="w-3.5 h-3.5 ml-0.5" />
            }
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
