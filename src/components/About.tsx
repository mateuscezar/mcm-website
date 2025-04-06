import { useEffect } from 'react';
import { Code, Database, Layout } from 'lucide-react';

const About = () => {
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

  return (
    <section id="sobre" className="py-20 bg-mcm-navy relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 section-reveal">Sobre a <span className="glow-text">Empresa</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto section-reveal opacity-0" style={{ animationDelay: '0.2s' }}>
            Conheça mais sobre nossa trajetória e expertise em desenvolvimento de software.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="section-reveal opacity-0" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-2xl font-bold mb-4">MCM <span className="text-mcm-light">Tecnologia</span></h3>
            <p className="text-gray-300 mb-6 text-justify">
              Somos uma empresa especializada em desenvolvimento de software, oferecendo soluções completas em aplicações web, mobile, sistemas integrados, outsourcing e games. Nosso foco está em entregar inovação, desempenho e tecnologia de ponta para transformar ideias em produtos digitais que realmente fazem a diferença.
            </p>
            <p className="text-gray-300 mb-6 text-justify">
              Como desenvolvedor full stack com 12 anos de experiência, nosso fundador tem se dedicado à criação de soluções digitais inovadoras e de alta performance que impulsionam o sucesso dos nossos clientes. Sua abordagem une expertise técnica a um profundo entendimento de negócios, permitindo o desenvolvimento de aplicações que não apenas funcionam de forma eficiente, mas que também geram valor real para as empresas. Sempre atento às mais recentes tecnologias do mercado, garante que cada projeto entregue esteja alinhado com os padrões mais modernos e eficazes da indústria.
            </p>
            <p className="text-gray-300 text-justify">
              Nosso propósito é transformar ideias em soluções digitais que simplificam processos, conectam pessoas e geram impacto positivo por meio da tecnologia. Com isso, buscamos nos tornar uma referência no mercado de software e inovação tecnológica, reconhecida pela excelência técnica, compromisso com os resultados e adaptação constante às necessidades dos nossos clientes.
            </p>
          </div>
          
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-mcm-black/50 backdrop-blur-sm p-6 rounded-lg border border-mcm-DEFAULT/20 section-reveal opacity-0" style={{ animationDelay: '0.4s' }}>
                <div className="w-12 h-12 bg-mcm-DEFAULT/20 rounded-lg flex items-center justify-center mb-4">
                  <Code className="text-mcm-light" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">Frontend</h3>
                <p className="text-gray-400">
                  Desenvolvimento de interfaces modernas, responsivas e de alta performance utilizando React, TypeScript e outras tecnologias de ponta.
                </p>
              </div>
              
              <div className="bg-mcm-black/50 backdrop-blur-sm p-6 rounded-lg border border-mcm-DEFAULT/20 section-reveal opacity-0" style={{ animationDelay: '0.5s' }}>
                <div className="w-12 h-12 bg-mcm-DEFAULT/20 rounded-lg flex items-center justify-center mb-4">
                  <Database className="text-mcm-light" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">Backend</h3>
                <p className="text-gray-400">
                  Criação de APIs robustas e escaláveis com Node.js, Express, e integração com diversos bancos de dados relacionais e NoSQL.
                </p>
              </div>
              
              <div className="bg-mcm-black/50 backdrop-blur-sm p-6 rounded-lg border border-mcm-DEFAULT/20 section-reveal opacity-0" style={{ animationDelay: '0.6s' }}>
                <div className="w-12 h-12 bg-mcm-DEFAULT/20 rounded-lg flex items-center justify-center mb-4">
                  <Layout className="text-mcm-light" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">UI/UX</h3>
                <p className="text-gray-400">
                  Design de experiências de usuário intuitivas e envolventes, com foco em usabilidade e acessibilidade.
                </p>
              </div>
              
              <div className="bg-mcm-black/50 backdrop-blur-sm p-6 rounded-lg border border-mcm-DEFAULT/20 section-reveal opacity-0" style={{ animationDelay: '0.7s' }}>
                <div className="w-12 h-12 bg-mcm-DEFAULT/20 rounded-lg flex items-center justify-center mb-4">
                  <Code className="text-mcm-light" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">DevOps</h3>
                <p className="text-gray-400">
                  Implementação de pipelines CI/CD, containerização com Docker e implantação em ambientes de nuvem AWS e Azure.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 p-6 bg-mcm-black/50 backdrop-blur-sm rounded-lg border border-mcm-DEFAULT/20 section-reveal opacity-0" style={{ animationDelay: '0.8s' }}>
          <p className="text-gray-300 text-center">
            Valorizamos a inovação contínua, a colaboração transparente, a qualidade técnica e a agilidade em todas as etapas do desenvolvimento. Mais do que entregar software, entregamos soluções que aceleram o crescimento e a competitividade dos nossos parceiros.
          </p>
        </div>
      </div>
      <div className="absolute inset-0 bg-code-pattern opacity-5"></div>
    </section>
  );
};

export default About;
