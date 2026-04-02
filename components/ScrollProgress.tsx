"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const currentScroll = window.scrollY
      const progress = (currentScroll / totalHeight) * 100
      setScrollProgress(Math.min(100, Math.max(0, progress)))
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial call

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-2 bg-gray-200 dark:bg-gray-800 z-[9999]"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: scrollProgress / 100 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      style={{ transformOrigin: "left" }}
    >
      <div className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 shadow-lg" />
    </motion.div>
  )
}
