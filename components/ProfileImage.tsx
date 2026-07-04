"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'

interface ProfileImageProps {
  className?: string
}

export default function ProfileImage({ className = "" }: ProfileImageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className={`relative ${className}`}
    >
      <div className="relative w-48 h-48 md:w-64 md:h-64">
        {/* Glowing border effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 blur-lg opacity-50 animate-pulse"></div>
        
        {/* Main image container */}
        <motion.div
          whileHover={{ scale: 1.05, rotate: 2 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="relative w-full h-full rounded-full overflow-hidden border-4 border-purple-500 shadow-2xl"
        >
          {/* Your actual profile image - replace with your photo */}
          <Image
            src="/images/profile.jpg"
            alt="ANTHONNEY MWANZAH"
            width={256}
            height={256}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to placeholder if image not found
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.nextElementSibling?.classList.remove('hidden');
            }}
          />
          
          {/* Fallback placeholder */}
          <div className="w-full h-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
            <div className="text-white text-center p-4">
              <div className="text-6xl mb-2">👨‍💻</div>
              <div className="text-sm font-medium">ANTHONNEY</div>
              <div className="text-xs opacity-75">Techie</div>
            </div>
          </div>
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        </motion.div>
        
        {/* Floating particles */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-400 rounded-full"
            initial={{
              x: Math.random() * 100,
              y: Math.random() * 100,
            }}
            animate={{
              x: [null, Math.random() * 100],
              y: [null, Math.random() * 100],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}
