// src/i18n/translations.ts
export type Locale = "pt" | "en" | "es";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const translations: Record<Locale, any> = {
  pt: {
    header: {
      home: "Início",
      benefits: "Benefícios",
      features: "Soluções",
      partners: "Clientes",
      about: "Sobre",
      contactCta: "Fale com um especialista",
    },

    hero: {
      badge: "Especialistas em patrimônio público",
      title: "Controle Total do Patrimônio Público",
      descriptionRest:
        "A PILARES ajuda seu órgão a controlar bens patrimoniais, executar inventários, rastrear movimentações e gerar relatórios para prestação de contas com mais segurança e organização.",
      primaryCta: "Agendar Diagnóstico Gratuito",
      watchIn2Min: "Ver em 2 minutos",
      trustedBy:
        "Ideal para prefeituras, câmaras, autarquias, escolas e hospitais",
    },

    counters: {
      heading: "Mais controle para a rotina patrimonial",
      kpi1: { value: "44.100+", label: "Bens patrimoniais controlados" },
      kpi2: { value: "175.000+", label: "Movimentações e registros" },
      kpi3: { value: "5.000+", label: "Unidades e setores atendidos" },
      kpi4: { value: "91%", label: "Rotinas com mais rastreabilidade" },
    },

    benefits: {
      title: "O Que a PILARES Entrega",
      subtitle:
        "Mais controle, mais transparência e menos retrabalho na gestão do patrimônio público.",
      item1: {
        title: "Controle dos Bens em Um Só Lugar",
        text: "Cadastre, acompanhe e organize os bens patrimoniais com mais clareza e segurança.",
      },
      item2: {
        title: "Rastreabilidade Completa",
        text: "Saiba onde cada bem está, por onde passou e quem foi responsável por cada movimentação.",
      },
      item3: {
        title: "Inventário Mais Rápido",
        text: "Ganhe agilidade no inventário e reduza falhas nas informações patrimoniais.",
      },
      item4: {
        title: "Relatórios para Prestação de Contas",
        text: "Tenha relatórios organizados para auditorias, fiscalização e exigências dos órgãos de controle.",
      },
      item5: {
        title: "Mais Transparência e Conformidade",
        text: "Fortaleça o controle interno e tenha informações confiáveis para tomada de decisão.",
      },
      item6: {
        title: "Apoio à Manutenção Predial",
        text: "Organize demandas e acompanhe ações de manutenção para preservar a estrutura e os ativos públicos.",
      },
      extra01: {
        number: "01",
        title: "Interface Intuitiva",
        desc: "Sua equipe aprende em minutos",
      },
      extra02: {
        number: "02",
        title: "App Mobile",
        desc: "iOS e Android com modo offline",
      },
      extra03: {
        number: "03",
        title: "Integrações",
        desc: "APIs abertas para seu ERP",
      },
      extra04: {
        number: "04",
        title: "Suporte Dedicado",
        desc: "Equipe especializada sempre disponível",
      },
    },

    features: {
      heading: "Soluções para Organizar o Patrimônio Público",
      subheading:
        "Controle patrimonial, inventário, rastreabilidade e relatórios em uma plataforma simples de usar.",
      monitoring: {
        badge: "Controle patrimonial",
        title: "Veja onde está cada bem",
        text: "Acompanhe localização, responsável, histórico e situação atual dos bens patrimoniais.",
      },
      scheduling: {
        badge: "Inventário",
        title: "Execute inventários com mais organização",
        text: "Atualize dados patrimoniais com mais rapidez e tenha uma base mais confiável.",
      },
      history: {
        badge: "Relatórios",
        title: "Gere informações para auditoria e prestação de contas",
        text: "Transforme registros patrimoniais em relatórios claros para controle, gestão e fiscalização.",
      },
    },

    brands: {
      badge: "Quem busca mais controle escolhe organização",
      title: "Modernize a gestão do patrimônio do seu órgão",
      text: "A PILARES ajuda instituições públicas a organizar bens, melhorar o inventário e ganhar mais segurança na prestação de contas.",
      cta: "Quero conhecer a plataforma",
    },

    about: {
      badge: "Sobre a PILARES",
      title:
        "Especialistas em patrimônio público, inventário, rastreabilidade e relatórios.",
      who: {
        question: "Quem é a PILARES?",
        part1:
          "A PILARES foi criada para ajudar órgãos públicos a organizar e controlar melhor seus bens patrimoniais.",
        part2:
          "Nosso foco é simplificar inventários, rastrear movimentações e gerar informações confiáveis para gestão, auditoria e prestação de contas.",
      },
      vision: {
        question: "Visão",
        answer:
          "Ser referência em tecnologia para controle patrimonial no setor público.",
      },
      mission: {
        question: "Missão",
        answer:
          "Facilitar a gestão patrimonial pública com uma plataforma simples, prática e confiável.",
      },
      values: {
        question: "Valores",
        answer:
          "Clareza, confiança, simplicidade, transparência e compromisso com resultado.",
      },
    },

    cta: {
      heading: "Pronto para Organizar o Patrimônio do Seu Órgão?",
      text: "Agende um diagnóstico gratuito e veja como melhorar o controle patrimonial, o inventário e a prestação de contas com mais segurança.",
      button: "Agendar Diagnóstico Gratuito",
    },

    form: {
      title: "Preencha seus dados e fale com a PILARES",
      firstName: "Nome",
      lastName: "Sobrenome",
      phone: "Telefone",
      email: "E-mail",
      company: "Nome da empresa",
      role: "Cargo",
      teamSize: "Tamanho da equipe",
      need: "Descreva sua necessidade",
      submit: "Enviar mensagem",
      successTitle: "Obrigado!",
      successText: "Logo mais entraremos em contato.",
      errorText: "Não foi possível enviar. Tente novamente em instantes.",
    },

    footer: {
      resources: {
        title: "Recursos",
        partners: "Clientes",
        about: "Sobre a PILARES",
        features: "Módulos da plataforma",
        benefits: "Benefícios",
      },
      company: {
        title: "Empresa",
        story: "Nossa história",
        contactTeam: "Fale com o time",
      },
      social: {
        title: "Redes sociais",
      },
      privacy: "Política de privacidade",
      terms: "Termos de uso",
      copyright: "© {{year}} PILARES",
    },
  },

  // EN & ES – mesmas chaves para manter o site multilíngue
  en: {
    header: {
      home: "Home",
      benefits: "Benefits",
      features: "Modules",
      partners: "Clients",
      about: "About",
      contactCta: "Contact us",
    },
    hero: {
      badge: "Modular SaaS Platform",
      title: "Smart Asset & Maintenance Management",
      descriptionRest:
        "Pilares centralizes operations, adds predictability and data-driven decisions. Modernize your operation with Industry 4.0.",
      primaryCta: "Book a Free Assessment",
      watchIn2Min: "Watch in 2 minutes",
      trustedBy: "Trusted by companies across industries",
    },
    counters: {
      heading: "Real-world results",
      kpi1: { value: "44,100+", label: "Assets managed" },
      kpi2: { value: "175,000+", label: "Records & evidence" },
      kpi3: { value: "5,000+", label: "Locations monitored" },
      kpi4: { value: "91%", label: "Work orders within SLA" },
    },
    benefits: {
      title: "Real Value We Deliver",
      subtitle:
        "Measurable outcomes that impact your operational and financial results.",
      item1: {
        title: "Significant Savings",
        text: "Reduce unnecessary purchases and emergency corrective actions with smart asset management.",
      },
      item2: {
        title: "Total Control",
        text: "End-to-end traceability with evidence and complete audit trails.",
      },
      item3: {
        title: "Speed & Agility",
        text: "Real-time dashboards and reports for fast decisions and accountability.",
      },
      item4: {
        title: "Proven Results",
        text: "Tangible impact in 90 days with ROI from loss reduction and compliance.",
      },
      item5: {
        title: "Public Asset Management",
        text: "Track lifecycle, location, condition and criticality of public assets in a single platform.",
      },
      item6: {
        title: "Maintenance Planning",
        text: "Structure preventive and corrective plans with SLAs, ownership and priorities to increase asset availability.",
      },
      extra01: {
        number: "01",
        title: "Intuitive UI",
        desc: "Your team learns in minutes",
      },
      extra02: {
        number: "02",
        title: "Mobile App",
        desc: "iOS & Android, offline mode",
      },
      extra03: {
        number: "03",
        title: "Integrations",
        desc: "Open APIs to your ERP",
      },
      extra04: {
        number: "04",
        title: "Dedicated Support",
        desc: "Specialized team always available",
      },
    },
    features: {
      heading: "Complete Modules for Your Operation",
      subheading: "Activate only what you need — modular and scalable.",
      monitoring: {
        badge: "Real-time monitoring",
        title: "See asset status in a single panel",
        text: "Track sites and equipment in real time. Receive alerts and act quickly to avoid operational impact.",
      },
      scheduling: {
        badge: "Smart scheduling",
        title: "Plan preventive maintenance ahead",
        text: "Create preventive plans and recurring tasks. Avoid critical failures and keep everything under control.",
      },
      history: {
        badge: "Detailed history",
        title: "Full maintenance record per asset",
        text: "Use history and evidence for analysis and strategic decisions on investments, replacements and priorities.",
      },
    },
    brands: {
      badge: "Trusted by clients",
      title: "Join those who already professionalized operations",
      text: "Real partnerships validate the platform. We evolve continually with market needs.",
      cta: "I want in",
    },
    about: {
      badge: "About PILARES",
      title: "Innovation for Brazilian operations management",
      who: {
        question: "Who is PILARES?",
        part1:
          "A platform bringing innovation and technology to asset, maintenance and operations management.",
        part2:
          "We took part in innovation programs and challenges, with recognitions and cases validating our approach.",
      },
      vision: {
        question: "Vision",
        answer: "Be Brazil’s leading operations management tool.",
      },
      mission: {
        question: "Mission",
        answer:
          "Enable Brazilian organizations to be world-class in maintenance and operations management.",
      },
      values: {
        question: "Values",
        answer: "Simplicity, Empathy, Trust, Innovation and Public Impact.",
      },
    },
    cta: {
      heading: "Ready to Transform Your Operation?",
      text: "Book a free assessment and receive an implementation plan with scope, timeline and clear goals.",
      button: "Book a Free Assessment",
    },
    form: {
      title: "Tell us about your needs",
      firstName: "First name",
      lastName: "Last name",
      phone: "Phone",
      email: "Email",
      company: "Company",
      role: "Role",
      teamSize: "Team size",
      need: "Describe your needs",
      submit: "Send message",
      successTitle: "Thanks!",
      successText: "We will contact you shortly.",
      errorText: "Could not send. Please try again in a moment.",
    },
    footer: {
      resources: {
        title: "Resources",
        partners: "Clients",
        about: "About PILARES",
        features: "Platform modules",
        benefits: "Benefits",
      },
      company: {
        title: "Company",
        story: "Our story",
        contactTeam: "Contact the team",
      },
      social: {
        title: "Social",
      },
      privacy: "Privacy policy",
      terms: "Terms of use",
      copyright: "© {{year}} PILARES",
    },
  },

  es: {
    header: {
      home: "Inicio",
      benefits: "Beneficios",
      features: "Módulos",
      partners: "Clientes",
      about: "Acerca de",
      contactCta: "Habla con nosotros",
    },
    hero: {
      badge: "Plataforma SaaS Modular",
      title: "Gestión Inteligente de Activos y Mantenimiento",
      descriptionRest:
        "Pilares centraliza operaciones, aporta previsibilidad y decisiones basadas en datos. Moderniza tu gestión con Industria 4.0.",
      primaryCta: "Agendar Diagnóstico Gratuito",
      watchIn2Min: "Ver en 2 minutos",
      trustedBy: "Con la confianza de empresas de varios sectores",
    },
    counters: {
      heading: "Resultados reales",
      kpi1: { value: "44.100+", label: "Activos gestionados" },
      kpi2: { value: "175.000+", label: "Registros y evidencias" },
      kpi3: { value: "5.000+", label: "Ubicaciones monitoreadas" },
      kpi4: { value: "91%", label: "OT dentro del SLA" },
    },
    benefits: {
      title: "Valor Real que Entregamos",
      subtitle:
        "Resultados medibles que impactan en lo operativo y financiero.",
      item1: {
        title: "Ahorro Significativo",
        text: "Reduce compras innecesarias y correctivos de emergencia con gestión inteligente de activos.",
      },
      item2: {
        title: "Control Total",
        text: "Trazabilidad extremo a extremo con evidencias y auditoría completa.",
      },
      item3: {
        title: "Velocidad y Agilidad",
        text: "Paneles y reportes en tiempo real para decisiones rápidas.",
      },
      item4: {
        title: "Resultados Probados",
        text: "Impacto en 90 días con ROI por reducción de pérdidas y cumplimiento.",
      },
      item5: {
        title: "Gestión del Patrimonio Público",
        text: "Controla ciclo de vida, ubicación, estado y criticidad de bienes públicos en una sola plataforma.",
      },
      item6: {
        title: "Planificación del Mantenimiento",
        text: "Estructura planes preventivos y correctivos con SLA, responsables y prioridades para aumentar la disponibilidad.",
      },
      extra01: {
        number: "01",
        title: "Interfaz Intuitiva",
        desc: "Tu equipo aprende en minutos",
      },
      extra02: {
        number: "02",
        title: "App Móvil",
        desc: "iOS y Android con modo offline",
      },
      extra03: {
        number: "03",
        title: "Integraciones",
        desc: "APIs abiertas para tu ERP",
      },
      extra04: {
        number: "04",
        title: "Soporte Dedicado",
        desc: "Equipo especializado siempre disponible",
      },
    },
    features: {
      heading: "Módulos Completos para tu Gestión",
      subheading: "Activa solo lo necesario — plataforma modular y escalable.",
      monitoring: {
        badge: "Monitoreo en tiempo real",
        title: "Estado de activos en un único panel",
        text: "Sigue instalaciones y equipos en tiempo real. Recibe alertas y actúa rápido para evitar impactos operativos.",
      },
      scheduling: {
        badge: "Planificación inteligente",
        title: "Mantenimientos preventivos por adelantado",
        text: "Crea planes preventivos y tareas recurrentes. Evita fallas críticas y mantén todo bajo control.",
      },
      history: {
        badge: "Historial detallado",
        title: "Registro completo por equipo",
        text: "Usa historial y evidencias para decisiones estratégicas sobre inversiones, reemplazos y prioridades.",
      },
    },
    brands: {
      badge: "Clientes que confían",
      title: "Únete a quienes ya profesionalizaron la gestión",
      text: "Alianzas reales validan la plataforma. Evolucionamos continuamente con las necesidades del mercado.",
      cta: "Quiero participar",
    },
    about: {
      badge: "Sobre PILARES",
      title: "Innovación para la gestión operativa en Brasil",
      who: {
        question: "¿Quién es PILARES?",
        part1:
          "Plataforma que lleva innovación y tecnología a la gestión de activos, mantenimiento y operaciones.",
        part2:
          "Participamos en programas y desafíos de innovación, con reconocimientos y casos que validan nuestra propuesta.",
      },
      vision: {
        question: "Visión",
        answer: "Ser la principal herramienta de gestión operativa en Brasil.",
      },
      mission: {
        question: "Misión",
        answer:
          "Hacer que organizaciones brasileñas sean referencia mundial en mantenimiento y operaciones.",
      },
      values: {
        question: "Valores",
        answer:
          "Simplicidad, Empatía, Confianza, Innovación e Impacto Público.",
      },
    },
    cta: {
      heading: "¿Listo para Transformar tu Gestión?",
      text: "Agenda un diagnóstico gratuito y recibe un plan de implementación con alcance, cronograma y metas claras.",
      button: "Agendar Diagnóstico Gratuito",
    },
    form: {
      title: "Completa tus datos y habla con PILARES",
      firstName: "Nombre",
      lastName: "Apellido",
      phone: "Teléfono",
      email: "Correo",
      company: "Empresa",
      role: "Cargo",
      teamSize: "Tamaño del equipo",
      need: "Describe tu necesidad",
      submit: "Enviar mensaje",
      successTitle: "¡Gracias!",
      successText: "Nos pondremos en contacto en breve.",
      errorText: "No se pudo enviar. Inténtalo nuevamente en instantes.",
    },
    footer: {
      resources: {
        title: "Recursos",
        partners: "Clientes",
        about: "Sobre PILARES",
        features: "Módulos de la plataforma",
        benefits: "Beneficios",
      },
      company: {
        title: "Empresa",
        story: "Nuestra historia",
        contactTeam: "Habla con el equipo",
      },
      social: {
        title: "Redes sociales",
      },
      privacy: "Política de privacidad",
      terms: "Términos de uso",
      copyright: "© {{year}} PILARES",
    },
  },
};

export const defaultLocale: Locale = "pt";
