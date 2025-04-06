
import { useRef } from 'react';
import NetworkBackground from './NetworkBackground';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      ref={heroRef}
      id="home"
      className="hero-gradient min-h-screen flex items-center pt-16 md:pt-20 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-mcm-light/10 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-mcm-light/5 rounded-full blur-[100px]"></div>
      
      {/* Network Background - positioned behind content */}
      <NetworkBackground />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-6 inline-block">
            <span className="tech-badge section-reveal opacity-0">
              Desenvolvimento de Software
              <span className="tech-badge-glow"></span>
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 section-reveal opacity-0 tracking-tight">
            <span className="text-white block mb-2">Olá, somos a</span> 
            <span className="neon-text">MCM Tecnologia</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 section-reveal opacity-0" style={{ animationDelay: '0.2s' }}>
            Transformar ideias e desenvolver soluções digitais que simplificam processos e impulsionam 
            o crescimento dos nossos clientes por meio da tecnologia.
          </p>
          
          <div className="relative mb-8 section-reveal opacity-0" style={{ animationDelay: '0.4s' }}>
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-mcm-DEFAULT/50 to-transparent mx-auto"></div>
            <p className="text-mcm-light italic mt-4">"Inovação que Conecta, Soluções que Transformam"</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12 section-reveal opacity-0" style={{ animationDelay: '0.6s' }}>
            <a 
              href="#projetos" 
              className="tech-hero-button-outline border border-mcm-DEFAULT hover:border-mcm-light text-white px-8 py-4 rounded-md transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10">Nossos projetos</span>
              <span className="absolute inset-0 bg-mcm-DEFAULT/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              <span className="absolute top-0 bottom-0 left-0 w-1 bg-mcm-light scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top"></span>
              <span className="absolute top-0 bottom-0 right-0 w-1 bg-mcm-light scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom"></span>
              <span className="absolute -inset-full top-0 block h-px w-full bg-mcm-light opacity-30 group-hover:animate-[flow-x_2s_ease-in-out_infinite]"></span>
            </a>
            
            <a 
              href="#contato" 
              className="tech-hero-button bg-mcm-DEFAULT hover:bg-mcm-light text-white px-8 py-4 rounded-md transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10">Solicitar orçamento</span>
              <span className="absolute inset-0 bg-gradient-to-r from-mcm-light/20 to-mcm-DEFAULT/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              <span className="absolute bottom-0 left-0 right-0 h-1 bg-mcm-light scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
              <span className="absolute -inset-x-full -bottom-1 h-1 bg-mcm-light opacity-30 animate-[flow_2s_ease-in-out_infinite]"></span>
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-0 group-hover:h-full bg-gradient-to-b from-mcm-light/0 via-mcm-light/50 to-mcm-light/0 transition-all duration-700 delay-100"></span>
            </a>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto section-reveal opacity-0" style={{ animationDelay: '0.8s' }}>
            {['Web', 'Mobile', 'Desktop', 'Cloud'].map((item, index) => (
              <div 
                key={item}
                className="tech-card-enhanced backdrop-blur-sm bg-mcm-navy/30 rounded-lg p-4 border border-mcm-DEFAULT/10 transition-all duration-300"
                style={{ animationDelay: `${0.8 + index * 0.1}s` }}
              >
                <p className="text-mcm-light font-medium relative z-10">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Code pattern background */}
      <div className="absolute inset-0 bg-code-pattern opacity-5"></div>
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-mcm-black/80"></div>
    </section>
  );
};

export default Hero;
