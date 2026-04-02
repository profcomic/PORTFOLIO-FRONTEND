"use client"

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeToggle } from '@/components/ThemeToggle'
import Hero from '@/components/Hero'
import About from '@/components/About'
import ProjectsSection from '@/components/ProjectsSection'
import Contact from '@/components/Contact'
import BackgroundBlobs from '@/components/BackgroundBlobs'
import GitHubStatus from '@/components/GitHubStatus'
import DraggableStatus from '@/components/DraggableStatus'
import ParticleBackground from '@/components/ParticleBackground'
import ScrollProgress from '@/components/ScrollProgress'
import CursorTrail from '@/components/CursorTrail'
import { Scroll } from 'lucide-react'

export default function HomePage() {
  const [activeSection, setActiveSection] = useState('home')
  const [isVisible, setIsVisible] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const scrollTimeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    setIsVisible(true)
    
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }

      // Show menu when scrolling stops
      setIsScrolling(true)
      setShowMenu(false)
      
      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
      
      // Set new timeout to detect when scrolling stops
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false)
        setShowMenu(true)
      }, 150)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [])

  const navItems = [
    { id: 'home', label: 'LacalHost', icon: '🪹' },
    { id: 'about', label: 'Loop', icon: '👦' },
    { id: 'projects', label: 'Buggin Out', icon: '🐞' },
    { id: 'contact', label: 'LinkUp', icon: '🔗' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-purple-950 dark:via-pink-950 dark:to-blue-950 transition-colors duration-500">
      {/* Interactive Background Layers */}
      <BackgroundBlobs />
      <ParticleBackground />
      <CursorTrail />
      <ScrollProgress />
      
      {/* Unique Floating Navigation - Appears when scrolling stops */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, y: -100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -100, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="flex items-center gap-4 p-4 bg-white/90 dark:bg-black/90 backdrop-blur-xl rounded-2xl border border-purple-500/30 shadow-2xl">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
                <div className="w-3 h-3 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full animate-pulse delay-75"></div>
                <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse delay-150"></div>
              </div>
              
              <div className="flex gap-6">
                {navItems.map((item) => (
                  <motion.a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                      activeSection === item.id
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/50'
                    }`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Elements */}
      <DraggableStatus />
      <ScrollProgress />

      {/* Main Content */}
      <main className="relative z-10">
        <AnimatePresence>
          {isVisible && (
            <>
              <motion.section
                id="home"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Hero />
              </motion.section>

              <motion.section
                id="about"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="min-h-screen flex items-center justify-center px-6 py-20"
              >
                <About />
              </motion.section>

              <motion.section
                id="projects"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="min-h-screen px-6 py-20"
              >
                <ProjectsSection />
              </motion.section>

              <motion.section
                id="contact"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="min-h-screen flex items-center justify-center px-6 py-20"
              >
                <Contact />
              </motion.section>
            </>
          )}
        </AnimatePresence>
      </main>

      {/* Floating Action Button */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 z-40 p-4 bg-primary-500 text-white rounded-full shadow-lg hover-lift"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: activeSection !== 'home' ? 1 : 0, scale: activeSection !== 'home' ? 1 : 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </motion.button>
    </div>
  )
}
