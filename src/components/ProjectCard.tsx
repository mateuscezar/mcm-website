
import React, { useCallback, useState } from 'react';
import { Project } from '../data/projectsData';

interface ProjectCardProps {
  project: Project;
  onClick: (e: React.MouseEvent) => void;
}

const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
  const [touchStartTime, setTouchStartTime] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchStartY, setTouchStartY] = useState(0);
  const [isTouchMoving, setIsTouchMoving] = useState(false);
  const [isCardPressed, setIsCardPressed] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Função para tratar o clique e evitar propagação para o carousel
  const handleClick = useCallback((e: React.MouseEvent) => {
    // Impedir que o evento se propague para o carousel
    e.stopPropagation();
    onClick(e);
  }, [onClick]);

  // Melhorados os eventos de toque para distinguir entre arrastar e clicar
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchStartTime(Date.now());
    setTouchStartX(e.touches[0].clientX);
    setTouchStartY(e.touches[0].clientY);
    setIsTouchMoving(false);
    setIsCardPressed(true);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const moveX = Math.abs(e.touches[0].clientX - touchStartX);
    const moveY = Math.abs(e.touches[0].clientY - touchStartY);
    
    // Se moveu mais que 10px em qualquer direção, considerar como arrasto
    if (moveX > 10 || moveY > 10) {
      setIsTouchMoving(true);
      setIsCardPressed(false);
    }
  }, [touchStartX, touchStartY]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const touchDuration = Date.now() - touchStartTime;
    setIsCardPressed(false);
    
    // Se o toque foi curto (menos de 300ms) e não houve movimento significativo, tratar como clique
    if (touchDuration < 300 && !isTouchMoving) {
      // Criar um evento sintético e chamar diretamente a função onClick
      onClick({
        stopPropagation: () => {},
        preventDefault: () => {},
        currentTarget: e.currentTarget
      } as unknown as React.MouseEvent);
    }
    // Reset do estado
    setTouchStartTime(0);
  }, [onClick, touchStartTime, isTouchMoving]);

  // Imagem padrão para quando houver erro no carregamento
  const defaultImage = "/lovable-uploads/104a5fd2-7162-4f23-89e4-5c50b0ba6637.png";

  return (
    <div 
      role="button"
      aria-label={`Ver detalhes do projeto ${project.title}`}
      tabIndex={0}
      className={`project-card group h-full flex flex-col cursor-pointer bg-mcm-navy/30 backdrop-blur-sm border border-mcm-light/10 rounded-lg overflow-hidden hover:border-mcm-light/30 transition-all duration-300 ${isCardPressed ? 'scale-95 border-mcm-light/40' : ''}`}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick(e as unknown as React.MouseEvent);
        }
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={() => {
        setIsCardPressed(false);
        setIsTouchMoving(false);
      }}
    >
      {/* Project Image */}
      <div className="project-image-container relative overflow-hidden h-48 flex items-center justify-center bg-mcm-navy/50">
        <img 
          src={imgError ? defaultImage : project.thumbnail} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
          onError={() => setImgError(true)}
        />
        
        {/* Efeitos visuais */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-mcm-navy/80 opacity-70"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-mcm-light/30 to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-700"></div>
        <div className="absolute inset-0 border-2 border-transparent opacity-0 group-hover:border-mcm-light/50 group-hover:opacity-100 transition-all duration-500"></div>
        <div className="absolute inset-0 tech-circuit-lines opacity-0 group-hover:opacity-40 transition-opacity duration-700"></div>
        
        {/* Indicador visual de que é clicável (especialmente útil para mobile) */}
        <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-mcm-light/50 opacity-100 animate-pulse"></div>
      </div>
      
      {/* Content */}
      <div className="p-4 md:p-6 relative z-10 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-2 text-white group-hover:text-mcm-light transition-colors">{project.title}</h3>
        <p className="text-gray-300 mb-4 text-sm flex-grow">{project.shortDescription}</p>
        
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="tech-tag">
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="tech-tag">
              +{project.tags.length - 3}
            </span>
          )}
        </div>
      </div>
      
      {/* Elementos de feedback tátil para mobile */}
      <div className="absolute inset-0 bg-mcm-light/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute bottom-2 left-0 right-0 mx-auto w-16 h-1 bg-mcm-light/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
};

export default ProjectCard;
