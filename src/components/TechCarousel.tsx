import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface TechCarouselProps {
  children: React.ReactElement[];
  className?: string;
  defaultSlide?: number;
}

const TechCarousel = ({ children, className = '', defaultSlide = 0 }: TechCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(defaultSlide);
  const [isAnimating, setIsAnimating] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchStartY, setTouchStartY] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const [touchMoveX, setTouchMoveX] = useState(0);
  const [mouseDown, setMouseDown] = useState(false);
  const [draggedX, setDraggedX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isScrollingVertically, setIsScrollingVertically] = useState(false);
  const [touchStartTime, setTouchStartTime] = useState(0);
  const isMobile = useIsMobile();
  
  const [interactionType, setInteractionType] = useState<'none' | 'drag' | 'click'>('none');

  const goToSlide = useCallback((index: number) => {
    if (isAnimating || children.length === 0) return;
    
    setIsAnimating(true);
    setCurrentSlide((index + children.length) % children.length);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500); // Match animation duration
  }, [isAnimating, children.length]);

  const nextSlide = useCallback(() => {
    goToSlide(currentSlide + 1);
  }, [goToSlide, currentSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(currentSlide - 1);
  }, [goToSlide, currentSlide]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating && children.length > 1 && !mouseDown && !isDragging) {
        nextSlide();
      }
    }, 5000); // Change slide every 5 seconds
    
    return () => clearInterval(interval);
  }, [currentSlide, isAnimating, children.length, mouseDown, isDragging, nextSlide]);

  useEffect(() => {
    if (defaultSlide !== undefined) {
      setCurrentSlide(defaultSlide);
    }
  }, [defaultSlide]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setMouseDown(true);
    setTouchStartX(e.clientX);
    setDraggedX(0);
    setIsDragging(false); 
    setInteractionType('none');
    setTouchStartTime(Date.now());
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!mouseDown) return;
    const deltaX = e.clientX - touchStartX;
    setDraggedX(deltaX);
    
    if (Math.abs(deltaX) > 10) {
      setIsDragging(true);
      setInteractionType('drag');
    }
  }, [mouseDown, touchStartX]);

  const handleMouseUp = useCallback((e: React.MouseEvent) => {
    if (!mouseDown) return;
    
    const touchDuration = Date.now() - touchStartTime;
    const deltaX = e.clientX - touchStartX;
    
    setMouseDown(false);
    
    if (touchDuration < 300 && Math.abs(deltaX) < 10) {
      setInteractionType('click');
    } 
    else if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
      setInteractionType('drag');
    }
    
    setDraggedX(0);
    
    setTimeout(() => {
      setIsDragging(false);
    }, 100);
  }, [mouseDown, touchStartX, prevSlide, nextSlide, touchStartTime]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 0) return;
    
    const touch = e.touches[0];
    setTouchStartX(touch.clientX);
    setTouchStartY(touch.clientY);
    setTouchEndX(touch.clientX);
    setTouchMoveX(0);
    setDraggedX(0);
    setIsDragging(false);
    setIsScrollingVertically(false);
    setInteractionType('none');
    setTouchStartTime(Date.now());
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 0) return;
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - touchStartX;
    const deltaY = touch.clientY - touchStartY;
    
    setTouchMoveX(deltaX);
    
    if (!isScrollingVertically && !isDragging) {
      if (Math.abs(deltaY) > Math.abs(deltaX) * 1.5) {
        setIsScrollingVertically(true);
        return;
      } else if (Math.abs(deltaX) > 10) {
        setIsDragging(true);
        setInteractionType('drag');
      }
    }
    
    if (!isScrollingVertically) {
      setTouchEndX(touch.clientX);
      setDraggedX(deltaX);
      
      if (isDragging && Math.abs(deltaX) > 10) {
        e.preventDefault();
      }
    }
  }, [touchStartX, touchStartY, isScrollingVertically, isDragging]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const touchDuration = Date.now() - touchStartTime;
    const deltaX = touchEndX - touchStartX;
    
    if (touchDuration < 300 && Math.abs(deltaX) < 10 && !isScrollingVertically && !isDragging) {
      setInteractionType('click');
    } 
    else if (!isScrollingVertically && Math.abs(deltaX) > 40) {
      if (deltaX > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
    }
    
    setDraggedX(0);
    setIsDragging(false);
    setIsScrollingVertically(false);
    
    setTimeout(() => {
      setInteractionType('none');
    }, 300);
  }, [touchEndX, touchStartX, touchStartTime, isScrollingVertically, isDragging, prevSlide, nextSlide]);

  if (children.length === 0) return null;

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      ref={carouselRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ touchAction: isScrollingVertically ? 'auto' : 'pan-y' }}
    >
      <div 
        className="flex transition-transform duration-500 ease-out"
        style={{ 
          transform: `translateX(calc(-${currentSlide * 100}% + ${draggedX}px))`,
        }}
      >
        {children.map((child, index) => (
          <div 
            key={index} 
            className="w-full flex-shrink-0"
            data-interaction={interactionType}
          >
            {child}
          </div>
        ))}
      </div>
      
      {children.length > 1 && (
        <>
          <button 
            onClick={(e) => { e.stopPropagation(); prevSlide(); }}
            disabled={isAnimating}
            className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 p-3 md:p-4 rounded-full bg-mcm-navy/70 hover:bg-mcm-navy/90 text-white z-20 transition-all tech-button"
            aria-label="Slide anterior"
          >
            <ChevronLeft size={isMobile ? 24 : 28} />
          </button>
          
          <button 
            onClick={(e) => { e.stopPropagation(); nextSlide(); }}
            disabled={isAnimating}
            className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 p-3 md:p-4 rounded-full bg-mcm-navy/70 hover:bg-mcm-navy/90 text-white z-20 transition-all tech-button"
            aria-label="Próximo slide"
          >
            <ChevronRight size={isMobile ? 24 : 28} />
          </button>
          
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-3 mb-4 z-20">
            {children.map((_, index) => (
              <button
                key={index}
                onClick={(e) => { e.stopPropagation(); goToSlide(index); }}
                className={`w-3 h-3 md:w-2.5 md:h-2.5 rounded-full transition-all ${
                  currentSlide === index 
                    ? 'bg-mcm-light w-5 md:w-4' 
                    : 'bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Ir para slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
      
      {isMobile && !isScrollingVertically && (
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 px-4 py-1.5 bg-mcm-light/10 rounded-full backdrop-blur-sm text-xs flex items-center gap-2 animate-pulse opacity-70 pointer-events-none mb-4">
          <div className="flex items-center gap-1">
            <span className="block w-5 h-1 bg-white/50 rounded-full"></span>
            <span className="block w-2 h-1 bg-white/30 rounded-full"></span>
          </div>
          <span>Deslize</span>
          <div className="flex items-center gap-1">
            <span className="block w-2 h-1 bg-white/30 rounded-full"></span>
            <span className="block w-5 h-1 bg-white/50 rounded-full"></span>
          </div>
        </div>
      )}
      
      {isDragging && (
        <div className="absolute inset-0 bg-mcm-light/5 pointer-events-none"></div>
      )}
    </div>
  );
};

export default TechCarousel;
