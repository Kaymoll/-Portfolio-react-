import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

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

  const fadeInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
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
      {/* Header avec animation */}
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
          whileHover={{ scale: 1.1 }}
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

      {/* Section Portfolio avec animations */}
      <motion.section 
        id="portfolio" 
        className="portfolio"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.h2 variants={fadeInUp}>
          Portfolio
        </motion.h2>
        
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
          <h3>Voir mon portfolio</h3>
          <p>Découvrez mes projets depuis mon profil Github et mon portfolio.</p>
          
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
              href="https://kaymoll.github.io/Portfolio/"
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
              🔗 Mon Portfolio
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Footer avec animation */}
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
