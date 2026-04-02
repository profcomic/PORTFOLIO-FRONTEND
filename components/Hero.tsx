import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowDown } from 'lucide-react';
import ProfileImage from './ProfileImage';

const Hero: React.FC = () => {
  const [text, setText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const fullText = "Building scalable systems with Python & TypeScript.";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible(v => !v);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  const socialLinks = [
    { icon: Github, href: 'https://github.com/profcomic', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/anthonney-mwanzah-432977354', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:professorcomic1@gmail.com', label: 'Email' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      </div>

      <div className="relative z-10 max-w-6xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Terminal content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
          {/* Terminal-style introduction */}
          <motion.div 
            className="inline-block mb-8 glass-morphism rounded-lg overflow-hidden border border-white/20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="bg-slate-800/50 backdrop-blur-sm px-4 py-2 flex items-center gap-2 border-b border-white/10">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <div className="w-3 h-3 bg-yellow-500 rounded-full" />
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <span className="ml-4 text-xs font-mono text-slate-400">portfolio.ts — bash</span>
            </div>
            
            <div className="p-6 font-mono text-left">
              <p className="text-emerald-400 text-sm mb-2">$ whoami</p>
              <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white">
                ANTHONNEY MWANZAH
              </h1>
              <h5 className="text-slate-300 text-lg md:text-xl leading-relaxed mb-6">
                Nerd by Nature. Human by Design.
              </h5>
              
              <p className="text-emerald-400 text-lg mb-2">$ describe --role</p>
              <p className="text-slate-300 text-xl md:text-2xl leading-relaxed mb-6">
                Space Enthusiast | Fullstack Developer | Creative Professional | Digital Ambassador | Orchestrator
              </p>
              
              <p className="text-emerald-400 text-sm mb-2">$ describe --stack</p>
              <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-6">
                {text}<span className={`inline-block w-0.5 h-5 bg-white ml-1 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}></span>
              </p>
              
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-900/30 border border-blue-500/50 text-blue-400 rounded-md text-sm font-medium">Django</span>
                <span className="px-3 py-1 bg-cyan-900/30 border border-cyan-500/50 text-cyan-400 rounded-md text-sm font-medium">Next.js</span>
                <span className="px-3 py-1 bg-red-900/30 border border-red-500/50 text-red-400 rounded-md text-sm font-medium">Angular</span>
                <span className="px-3 py-1 bg-green-900/30 border border-green-500/50 text-green-400 rounded-md text-sm font-medium">Python</span>
                <span className="px-3 py-1 bg-blue-900/30 border border-blue-500/50 text-blue-400 rounded-md text-sm font-medium">TypeScript</span>
                <span className="px-3 py-1 bg-purple-900/30 border border-purple-500/50 text-purple-400 rounded-md text-sm font-medium">Graphic Design</span>
                <span className="px-3 py-1 bg-orange-900/30 border border-orange-500/50 text-orange-400 rounded-md text-sm font-medium">Data Science</span>
                <span className="px-3 py-1 bg-red-900/30 border border-red-500/50 text-red-400 rounded-md text-sm font-medium">Cybersecurity</span>
              </div>
            </div>
          </motion.div>

          {/* Call to action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="space-y-6"
          >
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
              Full-stack developer passionate about creating elegant solutions to complex problems. 
              Specializing in modern web technologies and scalable architecture.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.a
                href="#projects"
                className="px-8 py-3 bg-primary-500 text-white rounded-lg font-medium hover-lift shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View My Work
              </motion.a>
              
              <motion.a
                href="#contact"
                className="px-8 py-3 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg font-medium hover-lift"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.a>
            </div>

            {/* Social links */}
            <div className="flex justify-center gap-4 pt-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-primary-500 dark:hover:text-primary-400 hover-lift"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <link.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

          {/* Right side - Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center lg:justify-end"
          >
            <ProfileImage />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <motion.a
            href="#about"
            className="text-slate-400 hover:text-primary-500 transition-colors"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown className="w-6 h-6" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
