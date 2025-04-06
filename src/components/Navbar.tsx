import { useState, useEffect, useRef } from 'react';
import { Menu } from 'lucide-react';
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setIsDrawerOpen(false);
    }
  }, [isMobile]);

  const scrollToSection = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    setIsDrawerOpen(false);
    
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const yOffset = -80;
        const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
        
        window.scrollTo({
          top: y,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 h-20 flex items-center ${
        scrolled 
          ? 'bg-mcm-navy/90 backdrop-blur-md shadow-lg border-b border-mcm-light/20' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-4 md:px-6">
        <a 
          href="#top" 
          className="flex items-center gap-2 tech-logo group" 
          onClick={(e) => scrollToSection('top', e)}
        >
          <img 
            src="/lovable-uploads/b8c7386f-08ff-4345-940a-c704379e16a2.png" 
            alt="MCM Tecnologia Logo" 
            className="h-24 transition-all duration-500 group-hover:scale-105 group-hover:rotate-3 group-hover:drop-shadow-lg"
          />
        </a>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#sobre" className="tech-nav-link" onClick={(e) => scrollToSection('sobre', e)}>
            <span className="relative z-10">Sobre</span>
          </a>
          <a href="#projetos" className="tech-nav-link" onClick={(e) => scrollToSection('projetos', e)}>
            <span className="relative z-10">Projetos</span>
          </a>
          <a href="#contato" className="tech-nav-link" onClick={(e) => scrollToSection('contato', e)}>
            <span className="relative z-10">Contato</span>
          </a>
          <a 
            href="#contato" 
            className="tech-button"
            onClick={(e) => scrollToSection('contato', e)}
          >
            <span className="relative z-10">Solicitar orçamento</span>
            <div className="tech-button-bg"></div>
          </a>
        </nav>

        {isMobile && (
          <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} shouldScaleBackground={false}>
            <DrawerTrigger asChild onClick={() => setIsDrawerOpen(true)}>
              <button 
                className="text-white bg-mcm-light/20 p-3 rounded-md flex items-center justify-center tech-menu-button"
                aria-label="Abrir menu"
              >
                <Menu size={24} />
              </button>
            </DrawerTrigger>
            <DrawerContent className="bg-mcm-navy/95 backdrop-blur-lg border-t border-mcm-light/20 text-white p-0 max-h-[80vh] overflow-y-auto">
              <div className="menu-tech-bg absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="tech-line-horizontal absolute top-[30%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-mcm-light/10 to-transparent"></div>
                <div className="tech-line-horizontal absolute top-[70%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-mcm-light/10 to-transparent animation-delay-500"></div>
                <div className="tech-line-vertical absolute top-0 left-[30%] w-[1px] h-full bg-gradient-to-b from-transparent via-mcm-light/10 to-transparent"></div>
                <div className="tech-line-vertical absolute top-0 right-[30%] w-[1px] h-full bg-gradient-to-b from-transparent via-mcm-light/10 to-transparent animation-delay-700"></div>
                <div className="tech-dot absolute top-[30%] left-[30%] w-1 h-1 rounded-full bg-mcm-light/20"></div>
                <div className="tech-dot absolute top-[30%] right-[30%] w-1 h-1 rounded-full bg-mcm-light/20"></div>
                <div className="tech-dot absolute top-[70%] left-[30%] w-1 h-1 rounded-full bg-mcm-light/20"></div>
                <div className="tech-dot absolute top-[70%] right-[30%] w-1 h-1 rounded-full bg-mcm-light/20"></div>
                <div className="tech-circuit absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9Ii41IiBmaWxsPSJub25lIj48cGF0aCBkPSJNMCAwaDEwdjEwSDBsMTB2MTBIMHYxMGgxMHYxMEgwek00MCAwSDMwdjEwaDEwVjBoLTEwdjEwSDIwdjEwaDEwdjEwSDIwdjEwaDIweiIvPjwvZz48L3N2Zz4=')]"></div>
              </div>
              
              <nav className="flex flex-col py-6 relative z-10">
                <div className="mb-6 px-6 flex justify-center">
                  <a 
                    href="#top" 
                    onClick={(e) => scrollToSection('top', e)}
                    className="block"
                  >
                    <img 
                      src="/lovable-uploads/b8c7386f-08ff-4345-940a-c704379e16a2.png" 
                      alt="MCM Tecnologia Logo" 
                      className="h-36 transition-all duration-500 hover:scale-105 hover:rotate-3 hover:drop-shadow-lg"
                    />
                  </a>
                </div>
                
                <MobileNavLink 
                  href="#sobre" 
                  onClick={(e) => { 
                    e.preventDefault(); 
                    scrollToSection('sobre', e); 
                  }}
                >
                  Sobre
                </MobileNavLink>
                
                <MobileNavLink 
                  href="#projetos" 
                  onClick={(e) => { 
                    e.preventDefault(); 
                    scrollToSection('projetos', e); 
                  }}
                >
                  Projetos
                </MobileNavLink>
                
                <MobileNavLink 
                  href="#contato" 
                  onClick={(e) => { 
                    e.preventDefault(); 
                    scrollToSection('contato', e); 
                  }}
                >
                  Contato
                </MobileNavLink>
                
                <div className="px-6 mt-8">
                  <a 
                    href="#contato" 
                    className="tech-mobile-cta flex items-center justify-center gap-2 w-full py-4 rounded-md bg-gradient-to-r from-mcm-light/20 to-mcm-light/40 hover:from-mcm-light/30 hover:to-mcm-light/50 transition-all duration-300 active:scale-95"
                    onClick={(e) => { 
                      e.preventDefault(); 
                      scrollToSection('contato', e); 
                    }}
                  >
                    <span>Solicitar orçamento</span>
                  </a>
                </div>
              </nav>
              
              <div className="tech-pulse absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-mcm-light/20 to-transparent"></div>
            </DrawerContent>
          </Drawer>
        )}
      </div>
    </header>
  );
};

const MobileNavLink: React.FC<{
  href: string;
  onClick: (e: React.MouseEvent) => void;
  children: React.ReactNode;
}> = ({ href, onClick, children }) => {
  return (
    <a 
      href={href}
      className="tech-mobile-nav-link relative flex items-center px-6 py-5 text-lg font-medium transition-all duration-300 active:bg-mcm-light/5"
      onClick={onClick}
    >
      <div className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 rounded-r bg-mcm-light/0 group-hover:bg-mcm-light/20 transition-colors"></div>
      <span>{children}</span>
      <div className="absolute bottom-0 left-6 right-6 h-[1px] bg-mcm-light/10"></div>
    </a>
  );
};

export default Navbar;
