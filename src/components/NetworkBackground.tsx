
import { useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const NetworkBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions to cover the hero section
    const setCanvasDimensions = () => {
      const container = canvas.parentElement;
      if (!container) return;
      
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };
    
    // Create particles
    let particles: Particle[] = [];
    // Adjust particle count based on screen size
    const particleCount = isMobile ? 30 : 70;
    const connectionDistance = isMobile ? 100 : 150; 
    let animationFrameId: number;
    let time = 0;
    
    class Particle {
      x: number;
      y: number;
      originX: number;
      originY: number;
      radius: number;
      color: string;
      speed: number;
      offset: number;
      
      constructor() {
        this.originX = Math.random() * canvas.width;
        this.originY = Math.random() * canvas.height;
        this.x = this.originX;
        this.y = this.originY;
        this.radius = Math.random() * 1.5 + 1;
        this.color = '#2ea9ff';
        this.speed = Math.random() * 0.5 + 0.2; // Random speed for varied movement
        this.offset = Math.random() * Math.PI * 2; // Random starting point in the cycle
      }
      
      update(time: number) {
        // Gentle floating motion using sine waves
        const amplitude = 20; // Maximum distance to move from origin
        
        // Create a smooth wave pattern unique to each particle
        this.x = this.originX + Math.sin(time * this.speed + this.offset) * amplitude;
        this.y = this.originY + Math.cos(time * this.speed + this.offset * 0.5) * amplitude;
      }
      
      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }
    
    const init = () => {
      setCanvasDimensions();
      particles = [];
      
      // Create particles
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };
    
    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Increment time for the animation
      time += 0.005; // Controls the overall speed of the animation
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.update(time);
        particle.draw();
      });
      
      // Draw connections between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            
            const opacity = 1 - (distance / connectionDistance);
            ctx.strokeStyle = `rgba(46, 169, 255, ${opacity * 0.85})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Setup event listeners just for window resize
    window.addEventListener('resize', setCanvasDimensions);
    
    // Initialize and start animation
    init();
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile]);
  
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full"
      />
    </div>
  );
};

export default NetworkBackground;
