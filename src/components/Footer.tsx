
import { Code, Github, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-mcm-black py-10 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <a href="/" className="flex items-center gap-2">
              <img 
                src="/lovable-uploads/b8c7386f-08ff-4345-940a-c704379e16a2.png" 
                alt="MCM Tecnologia Logo" 
                className="h-[80px] transition-all duration-500 hover:scale-105 hover:rotate-3 hover:drop-shadow-lg"
              />
            </a>
            <p className="text-gray-400 mt-2 text-sm max-w-xs">
              Inovação que Conecta, Soluções que Transformam
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-6 mb-4 relative z-10">
              <a href="#sobre" className="footer-nav-link">Sobre</a>
              <a href="#projetos" className="footer-nav-link">Projetos</a>
              <a href="#contato" className="footer-nav-link">Contato</a>
            </div>
            <div className="flex space-x-4 mb-4 relative z-10">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="footer-social-icon hover:text-[#2ea9ff] transition-all duration-300"
                aria-label="GitHub"
              >
                <Github size={22} className="hover:scale-110 transition-transform" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="footer-social-icon hover:text-[#2ea9ff] transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={22} className="hover:scale-110 transition-transform" />
              </a>
            </div>
            <div className="flex items-center text-gray-400 text-sm">
              <Code size={14} className="mr-1" />
              <span>© {currentYear} MCM Tecnologia. Todos os direitos reservados.</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="pt-8 mt-8 border-t border-mcm-navy/50 text-center">
        <p className="text-gray-500 text-xs">
          Desenvolvido com tecnologias modernas para oferecer a melhor experiência
        </p>
      </div>
      
      <div className="absolute inset-0 bg-code-pattern opacity-5 pointer-events-none"></div>
      <div className="absolute -top-10 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-mcm-black pointer-events-none"></div>
    </footer>
  );
};

export default Footer;
