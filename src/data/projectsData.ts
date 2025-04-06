
export interface ProjectImage {
  url: string;
  alt: string;
  description: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  shortDescription: string;
  thumbnail: string;
  tags: string[];
  url?: string; // Making url optional with the ? mark
  images: ProjectImage[];
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Sistema de Gestão",
    shortDescription: "Plataforma completa para gerenciamento de empresas",
    description: "Um sistema completo de gestão empresarial com módulos de finanças, estoque, RH e vendas, desenvolvido com as mais recentes tecnologias web.",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFzaGJvYXJkfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    tags: ["React", "Node.js", "TypeScript", "MongoDB"],
    url: "#",
    images: [
      {
        url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFzaGJvYXJkfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
        alt: "Dashboard do sistema",
        description: "Painel administrativo com métricas em tempo real e visualizações de dados"
      },
      {
        url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZGFzaGJvYXJkfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
        alt: "Módulo financeiro",
        description: "Gestão financeira com relatórios detalhados e controle de fluxo de caixa"
      },
      {
        url: "https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZGFzaGJvYXJkfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
        alt: "Módulo de RH",
        description: "Gerenciamento completo de recursos humanos com controle de ponto e folha de pagamento"
      }
    ]
  },
  {
    id: 2,
    title: "E-commerce",
    shortDescription: "Loja online completa com gateway de pagamento",
    description: "Uma plataforma de e-commerce completa com catálogo de produtos, carrinho de compras, gestão de estoque e integração com diversos gateways de pagamento.",
    thumbnail: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZWNvbW1lcmNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    tags: ["Next.js", "Stripe", "Firebase", "Tailwind CSS"],
    url: "#",
    images: [
      {
        url: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZWNvbW1lcmNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
        alt: "Página inicial da loja",
        description: "Página inicial moderna e responsiva com destaques de produtos"
      },
      {
        url: "https://images.unsplash.com/photo-1616065298043-67646e0d5597?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZWNvbW1lcmNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
        alt: "Catálogo de produtos",
        description: "Catálogo de produtos com filtros e busca avançada"
      },
      {
        url: "https://images.unsplash.com/photo-1556742077-0a6b6a4a4ac4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8ZWNvbW1lcmNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
        alt: "Carrinho de compras",
        description: "Carrinho de compras com cálculo dinâmico de frete e impostos"
      }
    ]
  },
  {
    id: 3,
    title: "App Mobile",
    shortDescription: "Aplicativo multiplataforma para gestão de finanças pessoais",
    description: "Um aplicativo móvel multiplataforma para controle financeiro pessoal, com sincronização na nuvem, categorização automática de despesas e relatórios detalhados.",
    thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bW9iaWxlJTIwYXBwfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    tags: ["React Native", "Expo", "Redux", "Firebase"],
    url: "#",
    images: [
      {
        url: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bW9iaWxlJTIwYXBwfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
        alt: "Tela inicial do app",
        description: "Dashboard com resumo financeiro e gráficos de gastos mensais"
      },
      {
        url: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bW9iaWxlJTIwYXBwfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
        alt: "Cadastro de despesas",
        description: "Interface intuitiva para registro rápido de receitas e despesas"
      },
      {
        url: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8bW9iaWxlJTIwYXBwfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
        alt: "Relatórios detalhados",
        description: "Relatórios personalizáveis com filtros por período e categoria"
      }
    ]
  },
  {
    id: 4,
    title: "Plataforma EAD",
    shortDescription: "Sistema de ensino online com vídeos e avaliações",
    description: "Uma plataforma de ensino à distância completa com suporte a cursos, aulas em vídeo, material complementar, avaliações online e certificação digital.",
    thumbnail: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZWxlYXJuaW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    tags: ["Vue.js", "Laravel", "MySQL", "AWS"],
    url: "#",
    images: [
      {
        url: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZWxlYXJuaW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
        alt: "Catálogo de cursos",
        description: "Catálogo completo de cursos com sistema de busca e filtros avançados"
      },
      {
        url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZWxlYXJuaW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
        alt: "Player de vídeo",
        description: "Player de vídeo otimizado com controles de velocidade e qualidade"
      },
      {
        url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8ZWxlYXJuaW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
        alt: "Sistema de avaliação",
        description: "Módulo completo para criação e aplicação de avaliações online"
      }
    ]
  }
];
