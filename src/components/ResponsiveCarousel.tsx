import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useIsMobile } from '@/hooks/use-mobile';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ResponsiveCarouselProps {
  children: React.ReactNode;
  className?: string;
  autoPlay?: boolean;
  interval?: number;
  infiniteLoop?: boolean;
  showArrows?: boolean;
  showStatus?: boolean;
  showIndicators?: boolean;
  showThumbs?: boolean;
  onClickItem?: (index: number) => void;
  centerMode?: boolean;
  centerSlidePercentage?: number;
  emulateTouch?: boolean;
  swipeable?: boolean;
  dynamicHeight?: false; // Forçamos como false para manter altura consistente
}

const ResponsiveCarousel = ({
  children,
  className = '',
  autoPlay = true,
  interval = 5000,
  infiniteLoop = true,
  showArrows = true,
  showStatus = false,
  showIndicators = false,
  showThumbs = false,
  onClickItem,
  centerMode = false,
  centerSlidePercentage,
  emulateTouch = true,
  swipeable = true,
}: ResponsiveCarouselProps) => {
  const isMobile = useIsMobile();
  const [isSwiping, setIsSwiping] = useState(false);
  const [isActive, setIsActive] = useState(false);

  // Efeito para adicionar classe ao body quando o carrossel está ativo
  useEffect(() => {
    if (isActive) {
      document.body.classList.add('carousel-active');
    } else {
      document.body.classList.remove('carousel-active');
    }
    
    return () => {
      document.body.classList.remove('carousel-active');
    };
  }, [isActive]);

  const renderArrowPrev = (clickHandler: () => void, hasPrev: boolean) => {
    return (
      <button 
        onClick={(e) => {
          e.stopPropagation();
          clickHandler();
        }}
        disabled={!hasPrev}
        className={`absolute ${isMobile ? 'left-2 md:left-4' : '-left-12 md:-left-16'} top-1/2 transform -translate-y-1/2 p-3 md:p-4 rounded-full bg-mcm-navy/70 hover:bg-mcm-navy/90 text-white z-20 transition-colors duration-300`}
        aria-label="Slide anterior"
        style={{ transform: 'translateY(-50%)', transition: 'background-color 0.3s' }}
      >
        <ChevronLeft size={isMobile ? 24 : 28} />
      </button>
    );
  };

  const renderArrowNext = (clickHandler: () => void, hasNext: boolean) => {
    return (
      <button 
        onClick={(e) => {
          e.stopPropagation();
          clickHandler();
        }}
        disabled={!hasNext}
        className={`absolute ${isMobile ? 'right-2 md:right-4' : '-right-12 md:-right-16'} top-1/2 transform -translate-y-1/2 p-3 md:p-4 rounded-full bg-mcm-navy/70 hover:bg-mcm-navy/90 text-white z-20 transition-colors duration-300`}
        aria-label="Próximo slide"
        style={{ transform: 'translateY(-50%)', transition: 'background-color 0.3s' }}
      >
        <ChevronRight size={isMobile ? 24 : 28} />
      </button>
    );
  };

  const renderIndicator = (
    clickHandler: (e: React.MouseEvent | React.KeyboardEvent) => void,
    isSelected: boolean,
    index: number,
    label: string
  ) => {
    return (
      <button
        key={index}
        onClick={(e) => {
          e.stopPropagation();
          clickHandler(e);
        }}
        className={`w-3 h-3 md:w-2.5 md:h-2.5 rounded-full transition-all mx-1.5 ${
          isSelected 
            ? 'bg-mcm-light w-5 md:w-4' 
            : 'bg-white/40 hover:bg-white/60'
        }`}
        aria-label={`${label} ${index + 1}`}
      />
    );
  };

  const getMultipleChildren = () => {
    const childrenArray = React.Children.toArray(children);
    
    if (childrenArray.length === 1) {
      return [
        React.cloneElement(childrenArray[0] as React.ReactElement), 
        React.cloneElement(childrenArray[0] as React.ReactElement)
      ];
    }
    
    return childrenArray;
  };

  const handleSwipeStart = () => {
    setIsSwiping(true);
    setIsActive(true);
  };

  const handleSwipeEnd = () => {
    setTimeout(() => {
      setIsSwiping(false);
    }, 300);
    setTimeout(() => {
      setIsActive(false);
    }, 1000);
  };

  // Usar o resultado da função getMultipleChildren para resolver o erro
  const carouselChildren = getMultipleChildren();

  return (
    <div 
      className={`relative tech-carousel-container ${className}`}
      data-is-swiping={isSwiping ? "true" : "false"}
    >
      {carouselChildren.length > 0 && (
        <Carousel
          autoPlay={autoPlay}
          interval={interval}
          infiniteLoop={infiniteLoop}
          showArrows={showArrows}
          showStatus={showStatus}
          showIndicators={showIndicators}
          showThumbs={showThumbs}
          onClickItem={onClickItem}
          centerMode={centerMode}
          centerSlidePercentage={centerSlidePercentage}
          emulateTouch={true}
          swipeable={true}
          dynamicHeight={false}
          renderArrowPrev={renderArrowPrev}
          renderArrowNext={renderArrowNext}
          renderIndicator={renderIndicator}
          className="tech-carousel"
          statusFormatter={(current, total) => `${current} / ${total}`}
          onSwipeStart={handleSwipeStart}
          onSwipeEnd={handleSwipeEnd}
          swipeScrollTolerance={5}
          preventMovementUntilSwipeScrollTolerance={true}
          transitionTime={300}
        >
          {carouselChildren.map((child, index) => (
            <div key={`carousel-item-${index}`} className="carousel-item h-full">
              {child}
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default ResponsiveCarousel;
