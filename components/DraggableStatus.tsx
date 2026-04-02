"use client"

import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import GitHubStatus from './GitHubStatus'

interface Position {
  x: number
  y: number
}

export default function DraggableStatus() {
  const [position, setPosition] = useState<Position>({ x: 32, y: typeof window !== 'undefined' ? window.innerHeight - 200 : 500 })
  const [isDragging, setIsDragging] = useState(false)
  const dragRef = useRef<HTMLDivElement>(null)
  const dragStartPos = useRef<Position>({ x: 0, y: 0 })
  const elementStartPos = useRef<Position>({ x: 0, y: 0 })

  useEffect(() => {
    // Load saved position from session storage
    const savedPosition = sessionStorage.getItem('draggableStatusPosition')
    if (savedPosition) {
      try {
        const pos = JSON.parse(savedPosition)
        setPosition(pos)
      } catch (e) {
        console.error('Failed to parse saved position:', e)
      }
    }
  }, [])

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    dragStartPos.current = { x: e.clientX, y: e.clientY }
    elementStartPos.current = { ...position }
    
    // Prevent text selection while dragging
    e.preventDefault()
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return

      const deltaX = e.clientX - dragStartPos.current.x
      const deltaY = e.clientY - dragStartPos.current.y

      const newX = elementStartPos.current.x + deltaX
      const newY = elementStartPos.current.y + deltaY

      // Keep within viewport bounds
      const maxX = (typeof window !== 'undefined' ? window.innerWidth : 1000) - 150 // approximate width of status bar
      const maxY = (typeof window !== 'undefined' ? window.innerHeight : 1000) - 100 // approximate height of status bar
      const minX = 0
      const minY = 0

      setPosition({
        x: Math.max(minX, Math.min(maxX, newX)),
        y: Math.max(minY, Math.min(maxY, newY))
      })
    }

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false)
        // Save position to session storage
        sessionStorage.setItem('draggableStatusPosition', JSON.stringify(position))
      }
    }

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = 'grabbing'
      document.body.style.userSelect = 'none'
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = 'auto'
      document.body.style.userSelect = 'auto'
    }
  }, [isDragging, position])

  return (
    <motion.div
      ref={dragRef}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      style={{
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: 40,
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
      className={`select-none ${isDragging ? 'scale-105' : 'scale-100'} transition-transform`}
    >
      <div 
        className="flex flex-col items-center gap-4 p-4 bg-white/90 dark:bg-black/90 backdrop-blur-xl rounded-2xl border border-purple-500/30 shadow-2xl hover:shadow-3xl transition-shadow"
        onMouseDown={handleMouseDown}
      >
        {/* Drag Handle */}
        <div className="flex items-center gap-2 mb-2">
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">Drag to move</span>
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
          </div>
        </div>
        
        <GitHubStatus />
        
        <div className="h-px w-8 bg-purple-500/30"></div>
        
        {/* Social Media Status - Horizontal Row */}
        <div className="flex items-center gap-2">
          <motion.a
            href="https://github.com/profcomic"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2 py-1 rounded-lg bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800/50 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => e.stopPropagation()} // Prevent drag when clicking
          >
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium">GitHub</span>
          </motion.a>
          
          <motion.a
            href="https://linkedin.com/in/anthonney-mwanzah-432977354"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2 py-1 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => e.stopPropagation()} // Prevent drag when clicking
          >
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium">LinkedIn</span>
          </motion.a>
          
          <motion.a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2 py-1 rounded-lg bg-pink-100 dark:bg-pink-900/50 text-pink-700 dark:text-pink-300 hover:bg-pink-200 dark:hover:bg-pink-800/50 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => e.stopPropagation()} // Prevent drag when clicking
          >
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium">X</span>
          </motion.a>
        </div>
      </div>
    </motion.div>
  )
}
