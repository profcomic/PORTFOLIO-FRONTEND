"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, X } from 'lucide-react'
import ContactForm from '@/components/ContactForm'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'professorcomic1@gmail.com',
      href: 'mailto:professorcomic1@gmail.com'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+254 113 088 424',
      href: 'tel:+254113088424'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Mombasa, Kenya',
      href: 'address:1824-80100'
    }
  ]

  const socialLinks = [
    {
      icon: Github,
      href: 'https://github.com/profcomic',
      label: 'GitHub'
    },
    {
      icon: Linkedin,
      href: 'https://linkedin.com/in/anthonney-mwanzah-432977354',
      label: 'LinkedIn'
    },
    {
      icon: X,
      href: 'https://x.com/',
      label: 'X'
    }
  ]

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Get In Touch</h2>
        <p className="text-slate-600 dark:text-slate-400 text-lg max-w-3xl mx-auto">
          I'm always interested in hearing about new projects and opportunities. 
          Whether you have a question or just want to say hi, feel free to reach out!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-8"
        >
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-slate-800 dark:text-slate-200">
              Let's Connect
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              I'm open to discussing new opportunities, creative ideas, or potential collaborations. 
              Whether you're looking for a full-stack developer or want to discuss a project, 
              I'd love to hear from you.
            </p>
          </div>

          {/* Contact Cards */}
          <div className="space-y-4">
            {contactInfo.map((info, index) => (
              <motion.a
                key={info.label}
                href={info.href}
                className="flex items-center gap-4 p-4 glass-morphism rounded-lg hover-lift border border-white/20 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-12 h-12 rounded-full bg-primary-500/10 flex items-center justify-center group-hover:bg-primary-500/20 transition-colors">
                  <info.icon className="w-6 h-6 text-primary-500" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{info.label}</p>
                  <p className="text-slate-800 dark:text-slate-200 font-medium">{info.value}</p>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-200">
              Follow Me
            </h4>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all hover-lift"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div id="contact-form">
            <ContactForm />
          </div>
        </motion.div>
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-20 text-center"
      >
        <div className="glass-morphism rounded-xl p-8 max-w-4xl mx-auto border border-white/20">
          <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-200">
            Ready to start a project?
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-2xl mx-auto">
            I'm currently available for freelance work and full-time opportunities. 
            Let's create something amazing together!
          </p>
          <motion.button
            onClick={() => {
              const formElement = document.getElementById('contact-form');
              if (formElement) {
                formElement.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary-500 text-white rounded-lg font-medium hover-lift shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Send className="w-5 h-5" />
            Start a Conversation
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}

export default Contact
