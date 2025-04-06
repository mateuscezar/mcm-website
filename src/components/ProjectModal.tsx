
import React, { useCallback, useEffect, useState } from 'react';
import { X, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { useIsMobile } from '@/hooks/use-mobile';

interface ProjectImage {
  url: string;
  alt: string;
  description: string;
}

interface ProjectModalProps {
  title: string;
  description: string;
  images: ProjectImage[];
  tags: string[];
  url?: string;
  onClose: () => void;
  isOpen: boolean;
}

const ProjectModal = ({
  title,
  description,
  images,
  tags,
  url,
  onClose,
  isOpen
}: ProjectModalProps) => {
  const [isClosing, setIsClosing] = useState(false);
  const isMobile = useIsMobile();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isImageExpanded, setIsImageExpanded] = useState(false);

  if (!isOpen) return null;

  // Close modal com animação
  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  }, [onClose]);

  // Close modal when Escape is pressed
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handleClose();
    };
    
    window.addEventListener('keydown', handleEsc);
    
    // Prevent body scrolling while modal is open
    document.body.style.overflow = 'hidden';
    
    // Esconder o menu quando a modal estiver aberta
    const header = document.querySelector('header');
    if (header) {
      header.style.visibility = 'hidden';
    }
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
      
      // Mostrar o menu novamente quando a modal for fechada
      if (header) {
        header.style.visibility = 'visible';
      }
    };
  }, [handleClose]);

  // Handle click outside to close
  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (isImageExpanded) return;
    e.stopPropagation();
    handleClose();
  }, [handleClose, isImageExpanded]);
  
  const handleModalClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  // Expandir imagem
  const toggleImageExpand = useCallback(() => {
    setIsImageExpanded(prev => !prev);
  }, []);

  return (
    <div 
      className={`fixed inset-0 flex items-center justify-center z-[100] bg-black bg-opacity-80 backdrop-blur-sm p-4 overflow-hidden transition-opacity duration-300 ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}
      onClick={handleBackdropClick}
    >
      <div 
        className={`project-modal tech-modal w-full max-w-4xl overflow-y-auto transition-transform duration-300 ${
          isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
        } bg-gradient-to-br from-mcm-navy/95 to-mcm-navy/80 backdrop-blur-md border border-mcm-light/20 rounded-lg`}
        onClick={handleModalClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        style={{ 
          maxHeight: isMobile ? 'calc(100vh - 32px)' : '90vh'
        }}
      >
        {/* Header com efeito de borda luminosa */}
        <div className="relative p-4 md:p-6 flex justify-between items-center bg-mcm-navy/95 z-10 sticky top-0 before:content-[''] before:absolute before:inset-x-0 before:bottom-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-mcm-light/50 before:to-transparent">
          <div id="project-modal-title" className="text-xl md:text-2xl font-bold text-mcm-light relative">
            {title}
            <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-mcm-light/70 to-transparent"></div>
          </div>
          
          <button 
            onClick={handleClose}
            className="p-2 hover:bg-mcm-light/20 rounded-full transition-colors relative active:scale-95 tech-button"
            aria-label="Fechar"
          >
            <X size={24} className="text-mcm-light" />
          </button>
        </div>
        
        {/* Layout em grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 md:p-6">
          {/* Coluna esquerda: Imagem/Carrossel */}
          <div className="md:col-span-8 relative">
            <div 
              className={`carousel-container w-full rounded-lg overflow-hidden transition-all duration-300 border-2 border-mcm-light/10 bg-black/30 ${
                isImageExpanded ? 'fixed inset-4 z-[101]' : ''
              }`}
            >
              <Carousel 
                className="w-full"
                opts={{
                  align: "center",
                  loop: true,
                }}
              >
                <CarouselContent className="m-0 p-0">
                  {images.map((image, index) => (
                    <CarouselItem key={index} className="p-0 m-0 w-full">
                      <div className="w-full flex flex-col relative">
                        <img 
                          src={image.url} 
                          alt={image.alt} 
                          className={`w-full object-contain cursor-pointer transition-all duration-300 ${
                            !isImageExpanded ? 'max-h-[50vh]' : 'max-h-[85vh]'
                          }`}
                          onClick={toggleImageExpand}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "/lovable-uploads/104a5fd2-7162-4f23-89e4-5c50b0ba6637.png";
                          }}
                        />
                        {image.description && (
                          <div className="py-2 px-4 text-sm text-center text-gray-300 bg-black/20 backdrop-blur-sm">
                            {image.description}
                          </div>
                        )}
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="absolute left-2 top-1/2 -translate-y-1/2 z-20">
                  <CarouselPrevious className="bg-mcm-navy/80 hover:bg-mcm-navy/90 text-mcm-light border-mcm-light/20" />
                </div>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 z-20">
                  <CarouselNext className="bg-mcm-navy/80 hover:bg-mcm-navy/90 text-mcm-light border-mcm-light/20" />
                </div>
                
                {/* Botão de expandir/contrair quando a imagem está expandida */}
                {isImageExpanded && (
                  <button 
                    className="absolute top-4 right-4 bg-mcm-navy/80 hover:bg-mcm-navy/90 text-white p-2 rounded-full z-30"
                    onClick={toggleImageExpand}
                  >
                    <X size={24} />
                  </button>
                )}
              </Carousel>
            </div>
          </div>
          
          {/* Coluna direita: Descrição e tags */}
          <div className="md:col-span-4 flex flex-col justify-between h-full">
            {/* Descrição do projeto */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2 text-mcm-light border-l-2 border-mcm-light pl-2">
                Sobre o projeto
              </h3>
              <div className="text-gray-300 mb-6 pl-3 relative">
                <span className="absolute top-0 left-0 bottom-0 w-[1px] bg-gradient-to-b from-mcm-light/0 via-mcm-light/20 to-mcm-light/0"></span>
                {description}
              </div>
              
              {url && (
                <a 
                  href={url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 pl-3 text-mcm-light hover:underline"
                >
                  <span>Visitar projeto</span>
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
            
            {/* Tags do projeto */}
            <div>
              <h3 className="text-lg font-medium mb-3 text-mcm-light border-l-2 border-mcm-light pl-2">
                Tecnologias
              </h3>
              <div className="flex flex-wrap gap-2 pl-3">
                {tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="tech-tag bg-mcm-light/10 text-mcm-light text-xs px-3 py-1.5 rounded-full border border-mcm-light/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Elementos decorativos tecnológicos */}
        <div className="tech-circuit-lines absolute inset-0 opacity-5 pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-mcm-light/20 rounded-tl-lg pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-mcm-light/20 rounded-tr-lg pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-mcm-light/20 rounded-bl-lg pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-mcm-light/20 rounded-br-lg pointer-events-none"></div>
        
        {/* Grid de linhas tecnológicas */}
        <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 pointer-events-none">
          <div className="col-start-2 row-start-1 row-span-full w-px bg-gradient-to-b from-mcm-light/0 via-mcm-light/5 to-mcm-light/0"></div>
          <div className="col-start-3 row-start-1 row-span-full w-px bg-gradient-to-b from-mcm-light/0 via-mcm-light/10 to-mcm-light/0"></div>
          <div className="col-start-4 row-start-1 row-span-full w-px bg-gradient-to-b from-mcm-light/0 via-mcm-light/10 to-mcm-light/0"></div>
          <div className="col-start-5 row-start-1 row-span-full w-px bg-gradient-to-b from-mcm-light/0 via-mcm-light/5 to-mcm-light/0"></div>
          
          <div className="col-start-1 col-span-full row-start-2 h-px bg-gradient-to-r from-mcm-light/0 via-mcm-light/5 to-mcm-light/0"></div>
          <div className="col-start-1 col-span-full row-start-3 h-px bg-gradient-to-r from-mcm-light/0 via-mcm-light/10 to-mcm-light/0"></div>
          <div className="col-start-1 col-span-full row-start-4 h-px bg-gradient-to-r from-mcm-light/0 via-mcm-light/10 to-mcm-light/0"></div>
          <div className="col-start-1 col-span-full row-start-5 h-px bg-gradient-to-r from-mcm-light/0 via-mcm-light/5 to-mcm-light/0"></div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
