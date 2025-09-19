import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './index.css';
import { Analytics } from "@vercel/analytics/react"

// Composant titre animé
const AnimatedTitle = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const fullText = 'Portfolio';

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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        background: 'transparent',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        color: 'var(--text-color)',
        fontFamily: 'Segoe UI, system-ui',
        fontSize: '2.5rem',
        fontWeight: 'bold',
        margin: '2rem',
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

// Composant ProjectCard
const ProjectCard = ({ projectData, isActive }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`single-project-card ${isExpanded ? 'expanded' : ''} ${isActive ? 'active' : ''}`}>
      <motion.div 
        className={`project-card-content ${isExpanded ? 'expanded' : ''}`}
        layout
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        
        {/* État initial - Vue centrée */}
        {!isExpanded && (
          <motion.div 
            className="card-initial-view"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Image du projet */}
            <motion.div 
              className="card-image-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img 
                src={projectData.image} 
                alt={projectData.title}
                className="card-image-preview"
              />
            </motion.div>
            
            <h3 className="card-title-center">{projectData.title}</h3>
            <div className="card-divider"></div>
            
            <motion.button 
              className="card-details-button" 
              onClick={toggleExpanded}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              Détails du projet
            </motion.button>
          </motion.div>
        )}

        {/* État étendu - Vue avec layout horizontal */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div 
              className="card-expanded-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="card-left-section">
                {/* Image du projet - complètement visible */}
                <motion.div 
                  className="card-image-expanded-container"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <img 
                    src={projectData.image} 
                    alt={projectData.title}
                    className="card-image-expanded"
                  />
                </motion.div>

                <div className="card-skills-container">
                  {projectData.skills.map((skill, index) => (
                    <motion.span 
                      key={skill} 
                      className="card-skill-badge"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>

              <div className="card-right-section">
                <motion.h3 
                  className="card-title-right"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  {projectData.title}
                </motion.h3>
                <motion.div 
                  className="card-divider-right"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: '100%', opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                ></motion.div>
                
                <motion.div 
                  className="card-description"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  {projectData.description}
                </motion.div>
                
                <motion.div 
                  className="card-link"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  {projectData.link?.url ? (
                    <a href={projectData.link.url} target="_blank" rel="noopener noreferrer">
                      <u>{projectData.link.text}</u>
                    </a>
                  ) : (
                    <u>{projectData.link}</u>
                  )}
                </motion.div>
                
                <motion.button 
                  className="card-return-button" 
                  onClick={toggleExpanded}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  Retour
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

// Composants carrousel 
const SimpleProjectCarousel = ({ projects }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToSlide = (index) => {
    if (index === currentIndex || isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex(index);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  };

  const goToNext = () => {
    const newIndex = currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  };

  return (
    <div className="simple-carousel-container">
      {/* Navigation par points */}
      <div className="carousel-navigation">
        {projects.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            disabled={isTransitioning}
          />
        ))}
      </div>

      {/* Container principal de la carte */}
      <div className="carousel-main-container">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="carousel-card-wrapper"
        >
          <ProjectCard 
            projectData={projects[currentIndex]} 
            isActive={true}
          />
        </motion.div>
      </div>

      <div className="carousel-arrows">
        <button
          className="carousel-arrow left"
          onClick={goToPrevious}
          disabled={isTransitioning}
        >
          &lt;
        </button>
        <button
          className="carousel-arrow right"
          onClick={goToNext}
          disabled={isTransitioning}
        >
          &gt;
        </button>
      </div>

      {/* Indicateur de progression */}
      <div className="carousel-counter">
        {currentIndex + 1} / {projects.length}
      </div>
    </div>
  );
};

  // Composant Thème Dark/light
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

  // Définition des données des projets

  const projectData7 = {
    image: "projet.png",
    title: "De la conception au déploiement",
    description: "Mon premier projet Full Stack dont je n'imaginais pas l'ampleur mais que je compte mener à bien. Le but est de concevoir une appli Web qui pourras servir à une Startup, en assurant la sécuritées des données (Paiement, Auth (RLS), etc.) et en m'assurant de la qualité du code.",
    skills: [
      "Architecture MVP",
      "Full Stack",
      "API",
      "PostgreSQL",
      "Authentification", 
      "MétaDonnées",
      "Paiement en Ligne"
    ],
    link: { text: "Projet en cours", url: "https://github.com/Kaymoll/COC" },
  };


  const projectData6 = {
    image: "projet6.png",
    title: "Application Portfolio",
    description: "Grâce à Create React App, j'ai fait mes premiers pas en React où j'ai pu concevoir ce portfolio. La principale difficulté ici a été de comprendre en profondeur le fonctionnement de React, et de maitriser son fonctionnement afin de développer un code solide et le plus automatisé possible.",
    skills: [
      "React Community",
      "Typescript",
      "Tailwind",
      "Node.js",
      "Test/Debug",
      "SaSS",
    ],
    link: { text: "Voir le code", url: "https://github.com/Kaymoll/-Portfolio-react-" }
  };

  const projectData5 = {
    image: "projet5.png",
    title: "Un peu de Back-end !",
    description: "Il s'agissait ici de s'entraîner à apprendre la programmation orientée objet en Java. L'objectif était de créer une application simple en utilisant les concepts de POO.",
    skills: [
      "Java",
      "IntelliJ IDEA",
      "POO"
    ],
    link: { text: "Un peu plus loin", url: "https://github.com/Kaymoll/Apprentissage-JAVA" }
  };

  const projectData4 = {
    image: "projet4.png",
    title: "Que du Front-end",
    description: "Projet qui consistait à créer une page d'accueil responsive et attrayante avec quelques fonctionnalitées.",
    skills: [
      "Javascript",
      "HTML5",
      "CSS3",
      "Responsive Design"
    ],
    link: { text: "Voir mon e-CV", url: "https://cvcam.netlify.app/" }
  };

  const projectData3 = {
    image: "projet3.png",
    title: "Générateur de Mot de Passe",
    description: "Une application colorée qui permet de générer des mots de passe, en utilisant des algorithmes de génération aléatoire et de m'améliorer en CSS.",
    skills: [
      "Javascript",
      "HTML5", 
      "SCSS",
      "Base de données"
    ],
    link: { text: "Découvrir", url: "https://kaymoll.github.io/Smalls-Projects/GenerateurMDP.html" }
  };

  const projectData2 = {
    image: "projet2.png",
    title: "Brick Breaker",
    description: "Un niveau classique de casse-briques développé en JavaScript. Ce projet avait pour but de développer le dynamisme et l'interaction entre l'utilisateur et l'application. Le plus compliqué a été de gérer les collisions entre la balle, la raquette et les briques.",
    skills: [
      "Javascript",
      "HTML5",
      "CSS3",
    ],
    link: { text: "Voir le jeu", url: "https://kaymoll.github.io/Smalls-Projects/JeuCasseBrique.html" }
  };

    const projectData1 = {
    image: "projet1.png",
    title: "Calculatrice",
    description: "Le but était de reprendre mon projet de mon stage chez M2i, cette fois ci en Javascript. Cela m'a permis de travailler à la fois la logique, mais aussi l'écriture et l'expression en programmation.",
    skills: [
      "Javascript",
      "CSS3",
      "Base de données",
    ],
    link: { text: "Voir l'application", url: "https://kaymoll.github.io/Smalls-Projects/Calculatrice.html" }
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
          whileHover={{ y: -2 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Camille Lucidarme
        </motion.div>
        
        <motion.div 
          className="toggle-switch"
          whileTap={{ opacity: 0.8 }}
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

        <AnimatedTitle />

        {/* Mes projets */}
        <SimpleProjectCarousel projects={[projectData7, projectData6, projectData5, projectData4, projectData3, projectData2, projectData1]} />

        {/* Portfolio contact */}
        <motion.div 
          className="portfolio-card"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
          whileHover={{ scale: 1.02, boxShadow: "0 10px 20px rgba(124, 142, 231, 0.3)", transition: { duration: 0.3 } }}
        >
          <h3>En savoir plus ?</h3>
          <p>Découvrez mes projets depuis mon profil Github ou visiter mon CV pour mieux me connaître</p>

          <motion.div 
            className="portfolio-buttons"
            variants={staggerContainer}
          >
            <motion.a
              target="_blank"
              href="https://github.com/Kaymoll"
              className="btn-primary"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'inline-block' }}
            >
              🔗 Profil Github
            </motion.a>
            
            <motion.a
              target="_blank"
              href="https://cvcam.netlify.app/"
              className="btn-secondary"
              initial={{ scale: 1 }}
              whileHover={{ 
                scale: 1.05, y: -3,
                backgroundColor: "var(--border-color)",
                color: "var(--color-btn1)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'inline-block' }}
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
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p>
            <motion.a
              target="_blank"
              href="https://www.linkedin.com/in/camillelucidarme/"
              style={{ color: '#959ECB', textDecoration: 'none' }}
              whileHover={{ color: '#7c8ee7', y: -1 }}
            >
              LinkedIn
            </motion.a> |{' '}
            <motion.a
              target="_blank"
              href="https://github.com/Kaymoll"
              style={{ color: '#959ECB', textDecoration: 'none' }}
              whileHover={{ color: '#7c8ee7', y: -1 }}
            >
              Github
            </motion.a> |{' '}
            <motion.a
              href="mailto:camillelcd7@gmail.com"
              style={{ color: '#959ECB', textDecoration: 'none' }}
              whileHover={{ color: '#7c8ee7', y: -1 }}
            >
              E-mail
            </motion.a>
          </p>
        </motion.div>
      </motion.footer>
      <Analytics />
    </div>
  );
}

export default App;
