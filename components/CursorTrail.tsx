"use client"

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'

interface TrailPoint {
  id: number
  x: number
  y: number
  timestamp: number
}

export default function CursorTrail() {
  const [trail, setTrail] = useState<TrailPoint[]>([])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isClient) return

    const newPoint: TrailPoint = {
      id: Date.now() + Math.random(),
      x: e.clientX,
      y: e.clientY,
      timestamp: Date.now()
    }

    setTrail(prevTrail => {
      const updatedTrail = [...prevTrail, newPoint]
      return updatedTrail
        .filter(point => Date.now() - point.timestamp < 500)
        .slice(-20)
    })
  }, [isClient])

  useEffect(() => {
    if (!isClient) return

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove, isClient])

  useEffect(() => {
    const interval = setInterval(() => {
      setTrail(prevTrail => 
        prevTrail.filter(point => Date.now() - point.timestamp < 500)
      )
    }, 50)

    return () => clearInterval(interval)
  }, [])

  if (!isClient) return null

  return (
    <>
      {trail.map((point, index) => {
        const age = Date.now() - point.timestamp
        const opacity = Math.max(0, 1 - age / 500)
        const scale = 1 + (index / trail.length) * 0.5
        
        return (
          <motion.div
            key={point.id}
            className="fixed pointer-events-none z-50"
            style={{
              left: point.x - 8,
              top: point.y - 8,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: scale * 0.5, 
              opacity: opacity * 0.3 
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div 
              className="w-4 h-4 rounded-full"
              style={{
                background: `radial-gradient(circle, rgba(168, 85, 247, ${opacity}) 0%, rgba(236, 72, 153, ${opacity * 0.8}) 50%, rgba(59, 130, 246, ${opacity * 0.6}) 100%)`
              }}
            />
          </motion.div>
        )
      })}
    </>
  )
}
