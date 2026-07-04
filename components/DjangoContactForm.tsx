"use client"

import { useState } from 'react'
import { portfolioApi } from '@/lib/api'

interface ContactFormData {
  name: string
  email: string
  message: string
}

export default function DjangoContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  })
  const [status, setStatus] = useState<{
    loading: boolean
    success: boolean
    error: string | null
  }>({
    loading: false,
    success: false,
    error: null
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.message) {
      setStatus(prev => ({
        ...prev,
        error: 'All fields are required'
      }))
      return
    }

    setStatus(prev => ({ ...prev, loading: true, error: null }))

    try {
      await portfolioApi.submitContact(formData)
      setStatus({
        loading: false,
        success: true,
        error: null
      })
      setFormData({ name: '', email: '', message: '' })
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus(prev => ({ ...prev, success: false }))
      }, 5000)
    } catch (error) {
      setStatus({
        loading: false,
        success: false,
        error: error instanceof Error ? error.message : 'Failed to send message'
      })
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="glass-morphism rounded-xl p-8 border border-white/20">
        <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-200">
          Get In Touch (Django Backend)
        </h2>
        
        {status.success && (
          <div className="mb-4 p-4 bg-green-100 dark:bg-green-900/30 border border-green-500/50 text-green-700 dark:text-green-400 rounded-md">
            Message sent successfully! 🎉
          </div>
        )}
        
        {status.error && (
          <div className="mb-4 p-4 bg-red-100 dark:bg-red-900/30 border border-red-500/50 text-red-700 dark:text-red-400 rounded-md">
            {status.error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              placeholder="Your Name"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              placeholder="your.email@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              placeholder="Your message..."
              required
            />
          </div>

          <button
            type="submit"
            disabled={status.loading}
            className="w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {status.loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  )
}
