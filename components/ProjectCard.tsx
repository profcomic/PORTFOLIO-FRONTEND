"use client"
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Project } from '@/types'
import { Github, ExternalLink, Calendar } from 'lucide-react'

interface Props {
  project: Project;
  className?: string;
}

// Function to get fallback background for projects without images
const getProjectBackground = (projectTitle: string, techStack: string[]) => {
  const title = projectTitle.toLowerCase()
  const tech = techStack.map(t => t.toLowerCase()).join(' ')
  
  // Tech company backgrounds
  if (title.includes('e-commerce') || tech.includes('stripe')) {
    return 'from-blue-500 to-purple-500'
  }
  if (title.includes('task') || tech.includes('socket.io')) {
    return 'from-green-500 to-emerald-500'
  }
  if (title.includes('weather') || tech.includes('openweather')) {
    return 'from-cyan-500 to-blue-500'
  }
  
  // Creative project backgrounds
  if (title.includes('brand') || title.includes('logo') || tech.includes('figma')) {
    return 'from-purple-500 to-pink-500'
  }
  if (title.includes('photography') || tech.includes('photoshop')) {
    return 'from-orange-500 to-red-500'
  }
  if (title.includes('video') || tech.includes('after effects')) {
    return 'from-red-500 to-pink-500'
  }
  if (title.includes('social media') || tech.includes('canva')) {
    return 'from-blue-500 to-cyan-500'
  }
  if (title.includes('fashion') || tech.includes('lightroom')) {
    return 'from-pink-500 to-rose-500'
  }
  if (title.includes('documentary') || tech.includes('storytelling')) {
    return 'from-gray-600 to-gray-800'
  }
  if (title.includes('ui/ux') || tech.includes('design system')) {
    return 'from-indigo-500 to-purple-500'
  }
  
  // Default tech backgrounds
  if (tech.includes('django') || tech.includes('python')) {
    return 'from-green-500 to-blue-500'
  }
  if (tech.includes('next.js') || tech.includes('react')) {
    return 'from-cyan-500 to-blue-500'
  }
  if (tech.includes('angular') || tech.includes('typescript')) {
    return 'from-red-500 to-pink-500'
  }
  
  // Fallback
  return 'from-gray-500 to-slate-500'
}

export default function ProjectCard({ project, className }: Props) {
  const projectBackground = getProjectBackground(project.title, project.tech_stack)
  const hasImage = project.image && project.image !== ''
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 300 }}
      className={`glass-morphism rounded-xl overflow-hidden border border-white/20 hover-lift group ${className}`}
    >
      {/* Project Image with Backend Image or Fallback Background */}
      <div className="relative h-48 overflow-hidden">
        {hasImage ? (
          <>
            {/* Backend uploaded image */}
            <Image
              src={project.image.startsWith('http') ? project.image : `http://127.0.0.1:8000${project.image}`}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={(e) => {
                // Fallback to gradient background if image fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.parentElement?.classList.add(`bg-gradient-to-br`, ...projectBackground.split(' '));
              }}
            />
            
            {/* Gradient overlay for better text visibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          </>
        ) : (
          <>
            {/* Fallback gradient background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${projectBackground}`} />
            
            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 20px)`
            }} />
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </>
        )}
        
        {/* Overlay with links */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          {project.github_url && (
            <motion.a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github className="w-5 h-5" />
            </motion.a>
          )}
          {project.live_demo && (
            <motion.a
              href={project.live_demo}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ExternalLink className="w-5 h-5" />
            </motion.a>
          )}
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2 group-hover:text-primary-500 transition-colors">
            {project.title}
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech_stack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs font-medium rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300"
            >
              {tech}
            </span>
          ))}
          {project.tech_stack.length > 3 && (
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              +{project.tech_stack.length - 3} more
            </span>
          )}
        </div>

        {/* Project Links */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex gap-2">
            {project.github_url && (
              <motion.a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github className="w-4 h-4" />
              </motion.a>
            )}
            {project.live_demo && (
              <motion.a
                href={project.live_demo}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ExternalLink className="w-4 h-4" />
              </motion.a>
            )}
          </div>
          
          <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
            <Calendar className="w-3 h-3" />
            <span>
              {project.project_date 
                ? new Date(project.project_date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })
                : new Date().toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })
              }
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
