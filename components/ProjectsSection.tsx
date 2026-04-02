"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Project } from '@/types'
import ProjectCard from '@/components/ProjectCard'
import { ExternalLink, Github, Filter } from 'lucide-react'

const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [filter, setFilter] = useState("All")
  const [loading, setLoading] = useState(true)

  const TECHNOLOGIES = ["All", "Python", "Django", "TypeScript", "Next.js", "Angular", "React", "Flask", "Data Science", "Cybersecurity", "Graphic Design", "Photography", "Video Production", "UI/UX Design", "Motion Graphics"]

  useEffect(() => {
    // Fetch projects from Django API
    fetch('http://127.0.0.1:8000/api/projects/')
      .then((res) => res.json())
      .then((data) => {
        setProjects(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Fetch error:", err)
        // Fallback to sample data if API is not available
        setProjects([
          {
            id: 1,
            title: "Extensive Modern Website",
            description: "A full-featured website with e-commerce section built with Django, featuring user authentication, payment processing, and inventory management.",
            tech_stack: ["Django"],
            github_url: "https://github.com/profcomic/BBC DJANGO WEBSITE",
            live_demo: "https://bbcmsa.com",
            image: "/api/placeholder/400/300",
            project_date: "2024-01-15",
            created_at: "2024-01-15T10:00:00Z",
            updated_at: "2024-01-15T10:00:00Z"
          },
          {
            id: 2,
            title: "Management System",
            description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
            tech_stack: ["Django"],
            github_url: "https://github.com/pofcomic/floqpulse",
            live_demo: "https://floqpulse.com",
            image: "/api/placeholder/400/300",
            project_date: "2024-02-20",
            created_at: "2024-02-20T14:30:00Z",
            updated_at: "2024-02-20T14:30:00Z"
          },
          {
            id: 3,
            title: "Blog Platform",
            description: "A modern blogging platform with markdown support, SEO optimization, and social media integration.",
            tech_stack: ["Flask", "Python", "SQLite", "Bootstrap"],
            github_url: "https://github.com/yourusername/blog-platform",
            live_demo: "https://blog-demo.com",
            image: "/api/placeholder/400/300",
            project_date: "2024-03-10",
            created_at: "2024-03-10T09:15:00Z",
            updated_at: "2024-03-10T09:15:00Z"
          }
        ])
        setLoading(false)
      })
  }, [])

  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(p => p.tech_stack.includes(filter))

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          <p className="mt-4 text-slate-600 dark:text-slate-400">Loading Projects...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Featured Projects</h2>
        <p className="text-slate-600 dark:text-slate-400 text-lg max-w-3xl mx-auto">
          A selection of my recent work showcasing different technologies and approaches to solving real-world problems.
        </p>
      </motion.div>

      {/* Filter Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-wrap gap-3 justify-center mb-12 max-w-4xl mx-auto"
      >
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-full">
          <Filter className="w-4 h-4 text-slate-500" />
          <span className="text-sm text-slate-600 dark:text-slate-400">Filter:</span>
        </div>
        
        {TECHNOLOGIES.map((tech) => (
          <motion.button
            key={tech}
            onClick={() => setFilter(tech)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              filter === tech 
                ? "bg-primary-500 text-white shadow-lg shadow-primary-500/40 scale-105" 
                : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-primary-400 hover-lift"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {tech}
          </motion.button>
        ))}
      </motion.div>

      {/* Projects Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
      >
        <AnimatePresence mode='popLayout'>
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, type: "spring", bounce: 0.3, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      
      {filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            No projects found for <span className="font-semibold text-primary-500">{filter}</span>
          </p>
        </motion.div>
      )}

      {/* View More Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-center mt-16"
      >
        <div className="glass-morphism rounded-xl p-8 max-w-2xl mx-auto border border-white/20">
          <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-200">
            Want to see more?
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Check out my GitHub profile for a complete collection of my open-source projects and contributions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="https://github.com/profcomic"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 dark:bg-slate-800 text-white rounded-lg font-medium hover-lift"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-5 h-5" />
              View on GitHub
            </motion.a>
            
            <motion.a
              href="/projects"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg font-medium hover-lift"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink className="w-5 h-5" />
              All Projects
            </motion.a>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ProjectsSection
