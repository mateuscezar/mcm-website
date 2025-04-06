import { useState, useCallback, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { projects as baseProjects } from '../data/projectsData';
import ResponsiveCarousel from './ResponsiveCarousel';
import { useIsMobile } from '@/hooks/use-mobile';

const Projects = () => {
  const [projects] = useState(baseProjects);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [autoplay, setAutoplay] = useState(true);
  const isMobile = useIsMobile();
  
  // Criar mais 2 projetos para demonstrar a funcionalidade
  const allProjects = [
    ...projects,
    {
      id: projects.length + 1,
      title: "Sistema de Automação Industrial",
      shortDescription: "Solução completa para automação de processos industriais com monitoramento em tempo real.",
      description: "Sistema avançado de automação industrial que permite o monitoramento e controle remoto de todos os processos produtivos. Integração com sensores IoT e painéis de controle em tempo real para maximizar a eficiência operacional.",
      thumbnail: "/lovable-uploads/104a5fd2-7162-4f23-89e4-5c50b0ba6637.png",
      tags: ["IoT", "Indústria 4.0", "Dashboard", "React", "Node.js"],
      images: [
        { url: "/lovable-uploads/104a5fd2-7162-4f23-89e4-5c50b0ba6637.png", alt: "Dashboard de controle", description: "Dashboard interativo para monitoramento de operações em tempo real" },
        { url: "/lovable-uploads/104a5fd2-7162-4f23-89e4-5c50b0ba6637.png", alt: "Sensores IoT", description: "Rede de sensores IoT para coleta de dados precisos em toda a linha de produção" }
      ]
    },
    {
      id: projects.length + 2,
      title: "Plataforma de Análise de Dados",
      shortDescription: "Ferramenta avançada para análise e visualização de grandes volumes de dados.",
      description: "Plataforma de análise de dados que utiliza algoritmos de machine learning para processar grandes volumes de informações e gerar insights valiosos para tomada de decisões estratégicas.",
      thumbnail: "/lovable-uploads/104a5fd2-7162-4f23-89e4-5c50b0ba6637.png",
      tags: ["Big Data", "Machine Learning", "Python", "Visualização", "Dashboard"],
      images: [
        { url: "/lovable-uploads/104a5fd2-7162-4f23-89e4-5c50b0ba6637.png", alt: "Painel de análise", description: "Interface intuitiva para exploração e análise de conjuntos complexos de dados" },
        { url: "/lovable-uploads/104a5fd2-7162-4f23-89e4-5c50b0ba6637.png", alt: "Modelos preditivos", description: "Modelos preditivos baseados em machine learning para identificar tendências e oportunidades" }
      ]
    }
  ];
  
  // Utilizamos useEffect para adicionar CSS global para melhorar eventos de toque
  useEffect(() => {
    // Adiciona estilo para melhorar interações em dispositivos móveis
    const style = document.createElement('style');
    style.innerHTML = `
      /* Melhorias para eventos de toque em dispositivos móveis */
      @media (max-width: 768px) {
        * {
          touch-action: manipulation;
        }
        .tech-card-wrapper {
          min-height: 400px;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .carousel-active {
          overflow: hidden;
        }
      }
      
      /* Fixar problemas de clique em elementos ao redor das bordas */
      .tech-particles, .tech-grid-lines, .absolute {
        pointer-events: none !important;
      }
      
      /* Garantir que elementos de fundo não interfiram nos cliques */
      .bg-code-pattern, .tech-circuit-lines, [class*="bg-gradient"] {
        pointer-events: none !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  // Abrir modal de projeto
  const openProjectModal = useCallback((projectId: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedProject(projectId);
  }, []);

  const closeProjectModal = useCallback(() => {
    setSelectedProject(null);
  }, []);
  
  const selectedProjectData = selectedProject !== null 
    ? allProjects.find(p => p.id === selectedProject) 
    : null;
  
  // Pausar o autoplay quando o mouse estiver sobre os projetos
  const handleMouseEnter = useCallback(() => {
    setAutoplay(false);
  }, []);
  
  const handleMouseLeave = useCallback(() => {
    setAutoplay(true);
  }, []);

  // Preparar os slides com base no dispositivo (mobile ou desktop)
  const carouselItems = [];
  
  if (isMobile) {
    // Em dispositivos móveis, exibe 1 projeto por slide
    allProjects.forEach((project) => {
      carouselItems.push(
        <div key={project.id} className="w-full px-4 py-2 tech-card-wrapper">
          <ProjectCard 
            project={project}
            onClick={(e) => openProjectModal(project.id, e)}
          />
        </div>
      );
    });
  } else {
    // Em desktop, exibe 3 projetos por slide (ou menos se não tiver 3)
    for (let i = 0; i < allProjects.length; i += 3) {
      const slideProjects = allProjects.slice(i, i + 3);
      carouselItems.push(
        <div key={i} className="flex flex-wrap justify-center py-4 h-full">
          {slideProjects.map((project) => (
            <div key={project.id} className="w-full md:w-1/2 lg:w-1/3 p-3 h-full tech-card-wrapper">
              <ProjectCard 
                project={project}
                onClick={(e) => openProjectModal(project.id, e)}
              />
            </div>
          ))}
        </div>
      );
    }
  }

  return (
    <section id="projetos" className="py-20 bg-mcm-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-20 left-1/3 w-96 h-96 rounded-full bg-mcm-light/5 blur-[100px]"></div>
      <div className="absolute bottom-40 -right-20 w-96 h-96 rounded-full bg-mcm-light/5 blur-[100px]"></div>
      <img 
        src="/lovable-uploads/104a5fd2-7162-4f23-89e4-5c50b0ba6637.png" 
        alt="Tech background element" 
        className="absolute right-0 top-0 w-1/4 opacity-10 pointer-events-none"
      />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 section-reveal">Nossos <span className="glow-text">Projetos</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto section-reveal opacity-0" style={{ animationDelay: '0.2s' }}>
            Conheça alguns dos projetos desenvolvidos com soluções tecnológicas modernas e inovadoras.
          </p>
        </div>
        
        <div 
          className="relative tech-grid-container"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Elementos decorativos */}
          <div className="tech-grid-lines pointer-events-none"></div>
          
          {/* Instrução para usuários mobile */}
          {isMobile && (
            <div className="text-center mb-4 text-xs text-gray-400">
              <p>Toque no card para ver detalhes ou deslize para navegar</p>
            </div>
          )}
          
          {/* Carrossel de projetos usando o componente atualizado */}
          <ResponsiveCarousel 
            autoPlay={autoplay}
            interval={5000}
            showStatus={false}
            className="tech-projects-carousel min-h-[420px] md:min-h-[480px]"
            emulateTouch={true}
            swipeable={true}
            infiniteLoop={true}
            dynamicHeight={false}
            showThumbs={false}
          >
            {carouselItems}
          </ResponsiveCarousel>
        </div>
        
        <div className="mt-12 text-center section-reveal opacity-0" style={{ animationDelay: '0.8s' }}>
          <a 
            href="#contato" 
            className="view-more-btn inline-flex items-center"
            onClick={(e) => {
              e.preventDefault();
              const contato = document.getElementById('contato');
              if (contato) contato.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span className="mr-2">Tem um projeto em mente? Vamos conversar</span>
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
      
      {/* Project Modal */}
      {selectedProjectData && (
        <ProjectModal
          isOpen={selectedProject !== null}
          onClose={closeProjectModal}
          title={selectedProjectData.title}
          description={selectedProjectData.description}
          images={selectedProjectData.images}
          tags={selectedProjectData.tags}
          url={selectedProjectData.url}
        />
      )}
      
      {/* Elementos tecnológicos decorativos no fundo */}
      <div className="tech-particles pointer-events-none"></div>
      <div className="absolute inset-0 bg-code-pattern opacity-5 pointer-events-none"></div>
    </section>
  );
};

export default Projects;
