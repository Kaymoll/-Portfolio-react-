import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './index.css';

// Composant titre animé intégré
const AnimatedTitle = () => {
const [displayedText, setDisplayedText] = useState('');
const [currentIndex, setCurrentIndex] = useState(0);
const fullText = 'Mon Portfolio';

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(fullText.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 200); // Vitesse d'écriture

      return () => clearTimeout(timeout);
    }

  }, [currentIndex, fullText]);

  return (
    <motion.h2
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        background: 'transparent',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        color: 'var(--text-color)',
        fontFamily: 'Segoe UI, system-ui',
        fontSize: '2.5rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        minHeight: '3rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {displayedText}
    </motion.h2>
  );
};

// Composant Carte de Projet
const ProjectCard = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const projectData = {
    title: "De la Gestion de Projet...",
    description: "Il s'agissait ici de s'entraîner à planifier le développement d'une application ainsi que tous ses paramètres. L'exercice avait pour but d'appréhender tous les aspects de la gestion de projet, des sprints aux compétences nécessaires, jusqu'aux ressources humaines et les outils pouvant être utilisés pour répondre aux différentes problématiques",
    skills: [
      "Rédaction de spécifications techniques",
      "Trello", 
      "Wakelet",
      "Agilité"
    ],
    link: "Un peu plus loin"
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.div 
      className="project-showcase-card"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className={`project-card-inner ${isExpanded ? 'expanded' : ''}`}>
        
        {/* État initial - Vue centrée */}
        {!isExpanded && (
          <motion.div 
            className="initial-view"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="image-wrapper">
              <div className="logo-section">
                <div className="logo-card">
                  <div className="logo-text">
                    <div className="menu-text">MENU</div>
                    <div className="maker-text">MAKER</div>
                    <div className="by-text">BY</div>
                    <div className="qwenta-text">QWENTA</div>
                  </div>
                  <div className="solution-text">
                    <div>SOLUTION</div>
                    <div>TECHNIQUE</div>
                  </div>
                  <div className="webgencia-logo">
                    <span>W</span>
                    <span className="webgencia-text">Webgencia</span>
                  </div>
                </div>
              </div>
              <div className="gradient-image"></div>
            </div>
            
            <h3 className="project-title-center">{projectData.title}</h3>
            <div className="project-divider"></div>
            
            <motion.button 
              className="project-details-button" 
              onClick={toggleExpanded}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Détails du projet
            </motion.button>
          </motion.div>
        )}

        {/* État étendu - Vue avec layout horizontal */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div 
              className="expanded-view"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="left-section">
                <div className="node-fuand">NODE FUAND</div>
                <div className="expanded-image-wrapper">
                  <div className="logo-section-small">
                    <div className="logo-card-small">
                      <div className="logo-text-small">
                        <div className="menu-text-small">MENU</div>
                        <div className="maker-text-small">MAKER</div>
                        <div className="by-text-small">BY</div>
                        <div className="qwenta-text-small">QWENTA</div>
                      </div>
                      <div className="solution-text-small">
                        <div>SOLUTION</div>
                        <div>TECHNIQUE</div>
                      </div>
                      <div className="webgencia-logo-small">
                        <span>W</span>
                        <span className="webgencia-text-small">Webgencia</span>
                      </div>
                    </div>
                  </div>
                  <div className="gradient-image-expanded"></div>
                </div>
                
                <div className="skills-container">
                  {projectData.skills.map((skill, index) => (
                    <motion.span 
                      key={skill} 
                      className="skill-badge"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>

              <div className="right-section">
                <motion.h3 
                  className="project-title-right"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  {projectData.title}
                </motion.h3>
                <motion.div 
                  className="project-divider-right"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 300, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                ></motion.div>
                
                <motion.div 
                  className="project-description"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  {projectData.description}
                </motion.div>
                
                <motion.div 
                  className="project-link"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  <u>{projectData.link}</u>
                </motion.div>
                
                <motion.button 
                  className="return-button" 
                  onClick={toggleExpanded}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Retour
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Gestion du thème au chargement
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const isLight = savedTheme === 'light';
    setIsDarkTheme(!isLight);
    
    if (isLight) {
      document.body.setAttribute('data-theme', 'light');
    } else {
      document.body.removeAttribute('data-theme');
    }
  }, []);

  // Fonction pour changer le thème
  const toggleTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    
    if (!newTheme) {
      document.body.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    } else {
      document.body.removeAttribute('data-theme');
      localStorage.setItem('theme', 'dark');
    }
  };

  // Animations variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="App">
      {/* Header animation */}
      <motion.header 
        className="header"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div 
          className="logo"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Camille Lucidarme
        </motion.div>
        
        <motion.div 
          className="toggle-switch"
          whileTap={{ scale: 0.95 }}
        >
          <label className="theme-switch">
            <input 
              type="checkbox" 
              checked={!isDarkTheme}
              onChange={toggleTheme}
            />
            <span className="slider"></span>
          </label>
        </motion.div>
      </motion.header>

      {/* Portfolio animations */}
      <motion.section 
        id="portfolio" 
        className="portfolio"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        {/* Titre animé */}
        <AnimatedTitle />
        
        {/* Catégories avec animation en cascade */}
        <motion.div 
          className="portfolio-categories"
          variants={staggerContainer}
        >
          {[
            {
              title: "Développement d'application",
              desc: "Développer de la programmation orientée objet, en utilisant des langages tels que Java/JEE. Pour le moment rien d'innovant mais j'acquiert des bases solides."
            },
            {
              title: "Création de site Web", 
              desc: "Créer des interfaces visuellement attrayantes en mettant l'accent sur l'esthétique et la cohérence de la marque ou du domaine professionnel."
            },
            {
              title: "Plateforme d'automatisation",
              desc: "Concevoir des systèmes automatisés et sécurisés avec fonctionnalités d'IA natives, alliant la flexibilité du code et la rapidité du no-code, afin d'améliorer l'expérience utilisateur et la productivité."
            }
          ].map((category, index) => (
            <motion.div
              key={index}
              className="category-card"
              variants={scaleIn}
              whileHover={{ 
                scale: 1.05, 
                y: -5,
                transition: { duration: 0.3 }
              }}
            >
              <h4>{category.title}</h4>
              <p>{category.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Mes projets */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h3 
            style={{ 
              fontSize: '2rem', 
              color: 'var(--text-color)', 
              marginTop: '4rem',
              marginBottom: '2rem',
              textAlign: 'center'
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Projet en vedette
          </motion.h3>
          <ProjectCard />
        </motion.div>

        {/* Carte principale avec animation */}
        <motion.div 
          className="portfolio-card"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
          whileHover={{ 
            scale: 1.02,
            boxShadow: "0 20px 40px rgba(124, 142, 231, 0.2)",
            transition: { duration: 0.3 }
          }}
        >
          <h3>Plus de détails ?</h3>
          <p>Découvrez mes projets depuis mon profil Github et échanger avec moi.</p>

          <motion.div 
            className="portfolio-buttons"
            variants={staggerContainer}
          >
            <motion.a
              target="_blank"
              href="https://github.com/Kaymoll"
              className="btn-primary"
              variants={scaleIn}
              whileHover={{ 
                scale: 1.05, 
                y: -3,
                boxShadow: "0 10px 20px rgba(124, 142, 231, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              🔗 Profil Github
            </motion.a>
            
            <motion.a
              target="_blank"
              href="https://cvcam.netlify.app/"
              className="btn-secondary"
              variants={scaleIn}
              whileHover={{ 
                scale: 1.05, 
                y: -3,
                backgroundColor: "var(--border-color)",
                color: "var(--color-btn1)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              🔗 Mon e-CV
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Footer animation */}
      <motion.footer 
        className="footer"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p>© 2025 Camille Lucidarme. Tous droits réservés.</p>
        <motion.div 
          className="footer-links"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p>
            <motion.a
              target="_blank"
              href="https://www.linkedin.com/in/camillelucidarme/"
              style={{ color: '#959ECB', textDecoration: 'none' }}
              whileHover={{ color: '#7c8ee7', scale: 1.05 }}
            >
              LinkedIn
            </motion.a> |{' '}
            <motion.a
              target="_blank"
              href="https://github.com/Kaymoll"
              style={{ color: '#959ECB', textDecoration: 'none' }}
              whileHover={{ color: '#7c8ee7', scale: 1.05 }}
            >
              Github
            </motion.a> |{' '}
            <motion.a
              href="mailto:camillelcd7@gmail.com"
              style={{ color: '#959ECB', textDecoration: 'none' }}
              whileHover={{ color: '#7c8ee7', scale: 1.05 }}
            >
              E-mail
            </motion.a>
          </p>
        </motion.div>
      </motion.footer>
    </div>
  );
}

export default App;
