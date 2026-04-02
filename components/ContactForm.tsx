"use client"
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, User, MessageSquare, Send, CheckCircle } from 'lucide-react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required'
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setStatus('sending')
    
    try {
      // Simulate API call - replace with actual endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
        setErrors({})
      } else {
        setStatus('error')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setStatus('error')
    }
    
    // Reset status after 3 seconds
    setTimeout(() => setStatus('idle'), 3000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <div className="glass-morphism rounded-xl p-8 border border-white/20">
      <h3 className="text-2xl font-semibold mb-6 text-slate-800 dark:text-slate-200">
        Send Me a Message
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
              <User className="w-4 h-4" />
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Professor Comic"
              className={`w-full px-4 py-3 rounded-lg bg-white/50 dark:bg-slate-800/50 border ${
                errors.name ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'
              } focus:border-primary-500 focus:outline-none transition-all placeholder-slate-400`}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
              <Mail className="w-4 h-4" />
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="professorcomic1@gmail.com"
              className={`w-full px-4 py-3 rounded-lg bg-white/50 dark:bg-slate-800/50 border ${
                errors.email ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'
              } focus:border-primary-500 focus:outline-none transition-all placeholder-slate-400`}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Subject
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            placeholder="Project Inquiry"
            className={`w-full px-4 py-3 rounded-lg bg-white/50 dark:bg-slate-800/50 border ${
              errors.subject ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'
            } focus:border-primary-500 focus:outline-none transition-all placeholder-slate-400`}
          />
          {errors.subject && <p className="text-red-500 text-sm">{errors.subject}</p>}
        </div>
        
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
            <MessageSquare className="w-4 h-4" />
            Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Tell me about your project..."
            rows={5}
            className={`w-full px-4 py-3 rounded-lg bg-white/50 dark:bg-slate-800/50 border ${
              errors.message ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'
            } focus:border-primary-500 focus:outline-none transition-all placeholder-slate-400 resize-none`}
          />
          {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
        </div>
        
        <motion.button
          type="submit"
          disabled={status !== 'idle'}
          className={`w-full py-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
            status === 'idle' 
              ? 'bg-primary-500 text-white hover:bg-primary-600 shadow-lg hover-lift' 
              : status === 'sending'
              ? 'bg-slate-300 dark:bg-slate-700 text-slate-500 cursor-not-allowed'
              : status === 'success'
              ? 'bg-green-500 text-white'
              : 'bg-red-500 text-white'
          }`}
          whileHover={status === 'idle' ? { scale: 1.02 } : {}}
          whileTap={status === 'idle' ? { scale: 0.98 } : {}}
        >
          {status === 'idle' && (
            <>
              <Send className="w-5 h-5" />
              Send Message
            </>
          )}
          {status === 'sending' && (
            <>
              <div className="w-5 h-5 border-2 border-slate-500 border-t-transparent rounded-full animate-spin" />
              Sending...
            </>
          )}
          {status === 'success' && (
            <>
              <CheckCircle className="w-5 h-5" />
              Message Sent Successfully!
            </>
          )}
          {status === 'error' && (
            <>
              <span className="text-red-200">Failed to send message. Please try again.</span>
            </>
          )}
        </motion.button>
      </form>
    </div>
  )
}