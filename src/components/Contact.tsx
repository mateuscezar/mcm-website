
import { useEffect, useState } from 'react';
import { Mail, Phone, MessageSquare, ArrowRight, Github, Linkedin, Code, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.section-reveal');
    elements.forEach((el) => {
      observer.observe(el);
    });

    return () => {
      elements.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulação de envio de formulário
    setTimeout(() => {
      toast({
        title: "Mensagem enviada!",
        description: "Em breve entraremos em contato.",
        variant: "default",
      });
      setFormData({
        name: '',
        email: '',
        message: '',
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section id="contato" className="py-20 bg-mcm-navy/80 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 section-reveal">Entre em <span className="glow-text">Contato</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto section-reveal opacity-0" style={{ animationDelay: '0.2s' }}>
            Tem um projeto em mente? Vamos conversar sobre como posso ajudar a torná-lo realidade.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div className="section-reveal opacity-0" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-2xl font-bold mb-6">Solicite um <span className="text-[#2ea9ff]">orçamento</span></h3>
            <p className="text-gray-300 mb-8">
              Preencha o formulário com detalhes do seu projeto e entrarei em contato para discutirmos as melhores soluções para suas necessidades.
            </p>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">Nome</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="contact-input"
                  placeholder="Seu nome"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="contact-input"
                  placeholder="seu.email@exemplo.com"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">Mensagem</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="contact-input resize-none"
                  placeholder="Descreva seu projeto..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="submit-button"
              >
                {isSubmitting ? (
                  <>
                    <span className="mr-2">Enviando</span>
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                  </>
                ) : (
                  <>
                    <span className="mr-2">Enviar mensagem</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>
          </div>
          
          <div className="section-reveal opacity-0" style={{ animationDelay: '0.4s' }}>
            <div className="h-full flex flex-col">
              {/* Redesigned Contact Info Card */}
              <div className="contact-info-card">
                {/* Animated Header */}
                <div className="relative mb-8">
                  <h3 className="text-2xl font-bold relative z-10">Informações de <span className="text-[#2ea9ff]">contato</span></h3>
                  <div className="absolute -bottom-2 left-0 h-0.5 w-24 bg-gradient-to-r from-[#2ea9ff]/80 to-transparent"></div>
                  
                  {/* Floating Circuit Lines - Visual Element */}
                  <div className="absolute -top-4 -right-4 w-16 h-16 opacity-40">
                    <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-[#2ea9ff]"></div>
                    <div className="absolute top-0 right-0 w-8 h-px bg-[#2ea9ff]"></div>
                    <div className="absolute top-0 right-8 h-8 w-px bg-[#2ea9ff]"></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {/* Contact Information */}
                  <div className="space-y-6 relative z-10">
                    <div className="flex items-start contact-info-item">
                      <div className="contact-info-icon">
                        <Mail size={20} />
                      </div>
                      <div>
                        <h4 className="contact-info-text">Email</h4>
                        <a href="mailto:contato@mcmtecnologia.com" className="contact-info-value">
                          contato@mcmtecnologia.com
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start contact-info-item">
                      <div className="contact-info-icon">
                        <Phone size={20} />
                      </div>
                      <div>
                        <h4 className="contact-info-text">Telefone</h4>
                        <a href="tel:+5511999999999" className="contact-info-value">
                          +55 (11) 99999-9999
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  {/* Additional Information */}
                  <div className="space-y-6 relative z-10">
                    <div className="flex items-start contact-info-item">
                      <div className="contact-info-icon">
                        <Globe size={20} />
                      </div>
                      <div>
                        <h4 className="contact-info-text">Localização</h4>
                        <p className="contact-info-value">
                          São Paulo, Brasil
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start contact-info-item">
                      <div className="contact-info-icon">
                        <Code size={20} />
                      </div>
                      <div>
                        <h4 className="contact-info-text">Desenvolvimento</h4>
                        <p className="contact-info-value">
                          Web, Mobile, Desktop
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Digital Pulse Animation Element */}
                <div className="pulse-container mb-8 h-12 flex items-center justify-center">
                  <div className="relative flex items-center justify-center">
                    <div className="h-2 w-2 bg-[#2ea9ff] rounded-full"></div>
                    <div className="absolute inset-0 bg-[#2ea9ff] rounded-full animate-ping opacity-75 h-2 w-2"></div>
                    <div className="absolute h-px bg-gradient-to-r from-[#2ea9ff] to-transparent w-16 right-2"></div>
                    <div className="absolute h-px bg-gradient-to-l from-[#2ea9ff] to-transparent w-16 left-2"></div>
                  </div>
                </div>
                
                <div className="mt-6 relative z-10">
                  <h4 className="text-lg font-medium mb-4">Redes sociais</h4>
                  <div className="flex space-x-4">
                    <a 
                      href="#" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="social-icon-button"
                      aria-label="GitHub"
                    >
                      <Github size={22} className="text-white" />
                    </a>
                    <a 
                      href="#" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="social-icon-button"
                      aria-label="LinkedIn"
                    >
                      <Linkedin size={22} className="text-white" />
                    </a>
                  </div>
                </div>
                
                {/* Decorative Elements */}
                <div className="circuit-decoration absolute bottom-4 right-4 opacity-20 pointer-events-none">
                  <div className="w-24 h-24 relative">
                    <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-[#2ea9ff]"></div>
                    <div className="absolute bottom-0 right-0 w-16 h-px bg-[#2ea9ff]"></div>
                    <div className="absolute bottom-0 right-16 h-16 w-px bg-[#2ea9ff]"></div>
                    <div className="absolute bottom-16 right-16 w-8 h-px bg-[#2ea9ff]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-code-pattern opacity-5 pointer-events-none"></div>
    </section>
  );
};

export default Contact;
