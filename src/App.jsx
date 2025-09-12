  // Email obfusqué
  const emailParts = ["collas.lucca", "outlook.fr"];
  const getEmail = () => `${emailParts[0]}@${emailParts[1]}`;
  const handleSecureEmailClick = () => {
    window.location.href = `mailto:${getEmail()}`;
  };
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Code, Shield, Zap, Github, Mail, ExternalLink, ChevronDown, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/toaster';
import { toast } from '@/components/ui/use-toast';

function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [terminalText, setTerminalText] = useState('');
  const [isWhoamiHovered, setIsWhoamiHovered] = useState(false);
  const [matrixChars, setMatrixChars] = useState([]);

  const fullText = "root@hacker:~$ whoami";
  const hoverText = "Lucca Collas - Cybersecurity Expert";

  useEffect(() => {
    if (isWhoamiHovered) {
      setTerminalText(hoverText);
      return;
    }
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTerminalText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [isWhoamiHovered]);

  useEffect(() => {
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const columns = Math.floor(window.innerWidth / 20);
    const drops = Array(columns).fill(0);

    const matrix = setInterval(() => {
      setMatrixChars(prev => {
        const newChars = [...prev];
        for (let i = 0; i < drops.length; i++) {
          const char = chars[Math.floor(Math.random() * chars.length)];
          const x = i * 20;
          const y = drops[i] * 20;
          
          if (y > window.innerHeight && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
          
          newChars[i] = { char, x, y, opacity: Math.random() };
        }
        return newChars.slice(0, 50);
      });
    }, 100);

    return () => clearInterval(matrix);
  }, []);

  const sections = [
    { id: 'home', label: 'Home', icon: Terminal },
    { id: 'about', label: 'About', icon: Code },
    { id: 'skills', label: 'Skills', icon: Shield },
    { id: 'projects', label: 'Projects', icon: Zap },
    { id: 'contact', label: 'Contact', icon: Mail }
  ];

  const skills = [
    { name: 'Penetration Testing', level: 95, color: 'from-red-500 to-red-700' },
    { name: 'Network Security', level: 90, color: 'from-blue-500 to-blue-700' },
    { name: 'Cryptography', level: 85, color: 'from-purple-500 to-purple-700' },
    { name: 'Reverse Engineering', level: 88, color: 'from-green-500 to-green-700' },
    { name: 'Social Engineering', level: 92, color: 'from-yellow-500 to-yellow-700' },
    { name: 'Malware Analysis', level: 87, color: 'from-pink-500 to-pink-700' }
  ];

  const projects = [
    {
      title: 'Neural Network Intrusion Detection',
      description: 'Système de détection d\'intrusion basé sur l\'IA pour identifier les menaces en temps réel',
      tech: ['Python', 'TensorFlow', 'Scapy', 'Docker'],
      status: 'Active'
    },
    {
      title: 'Blockchain Security Audit Tool',
      description: 'Outil d\'audit automatisé pour smart contracts et applications décentralisées',
      tech: ['Solidity', 'Web3.js', 'Node.js', 'React'],
      status: 'Completed'
    },
    {
      title: 'Zero-Day Vulnerability Scanner',
      description: 'Scanner avancé pour la découverte de vulnérabilités zero-day dans les applications web',
      tech: ['Go', 'PostgreSQL', 'Redis', 'Kubernetes'],
      status: 'In Progress'
    }
  ];

  const handleNavClick = (sectionId) => {
    setCurrentSection(sectionId);
    setIsMenuOpen(false);
  };

  const handleContactClick = () => {
    setCurrentSection('contact');
    setIsMenuOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>CyberHacker Portfolio - Expert en Sécurité Informatique</title>
        <meta name="description" content="Portfolio professionnel d'un expert en cybersécurité spécialisé dans les tests de pénétration, l'analyse de malwares et la sécurité réseau." />
        <meta property="og:title" content="CyberHacker Portfolio - Expert en Sécurité Informatique" />
        <meta property="og:description" content="Portfolio professionnel d'un expert en cybersécurité spécialisé dans les tests de pénétration, l'analyse de malwares et la sécurité réseau." />
      </Helmet>

      <div className="min-h-screen relative">
        {/* Matrix Background */}
        <div className="matrix-bg">
          {matrixChars.map((char, index) => (
            <div
              key={index}
              className="absolute text-green-400 font-mono text-sm"
              style={{
                left: char.x,
                top: char.y,
                opacity: char.opacity,
                transform: `translateY(-${char.y}px)`
              }}
            >
              {char.char}
            </div>
          ))}
        </div>

        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-green-400/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <motion.div 
                className="flex items-center space-x-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Terminal className="w-8 h-8 text-green-400" />
                <span className="text-xl font-bold text-green-400 font-mono">CyberHacker</span>
              </motion.div>

              {/* Desktop Navigation */}
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {sections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <button
                        key={section.id}
                        onClick={() => handleNavClick(section.id)}
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 flex items-center space-x-1 ${
                          currentSection === section.id
                            ? 'bg-green-400/20 text-green-400 neon-glow'
                            : 'text-green-300 hover:bg-green-400/10 hover:text-green-400'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{section.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-green-400 hover:text-green-300 transition-colors"
                >
                  {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden bg-black/90 border-t border-green-400/30"
              >
                <div className="px-2 pt-2 pb-3 space-y-1">
                  {sections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <button
                        key={section.id}
                        onClick={() => handleNavClick(section.id)}
                        className={`w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-300 flex items-center space-x-2 ${
                          currentSection === section.id
                            ? 'bg-green-400/20 text-green-400'
                            : 'text-green-300 hover:bg-green-400/10 hover:text-green-400'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{section.label}</span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* Main Content */}
        <main className="pt-16">
          <AnimatePresence mode="wait">
            {currentSection === 'home' && (
              <motion.section
                key="home"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="min-h-screen flex items-center justify-center px-4 scan-lines"
              >
                <div className="text-center max-w-4xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mb-8"
                  >
                    <h1 className="text-6xl md:text-8xl font-bold mb-4 glitch font-mono" data-text="HACKER">
                      HACKER
                    </h1>
                    <div className="text-xl md:text-2xl text-green-300 font-mono mb-8">
                      <span
                        className="terminal-cursor"
                        onMouseEnter={() => setIsWhoamiHovered(true)}
                        onMouseLeave={() => setIsWhoamiHovered(false)}
                        style={{ cursor: 'pointer' }}
                      >
                        {terminalText}
                      </span>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="space-y-6"
                  >
                    <p className="text-lg md:text-xl text-green-200 max-w-2xl mx-auto leading-relaxed">
                      Expert en cybersécurité spécialisé dans les tests de pénétration, 
                      l'analyse de vulnérabilités et la sécurité des systèmes critiques.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                      <Button
                        onClick={() => handleNavClick('projects')}
                        className="bg-green-400 hover:bg-green-500 text-black font-bold px-8 py-3 neon-glow transition-all duration-300"
                      >
                        Voir mes projets
                      </Button>
                      <Button
                        onClick={handleContactClick}
                        variant="outline"
                        className="border-green-400 text-green-400 hover:bg-green-400/10 px-8 py-3 transition-all duration-300"
                      >
                        Me contacter
                      </Button>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                  >
                    <ChevronDown className="w-8 h-8 text-green-400 animate-bounce" />
                  </motion.div>
                </div>
              </motion.section>
            )}

            {currentSection === 'about' && (
              <motion.section
                key="about"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="min-h-screen py-20 px-4"
              >
                <div className="max-w-6xl mx-auto">
                  <motion.h2
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-6xl font-bold text-green-400 mb-12 font-mono"
                  >
                    &gt; À propos_
                  </motion.h2>

                  <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="space-y-6"
                    >
                      <div className="hologram p-6 rounded-lg">
                        <h3 className="text-2xl font-bold text-green-400 mb-4 font-mono">
                          [PROFIL_UTILISATEUR]
                        </h3>
                        <p className="text-green-200 leading-relaxed mb-4">
                          Passionné par la cybersécurité depuis plus de 8 ans, je me spécialise 
                          dans l'identification et l'exploitation de vulnérabilités critiques. 
                          Mon expertise couvre l'ensemble du spectre de la sécurité informatique.
                        </p>
                        <p className="text-green-200 leading-relaxed">
                          J'ai participé à de nombreux programmes de bug bounty et aidé des 
                          entreprises Fortune 500 à sécuriser leurs infrastructures critiques.
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="neon-border p-4 rounded bg-black/50">
                          <div className="text-green-400 font-mono text-sm">CERTIFICATIONS</div>
                          <div className="text-green-200 text-xs mt-1">OSCP, CEH, CISSP</div>
                        </div>
                        <div className="neon-border p-4 rounded bg-black/50">
                          <div className="text-green-400 font-mono text-sm">EXPÉRIENCE</div>
                          <div className="text-green-200 text-xs mt-1">8+ années</div>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="relative"
                    >
                      <div className="circuit-pattern p-8 rounded-lg border border-green-400/30">
                        <img  
                          className="w-full h-64 object-cover rounded-lg neon-border"
                          alt="Hacker working on multiple monitors in a dark room"
                         src="https://images.unsplash.com/photo-1510915228340-29c85a43dcfe" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg"></div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.section>
            )}

            {currentSection === 'skills' && (
              <motion.section
                key="skills"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="min-h-screen py-20 px-4"
              >
                <div className="max-w-6xl mx-auto">
                  <motion.h2
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-6xl font-bold text-green-400 mb-12 font-mono"
                  >
                    &gt; Compétences_
                  </motion.h2>

                  <div className="mb-6">
                    <details open>
                      <summary className="text-2xl font-bold text-green-400 font-mono mb-4 cursor-pointer select-none">Cyber sécurité</summary>
                      <div className="grid md:grid-cols-2 gap-8 mt-2">
                        {skills.map((skill, index) => (
                          <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="hologram p-6 rounded-lg"
                          >
                            <div className="flex justify-between items-center mb-3">
                              <span className="text-green-400 font-mono font-semibold">
                                {skill.name}
                              </span>
                              <span className="text-green-300 font-mono text-sm">
                                {skill.level}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${skill.level}%` }}
                                transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                                className={`h-full bg-gradient-to-r ${skill.color} neon-glow`}
                              />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </details>
                    {/* Menu déroulant Développement Web */}
                    <details open className="mt-6">
                      <summary className="text-2xl font-bold text-blue-400 font-mono mb-4 cursor-pointer select-none">Développement Web</summary>
                      <div className="grid md:grid-cols-2 gap-8 mt-2">
                        <div className="hologram p-6 rounded-lg">
                          <span className="text-blue-400 font-mono font-semibold">React & Next.js</span>
                          <p className="text-blue-200 text-sm mt-2">Création d'applications web modernes, SPA et SSR, gestion d'état avancée.</p>
                        </div>
                        <div className="hologram p-6 rounded-lg">
                          <span className="text-blue-400 font-mono font-semibold">Node.js & Express</span>
                          <p className="text-blue-200 text-sm mt-2">Développement d'API RESTful, gestion de bases de données, authentification sécurisée.</p>
                        </div>
                        <div className="hologram p-6 rounded-lg">
                          <span className="text-blue-400 font-mono font-semibold">UI/UX & Responsive Design</span>
                          <p className="text-blue-200 text-sm mt-2">Conception d'interfaces intuitives, adaptatives et accessibles pour tous les supports.</p>
                        </div>
                      </div>
                    </details>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="mt-12 grid md:grid-cols-3 gap-6"
                  >
                    <div className="neon-border p-6 rounded-lg bg-black/50 text-center">
                      <Shield className="w-12 h-12 text-green-400 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-green-400 mb-2 font-mono">
                        Sécurité Défensive
                      </h3>
                      <p className="text-green-200 text-sm">
                        Protection des infrastructures et détection d'intrusions
                      </p>
                    </div>
                    <div className="neon-border p-6 rounded-lg bg-black/50 text-center">
                      <Zap className="w-12 h-12 text-green-400 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-green-400 mb-2 font-mono">
                        Tests d'Intrusion
                      </h3>
                      <p className="text-green-200 text-sm">
                        Évaluation proactive des vulnérabilités système
                      </p>
                    </div>
                    <div className="neon-border p-6 rounded-lg bg-black/50 text-center">
                      <Code className="w-12 h-12 text-green-400 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-green-400 mb-2 font-mono">
                        Développement Sécurisé
                      </h3>
                      <p className="text-green-200 text-sm">
                        Création d'outils et scripts de sécurité personnalisés
                      </p>
                    </div>
                    
                    <div className="neon-border p-6 rounded-lg bg-black/30 text-center"></div>
                    <div className="neon-border p-6 rounded-lg bg-black/30 text-center"></div>
                    <div className="neon-border p-6 rounded-lg bg-black/30 text-center"></div>
                    {/* 3 rectangles avec contenu */}
                    <div className="neon-border p-6 rounded-lg bg-black/30 text-center">
                      <h3 className="text-xl font-bold text-green-400 mb-2 font-mono">TryHackMe</h3>
                      <p className="text-green-200 text-sm">Plateforme d'apprentissage pratique en cybersécurité, idéale pour progresser sur des labs interactifs et des challenges variés.</p>
                    </div>
                    <div className="neon-border p-6 rounded-lg bg-black/30 text-center">
                      <h3 className="text-xl font-bold text-green-400 mb-2 font-mono">HackTheBox</h3>
                      <p className="text-green-200 text-sm">Environnement de pentest virtuel reconnu, permettant de s'entraîner sur des machines et scénarios réalistes.</p>
                    </div>
                    <div className="neon-border p-6 rounded-lg bg-black/30 text-center">
                      <h3 className="text-xl font-bold text-green-400 mb-2 font-mono">PortSwigger Academy</h3>
                      <p className="text-green-200 text-sm">Académie en ligne spécialisée dans la sécurité web, avec des tutoriels et labs sur les vulnérabilités OWASP.</p>
                    </div>
                  </motion.div>
                </div>
              </motion.section>
            )}

            {currentSection === 'projects' && (
              <motion.section
                key="projects"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="min-h-screen py-20 px-4"
              >
                <div className="max-w-6xl mx-auto">
                  <motion.h2
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-6xl font-bold text-green-400 mb-12 font-mono"
                  >
                    &gt; Projets_
                  </motion.h2>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                      <motion.div
                        key={project.title}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                        className="hologram p-6 rounded-lg hover:neon-glow transition-all duration-300 cursor-pointer group"
                        onClick={handleContactClick}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className={`px-3 py-1 rounded-full text-xs font-mono ${
                            project.status === 'Active' ? 'bg-green-400/20 text-green-400' :
                            project.status === 'Completed' ? 'bg-blue-400/20 text-blue-400' :
                            'bg-yellow-400/20 text-yellow-400'
                          }`}>
                            {project.status}
                          </div>
                          <ExternalLink className="w-5 h-5 text-green-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        
                        <h3 className="text-xl font-bold text-green-400 mb-3 font-mono">
                          {project.title}
                        </h3>
                        
                        <p className="text-green-200 text-sm mb-4 leading-relaxed">
                          {project.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 bg-black/50 border border-green-400/30 rounded text-xs text-green-300 font-mono"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="mt-12 text-center"
                  >
                    <Button
                      onClick={handleContactClick}
                      className="bg-green-400 hover:bg-green-500 text-black font-bold px-8 py-3 neon-glow transition-all duration-300"
                    >
                      <Github className="w-5 h-5 mr-2" />
                      Voir plus sur GitHub
                    </Button>
                  </motion.div>
                </div>
              </motion.section>
            )}

            {currentSection === 'contact' && (
              <motion.section
                key="contact"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="min-h-screen py-20 px-4"
              >
                <div className="max-w-4xl mx-auto text-center">
                  <motion.h2
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-6xl font-bold text-green-400 mb-12 font-mono"
                  >
                    &gt; Contact_
                  </motion.h2>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="hologram p-8 rounded-lg max-w-2xl mx-auto"
                  >
                    <h3 className="text-2xl font-bold text-green-400 mb-6 font-mono">
                      [ÉTABLIR_CONNEXION]
                    </h3>
                    
                    <p className="text-green-200 mb-8 leading-relaxed">
                      Prêt à collaborer sur des projets de cybersécurité ou besoin d'une 
                      expertise en sécurité ? Établissons une connexion sécurisée.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                      <Button
                        className="bg-green-400 hover:bg-green-500 text-black font-bold py-4 neon-glow transition-all duration-300 flex items-center justify-center"
                        onClick={handleSecureEmailClick}
                      >
                        <Mail className="w-5 h-5 mr-2" />
                        Email Sécurisé
                      </Button>
                      <Button
                        variant="outline"
                        className="border-green-400 text-green-400 hover:bg-green-400/10 py-4 transition-all duration-300 flex items-center justify-center"
                        onClick={() => window.open('https://github.com/Xeone971', '_blank', 'noopener,noreferrer')}
                      >
                        <Github className="w-5 h-5 mr-2" />
                        GitHub
                      </Button>
                    </div>

                    <div className="mt-8 p-4 bg-black/50 rounded border border-green-400/30">
                      <div className="text-green-400 font-mono text-sm mb-2">
                        root@cyberhacker:~$ gpg --fingerprint
                      </div>
                      <div className="text-green-300 font-mono text-xs">
                        pub   4096R/ABCD1234 2024-01-01<br />
                        Key fingerprint = 1234 5678 9ABC DEF0 1234 5678 9ABC DEF0 1234 5678
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </main>

        <Toaster />
      </div>
    </>
  );
}

export default App;