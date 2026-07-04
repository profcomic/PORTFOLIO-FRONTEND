"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Github, Users, GitBranch, Activity, Clock, CheckCircle } from 'lucide-react'

interface GitHubData {
  public_repos: number
  followers: number
  following: number
  status?: string
  last_active?: string
  total_commits?: number
}

export default function GitHubStatus() {
  const [githubData, setGithubData] = useState<GitHubData>({
    public_repos: 0,
    followers: 0,
    following: 0,
    status: 'Active',
    last_active: 'Just now',
    total_commits: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/github-status/')
        const data = await response.json()
        setGithubData(data)
      } catch (error) {
        // Fallback data
        setGithubData({
          public_repos: 9,
          followers: 22,
          following: 89,
          status: 'Active',
          last_active: '1 hours ago',
          total_commits: 1247
        })
      } finally {
        setLoading(false)
      }
    }

    fetchGitHubData()
    // Update every 5 minutes
    const interval = setInterval(fetchGitHubData, 300000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center gap-3 px-4 py-2">
        <div className="w-4 h-4 bg-gray-300 rounded-full animate-pulse"></div>
        <div className="w-16 h-3 bg-gray-300 rounded animate-pulse"></div>
        <div className="w-12 h-3 bg-gray-300 rounded animate-pulse"></div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-2">
      {/* GitHub Icon & Status - Horizontal Row */}
      <div className="flex items-center gap-2">
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="relative"
        >
          <Github className="w-4 h-4 text-gray-700 dark:text-gray-300" />
        </motion.div>
        
        {/* Status Indicator */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 rounded-full"
        >
          <CheckCircle className="w-2 h-2 text-green-600 dark:text-green-400" />
          <span className="text-xs font-medium text-green-700 dark:text-green-300">
            {githubData.status}
          </span>
        </motion.div>
      </div>

      {/* Stats - Horizontal Row */}
      <div className="flex items-center gap-2 text-xs">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-1"
        >
          <GitBranch className="w-2 h-2 text-purple-500" />
          <span className="font-medium text-gray-700 dark:text-gray-300">
            {githubData.public_repos}
          </span>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-1"
        >
          <Users className="w-2 h-2 text-blue-500" />
          <span className="font-medium text-gray-700 dark:text-gray-300">
            {githubData.followers}
          </span>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-1"
        >
          <Activity className="w-2 h-2 text-green-500" />
          <span className="font-medium text-gray-700 dark:text-gray-300">
            {githubData.total_commits}
          </span>
        </motion.div>
      </div>

      {/* Last Active - Horizontal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400"
      >
        <Clock className="w-2 h-2" />
        <span>{githubData.last_active}</span>
      </motion.div>
    </div>
  )
}