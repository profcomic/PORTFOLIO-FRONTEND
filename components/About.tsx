"use client"

import { motion } from 'framer-motion'
import { Code2, Database, Globe, Smartphone, Server, Cloud } from 'lucide-react'

const About = () => {
  const skills = [
    {
      category: "Frontend",
      icon: Globe,
      technologies: ["Next.js", "Angular", "TypeScript", "Tailwind CSS", "HTML5", "CSS3", "Javascript"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      category: "Backend", 
      icon: Server,
      technologies: ["Python", "Django", "Flask", "Node.js"],
      color: "from-green-500 to-emerald-500"
    },
    {
      category: "Design & Creative",
      icon: Smartphone,
      technologies: ["Corel Draw", "Photoshop", "Illustrator", "Canva", "Capcut", "Da Vinci"],
      color: "from-purple-500 to-pink-500"
    },
    {
      category: "Data Science & AI",
      icon: Cloud,
      technologies: ["Python","Power BI", "Pandas", "Machine Learning", "Data Analysis"],
      color: "from-orange-500 to-red-500"
    },
    {
      category: "Cybersecurity",
      icon: Server,
      technologies: ["Network Security", "Penetration Testing", "Security Analysis", "Risk Assessment", "Compliance"],
      color: "from-red-500 to-pink-500"
    }
  ]

  const experience = [
    {
      title: "Full Stack Developer",
      company: "Phroneo Spectacular Space",
      period: "2024 - Present",
      description: "Developing scalable web applications using modern technologies and best practices and intergration of AI & VR for Space exporation."
    },
    {
      title: "Freelanced Techie",
      company: "Remote",
      period: "2025 - Present",
      description: "Creating responsive websites and contributed to various client projects encompassing Design, Data and General technological solutions."
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
        <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">About Me</h2>
        <p className="text-slate-600 dark:text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed">
          I'm a passionate full-stack developer with expertise in building modern, scalable web applications. 
          I love turning complex problems into simple, beautiful, and intuitive solutions.
          Also a relentless trier of everything—a trait that drives my "Multicore" approach to technology. 
          My work thrives at the intersection of Full-Stack Development, Data Analytics, and Cybersecurity, 
          all fueled by a deep-seated obsession with AI-VR and Space Exploration.
        </p>
      </motion.div>

      {/* Skills Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-20"
      >
        <h3 className="text-2xl font-bold text-center mb-12 text-slate-800 dark:text-slate-200">
          Technical Skills
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.category}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-morphism rounded-xl p-6 hover-lift border border-white/20"
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${skill.color} flex items-center justify-center mb-4`}>
                <skill.icon className="w-6 h-6 text-white" />
              </div>
              
              <h4 className="font-semibold text-lg mb-3 text-slate-800 dark:text-slate-200">
                {skill.category}
              </h4>
              
              <div className="flex flex-wrap gap-2">
                {skill.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-xs rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Experience Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <h3 className="text-2xl font-bold text-center mb-12 text-slate-800 dark:text-slate-200">
          Experience
        </h3>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary-500 to-accent-500" />
          
          <div className="space-y-12">
            {experience.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}
              >
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="glass-morphism rounded-lg p-6 hover-lift border border-white/20"
                  >
                    <h4 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
                      {exp.title}
                    </h4>
                    <p className="text-primary-500 dark:text-primary-400 font-medium mb-2">
                      {exp.company}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                      {exp.period}
                    </p>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {exp.description}
                    </p>
                  </motion.div>
                </div>
                
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-500 rounded-full border-4 border-white dark:border-slate-950" />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Personal Interests */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-20 text-center"
      >
        <h3 className="text-2xl font-bold mb-8 text-slate-800 dark:text-slate-200">
          Beyond Code
        </h3>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, 
          enjoying outdoor activities, or reading about the latest trends in AI and machine learning. 
          I believe in continuous learning and staying curious about the world around us.

          Beyond the screen, I serve as a Learning Architect and STEM Ambassador committed to bridging the 
          digital divide. Whether I am architecting secure web applications, extracting data-driven insights, or designing transformative learning experiences, I focus on building human-centered solutions that are unequivocally impactful.
        </p>
      </motion.div>
    </div>
  )
}

export default About
