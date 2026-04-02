"use client"

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function BackgroundBlobs() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return
    
    setIsClient(true)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-purple-950 dark:via-pink-950 dark:to-blue-950 transition-colors duration-500">
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-gradient-to-br from-purple-500/30 to-pink-500/20 blur-[120px]"
        animate={{
          x: isClient ? mousePosition.x * 0.02 : 0,
          y: isClient ? mousePosition.y * 0.02 : 0,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
      />
      
      <motion.div
        className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-gradient-to-tl from-pink-500/30 to-blue-500/20 blur-[120px]"
        animate={{
          x: isClient ? mousePosition.x * -0.02 : 0,
          y: isClient ? mousePosition.y * -0.02 : 0,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
      />

      <motion.div
        className="absolute top-[30%] left-[60%] w-[30%] h-[30%] rounded-full bg-gradient-to-bl from-blue-500/20 to-purple-500/20 blur-[100px]"
        animate={{
          x: isClient ? mousePosition.x * 0.03 : 0,
          y: isClient ? mousePosition.y * 0.03 : 0,
        }}
        transition={{ type: "spring", stiffness: 30, damping: 25 }}
      />

      <motion.div
        className="absolute bottom-[20%] left-[20%] w-[25%] h-[25%] rounded-full bg-gradient-to-tr from-purple-500/20 to-pink-500/20 blur-[80px]"
        animate={{
          x: isClient ? mousePosition.x * -0.025 : 0,
          y: isClient ? mousePosition.y * -0.025 : 0,
        }}
        transition={{ type: "spring", stiffness: 40, damping: 22 }}
      />
      
      {/* Subtle mesh grid pattern */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, #a855f7 1px, transparent 1px),
              radial-gradient(circle at 75% 75%, #ec4899 1px, transparent 1px),
              radial-gradient(circle at 50% 50%, #3b82f6 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            backgroundPosition: '0 0, 20px 20px, 10px 10px'
          }}
        />
      </div>

      {/* Floating particles */}
      {isClient && [...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-1 h-1 rounded-full ${
            i % 3 === 0 ? 'bg-purple-500/30' : 
            i % 3 === 1 ? 'bg-pink-500/30' : 'bg-blue-500/30'
          }`}
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
          }}
          animate={{
            x: [null, Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000)],
            y: [null, Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000)],
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear"
          }}
        />
      ))}
    </div>
  )
}