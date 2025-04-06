
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const Index = () => {
  // Usando o hook de interseção único
  useIntersectionObserver();
  
  useEffect(() => {
    document.title = "MCM Tecnologia | Soluções em Desenvolvimento de Software";
    
    // Adicionamos um id para a seção de topo
    const mainElement = document.querySelector('main');
    if (mainElement && !mainElement.id) {
      mainElement.id = 'top';
    }
    
    // Smooth scroll to hash on page load
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 500);
    }
    
    // Adicionar classe para animação inicial - só se ainda não tiver sido animado
    const mainContent = document.querySelector('main');
    if (mainContent && !mainContent.classList.contains('animate-fade-in')) {
      mainContent.classList.add('animate-fade-in');
    }
    
    // Melhorar a navegação pelos links de âncora
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.hash && anchor.hash.startsWith('#') && document.querySelector(anchor.hash)) {
        e.preventDefault();
        const section = document.querySelector(anchor.hash);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };
    
    document.addEventListener('click', handleAnchorClick);
    
    // Adicionar CSS global para resolver problemas de clique e impedir seleção de texto
    const style = document.createElement('style');
    style.innerHTML = `
      /* Estilos para os botões da Hero */
      .tech-hero-button {
        box-shadow: 0 0 15px rgba(46, 169, 255, 0.4);
      }
      
      .tech-hero-button:hover {
        box-shadow: 0 0 20px rgba(46, 169, 255, 0.6);
      }
      
      .tech-hero-button-outline:hover {
        box-shadow: 0 0 15px rgba(46, 169, 255, 0.3);
      }
      
      @keyframes flow {
        0%, 100% { transform: translateX(-100%); }
        50% { transform: translateX(100%); }
      }
      
      @keyframes flow-x {
        0%, 100% { transform: translateX(-100%); }
        50% { transform: translateX(100%); }
      }

      /* Garantir que apenas elementos que são realmente clicáveis interceptem eventos */
      .fixed, .absolute {
        pointer-events: none;
      }
      
      /* Restaurar eventos de ponteiro para elementos que precisam ser clicáveis */
      button, a, input, textarea, select, .tech-button, .tech-nav-link, 
      .tech-mobile-nav-link, .tech-logo, .project-card,
      .drawer-content, .drawer-trigger, .DrawerContent, .DrawerTrigger,
      .tech-mobile-cta, .carousel-root, .control-arrow, .dot {
        pointer-events: auto;
      }
      
      /* Garantir que elementos de overlay não interfiram com cliques */
      .bg-code-pattern, .tech-circuit-lines, [class*="bg-gradient"],
      .tech-particles, .tech-grid-lines {
        pointer-events: none !important;
      }
      
      /* Impedir seleção de texto durante o arrasto do carousel */
      .carousel-root, .carousel-slider, .carousel, .slider-wrapper, .slider, .carousel .slide {
        user-select: none !important;
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
      }

      /* Prevenir seleção de texto em todos os elementos de carousel */
      .carousel-item, .carousel-item * {
        user-select: none !important;
      }

      /* Estilos específicos para embla carousel */
      .embla, .embla__container, .embla__slide {
        user-select: none !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="min-h-screen bg-mcm-black text-white overflow-x-hidden">
      <Navbar />
      <main id="top" className="opacity-0 transition-opacity duration-500" style={{ animationDelay: '0.1s' }}>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
      
      {/* Background elements - adicionando pointer-events: none */}
      <div className="fixed top-20 left-10 w-64 h-64 rounded-full bg-mcm-DEFAULT/5 blur-3xl pointer-events-none"></div>
      <div className="fixed bottom-20 right-10 w-96 h-96 rounded-full bg-mcm-DEFAULT/5 blur-3xl pointer-events-none"></div>
    </div>
  );
};

export default Index;
