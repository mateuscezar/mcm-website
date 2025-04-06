
import { useEffect, useRef } from 'react';

export const useIntersectionObserver = () => {
  // Referência para controlar se o observador já foi configurado
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementsProcessedRef = useRef<Set<Element>>(new Set());
  
  useEffect(() => {
    // Retornar imediatamente se o observador já existir
    if (observerRef.current) return;
    
    // Configuração do IntersectionObserver
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15, // Mostra elementos quando 15% deles está visível
    };
    
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        // Check if we've already processed this element
        if (entry.isIntersecting && !elementsProcessedRef.current.has(entry.target)) {
          entry.target.classList.add('visible');
          // Mark this element as processed to avoid duplicate animations
          elementsProcessedRef.current.add(entry.target);
        }
      });
    };

    // Criar o observador apenas uma vez
    observerRef.current = new IntersectionObserver(handleIntersection, observerOptions);

    // Observar todos os elementos com a classe section-reveal
    const elements = document.querySelectorAll('.section-reveal');
    elements.forEach((el) => {
      observerRef.current?.observe(el);
    });

    // Cleanup
    return () => {
      if (observerRef.current) {
        elements.forEach((el) => {
          observerRef.current?.unobserve(el);
        });
        observerRef.current.disconnect();
      }
    };
  }, []);

  return null;
};
