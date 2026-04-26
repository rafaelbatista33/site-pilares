import { type FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { createEmailContact } from "../../lib/supabase";
import "./BusinessPage.css";

const modules = [
  {
    name: "Cadastro e Inventário de Ativos",
    impact: "Controle patrimonial com QR/NFC",
    kpi: "Acurácia > 95%",
  },
  {
    name: "Rastreabilidade e Movimentação",
    impact: "Elimina extravios, agiliza auditorias",
    kpi: "-20% a -40% perdas",
  },
  {
    name: "Manutenção Preventiva/Corretiva",
    impact: "Migra de reativo para planejado",
    kpi: "-25% MTTR",
  },
  {
    name: "PMOC e Climatização",
    impact: "Conformidade sanitária e legal",
    kpi: "100% rotinas mapeadas",
  },
  {
    name: "Ordens de Serviço",
    impact: "Organiza fila e SLA",
    kpi: "-25% a -35% MTTR",
  },
  {
    name: "Centro de Destinação de Ativos",
    impact: "Descarte, alienação e recuperação",
    kpi: ">=90% concluídos em <=30 dias",
  },
  {
    name: "Fornecedores e Contratos",
    impact: "Profissionaliza contratação",
    kpi: "-30% ocorrências",
  },
  {
    name: "Orçamentos & Prestação de Contas",
    impact: "Relatório TCE em 1 clique",
    kpi: "-60% a -80% no tempo",
  },
  {
    name: "Dashboards & Indicadores",
    impact: "KPIs para priorização",
    kpi: "Painéis por período/unidade",
  },
  {
    name: "Ocorrências e Chamados",
    impact: "Diagnóstico ágil",
    kpi: "-20% tempo de detecção",
  },
  {
    name: "Eventos (Infraestrutura/Logística)",
    impact: "Gestão de ativos temporários",
    kpi: "-30% perdas em evento",
  },
  {
    name: "Relatórios, Auditoria e LGPD",
    impact: "Governança e segurança",
    kpi: "100% logs imutáveis",
  },
];

const expectedResults = [
  {
    value: "> 80%",
    label: "Acurácia de inventário",
    detail: "nas unidades-alvo",
  },
  {
    value: "10-20%",
    label: "Redução do MTTR",
    detail: "redução inicial estimada",
  },
  {
    value: "+10-20%",
    label: "OS dentro do SLA",
    detail: "melhora progressiva",
  },
  {
    value: "-30-50%",
    label: "Tempo de consolidação",
    detail: "para prestação de contas",
  },
  {
    value: "-10-20%",
    label: "Perdas e extravios",
    detail: "redução inicial estimada",
  },
];

const valueCards = [
  {
    title: "Economia",
    text: "Menos compras desnecessárias e menos corretivas emergenciais.",
    icon: "fa-solid fa-chart-line",
    tone: "green",
  },
  {
    title: "Controle",
    text: "Rastreabilidade ponta a ponta, evidências e logs para auditoria.",
    icon: "fa-solid fa-shield-halved",
    tone: "blue",
  },
  {
    title: "Velocidade",
    text: "Dados em tempo real para decidir e prestar contas.",
    icon: "fa-solid fa-bolt",
    tone: "amber",
  },
];

const featureBlocks = [
  {
    title: "Cadastro e Inventário de Ativos",
    description:
      "Cadastro unificado e completo de bens, com todos os campos essenciais para conformidade patrimonial e contábil.",
    icon: "fa-solid fa-clipboard-list",
    bullets: [
      "Número de tombo e código patrimonial",
      "Nota fiscal vinculada",
      "Localização física com mapa georreferenciado",
      "Cálculo automático de depreciação",
      "App PWA com QR Code e NFC",
    ],
    metrics: [
      ["Acurácia de inventário", "> 95%"],
      ["Redução de compras", "-20% a -30%"],
      ["Tempo de localização", "< 2 min"],
    ],
  },
  {
    title: "Manutenção Preventiva e Corretiva",
    description:
      "Migra de manutenção reativa para planejada: aumenta disponibilidade, corta urgências caras e eleva a segurança.",
    icon: "fa-solid fa-screwdriver-wrench",
    bullets: [
      "Planos preventivos por periodicidade/uso",
      "Ordens de serviço com checklists",
      "Fotos, anexos, tempos, peças e mão de obra",
      "Calendário de OS e SLA configurável",
      "Histórico técnico por ativo",
    ],
    metrics: [
      ["Redução de custo", "-15% a -25%"],
      ["Disponibilidade de ativos", "+10% a +20%"],
      ["Redução no MTTR", "-25% a -35%"],
    ],
  },
  {
    title: "Orçamentos e Prestação de Contas (TCE)",
    description:
      "Geração automática do Relatório de Prestação de Contas para o TCE: modelos parametrizados, em 1 clique.",
    icon: "fa-solid fa-file-invoice",
    bullets: [
      "Validação automática de inconsistências",
      "Relatório TCE em 1 clique",
      "PDF/ZIP com anexos e trilha de auditoria",
      "Modelos padronizados TCE",
      "Checklist de consistência",
    ],
    metrics: [
      ["Tempo de consolidação", "-60% a -80%"],
      ["Relatório TCE gerado", "5 a 10 min"],
      ["Pendências por falta de evidência", "0"],
    ],
  },
];

const differentiators = [
  {
    title: "Feita em Alagoas",
    text: "Olhar para os desafios reais da gestão pública brasileira.",
    icon: "fa-solid fa-location-dot",
  },
  {
    title: "Implantação rápida",
    text: "Orientada a indicadores como MTTR, disponibilidade e SLA.",
    icon: "fa-solid fa-clock",
  },
  {
    title: "Usabilidade em campo",
    text: "App e QR/NFC.",
    icon: "fa-solid fa-mobile-screen-button",
  },
  {
    title: "Relatórios prontos",
    text: "Trilhas de auditoria para TCE e órgãos de controle.",
    icon: "fa-solid fa-file-lines",
  },
  {
    title: "Modularidade e API",
    text: "Integra com o que já existe, sem criar ilhas.",
    icon: "fa-solid fa-database",
  },
];

const deployment = [
  {
    phase: "Fase 1",
    title: "Diagnóstico",
    text: "Levantamento de unidades, ativos, usuários e fluxos. Definição do escopo.",
  },
  {
    phase: "Fase 2",
    title: "Configuração",
    text: "Parametrização da plataforma e carga inicial de dados.",
  },
  {
    phase: "Fase 3",
    title: "Treinamento",
    text: "Capacitação das equipes e validação em unidades selecionadas.",
  },
  {
    phase: "Fase 4",
    title: "Expansão",
    text: "Ampliação para as demais unidades e acompanhamento de indicadores.",
  },
];

const infrastructure = [
  "Acesso via navegador web: sem instalação local",
  "App PWA instalável, com QR Code e NFC",
  "Dados em ambiente seguro com backup automático e criptografia",
  "Disponibilidade alta, com SLA de plataforma definido em contrato",
  "Opção de ambiente dedicado para requisitos específicos",
  "Contrato anual com renovação simplificada",
];

const entityTypes = [
  "Secretaria Municipal",
  "Secretaria Estadual",
  "Autarquia",
  "Fundação",
  "Casa Legislativa",
  "Defensoria",
  "Hospital Público",
  "Escola Pública",
  "Outro",
];

const states = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
];

const BusinessPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const form = event.currentTarget;
      const formData = new FormData(form);

      const nome = String(formData.get("nome") ?? "").trim();
      const email = String(formData.get("email") ?? "").trim();
      const telefone = String(formData.get("telefone") ?? "").trim();
      const cidade = String(formData.get("cidade") ?? "").trim();
      const uf = String(formData.get("uf") ?? "").trim();
      const entidade = String(formData.get("entidade") ?? "").trim();
      const cargo = String(formData.get("cargo") ?? "").trim();
      const mensagem = String(formData.get("mensagem") ?? "").trim();

      await createEmailContact({
        name: nome,
        email,
        phone: telefone,
        source: "business_page",
        city: cidade,
        uf,
        entity_type: entidade,
        role: cargo,
        message: mensagem,
        notes: [
          cidade && `Cidade: ${cidade}`,
          uf && `UF: ${uf}`,
          entidade && `Entidade: ${entidade}`,
          cargo && `Cargo: ${cargo}`,
          mensagem && `Mensagem: ${mensagem}`,
        ]
          .filter(Boolean)
          .join("\n"),
      });

      form.reset();
      setSubmitted(true);
    } catch {
      alert(
        "Não foi possível enviar. Verifique sua conexão e tente novamente.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="business-page">
      <article className="business-print-doc" aria-label="Documento Pilares">
        <section className="business-print-cover">
          <div>
            <img src="/img/logo/header-logo6.png" alt="Pilares" />
            <span>Documento comercial</span>
            <h1>Tenha uma gestão inteligente dos bens públicos.</h1>
            <p>
              Plataforma SaaS modular para inventário, rastreabilidade,
              manutenção, prestação de contas, eventos e indicadores de gestão.
            </p>
          </div>
          <aside>
            <strong>PILARES</strong>
            <span>Gestão Inteligente de Ativos</span>
            <small>pilarestech.com · pilares.tech@gmail.com · (79) 9 9602-1438</small>
          </aside>
        </section>

        <section className="business-print-summary">
          <div>
            <h2>Resumo executivo</h2>
            <p>
              A Pilares profissionaliza a gestão de ativos e manutenção no setor
              público, reduzindo retrabalho, perdas, compras desnecessárias e
              tempo de consolidação de dados para auditoria.
            </p>
          </div>
          <div className="business-print-kpis">
            <article>
              <strong>&gt; 95%</strong>
              <span>Acurácia de inventário</span>
            </article>
            <article>
              <strong>-25%</strong>
              <span>Redução estimada de MTTR</span>
            </article>
            <article>
              <strong>1 clique</strong>
              <span>Prestação de contas</span>
            </article>
          </div>
        </section>

        <section className="business-print-section">
          <h2>Quem somos e missão</h2>
          <div className="business-print-two">
            <p>
              Empresa alagoana com time apaixonado por inovação e mais de 5 anos
              de experiência prática em gestão pública, tecnologia e operações
              de campo.
            </p>
            <p>
              Nossa missão é simplificar e profissionalizar a gestão de ativos e
              manutenção no setor público, entregando eficiência operacional,
              transparência e segurança.
            </p>
          </div>
        </section>

        <section className="business-print-section">
          <h2>Valor entregue</h2>
          <div className="business-print-cards business-print-cards--three">
            {valueCards.map((card) => (
              <article key={card.title}>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="business-print-section">
          <h2>Mapa de módulos</h2>
          <div className="business-print-modules">
            {modules.map((module) => (
              <article key={module.name}>
                <h3>{module.name}</h3>
                <p>{module.impact}</p>
                <strong>{module.kpi}</strong>
              </article>
            ))}
          </div>
        </section>

        <section className="business-print-section">
          <h2>Funcionalidades em destaque</h2>
          <div className="business-print-features">
            {featureBlocks.map((feature) => (
              <article key={feature.title}>
                <div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
                <ul>
                  {feature.bullets.slice(0, 4).map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="business-print-section">
          <h2>Resultados esperados e implantação</h2>
          <div className="business-print-two">
            <div className="business-print-results">
              {expectedResults.map((result) => (
                <p key={result.label}>
                  <strong>{result.value}</strong>
                  <span>{result.label} · {result.detail}</span>
                </p>
              ))}
            </div>
            <div className="business-print-steps">
              {deployment.map((item, index) => (
                <p key={item.phase}>
                  <strong>{index + 1}. {item.title}</strong>
                  <span>{item.text}</span>
                </p>
              ))}
            </div>
          </div>
        </section>

        <section className="business-print-section business-print-final">
          <h2>Infraestrutura e contato</h2>
          <div className="business-print-two">
            <ul>
              {infrastructure.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div>
              <h3>Próximo passo</h3>
              <p>
                Agendar uma apresentação para validar módulos, escopo,
                indicadores e cronograma de implantação conforme a realidade da
                instituição.
              </p>
              <strong>pilarestech.com</strong>
              <strong>pilares.tech@gmail.com</strong>
              <strong>(79) 9 9602-1438</strong>
            </div>
          </div>
        </section>
      </article>

      <header className="business-hero" id="topo">
        <nav className="business-nav" aria-label="Navegação da página">
          <Link to="/" className="business-logo" aria-label="Voltar ao início">
            <img src="/img/logo/header-logo6.png" alt="Pilares" />
          </Link>

          <div className="business-nav__links">
            <a href="#modulos">Módulos</a>
            <a href="#implantacao">Implantação</a>
            <button
              type="button"
              className="business-print-button"
              onClick={() => window.print()}
            >
              <i className="fa-solid fa-print" aria-hidden="true" />
              Imprimir doc
            </button>
            <a href="#cadastro" className="business-nav__cta">
              Quero conhecer
            </a>
          </div>
        </nav>

        <section className="business-hero__content">
          <div className="business-hero__copy">
            <span className="business-eyebrow">
              Plataforma SaaS para gestão pública
            </span>
            <h1>Tenha uma gestão inteligente dos bens públicos.</h1>
            <p>
              Garanta eficiência operacional, transparência e tomada de decisão
              baseada em dados para órgãos que precisam controlar patrimônio,
              serviços, evidências e indicadores com segurança.
            </p>

            <div className="business-hero__actions">
              <a href="#cadastro" className="business-button">
                Quero conhecer
                <i className="fa-solid fa-arrow-right" aria-hidden="true" />
              </a>
              <a
                href="#modulos"
                className="business-button business-button--ghost"
              >
                Ver módulos
              </a>
            </div>
          </div>

          <aside className="business-hero-panel" aria-label="Resumo da solução">
            <div className="business-hero-panel__top">
              <span>Visão operacional</span>
              <strong>Tempo real</strong>
            </div>
            <div className="business-dashboard">
              <div>
                <span>Inventário</span>
                <strong>&gt; 95%</strong>
              </div>
              <div>
                <span>MTTR</span>
                <strong>-25%</strong>
              </div>
              <div>
                <span>Prestação de contas</span>
                <strong>1 clique</strong>
              </div>
            </div>
            <div className="business-hero-panel__footer">
              QR/NFC, dashboards, auditoria e API.
            </div>
          </aside>
        </section>
      </header>

      <section className="business-section business-intro">
        <div className="business-container business-split">
          <div>
            <span className="business-section-tag">Quem somos</span>
            <h2>
              Uma empresa alagoana focada nas dores reais da operação pública
            </h2>
            <p>
              Empresa alagoana com time apaixonado por inovação e mais de 5 anos
              de experiência prática em gestão pública, tecnologia e operações
              de campo.
            </p>
            <p>
              Atuamos para resolver dores reais do dia a dia do gestor:
              inventário desatualizado, manutenção reativa, perda de ativos,
              prestação de contas morosa e baixa visibilidade operacional.
            </p>
          </div>

          <article className="business-mission">
            <i className="fa-solid fa-bullseye" aria-hidden="true" />
            <h3>Nossa missão</h3>
            <p>
              Simplificar e profissionalizar a gestão de ativos e manutenção no
              setor público, entregando eficiência operacional, transparência e
              segurança para o cidadão e para o servidor.
            </p>
          </article>
        </div>
      </section>

      <section className="business-section business-section--muted">
        <div className="business-container">
          <div className="business-section-head">
            <span className="business-section-tag">Valor entregue</span>
            <h2>Resultados concretos que transformam a gestão pública</h2>
          </div>

          <div className="business-value-grid">
            {valueCards.map((card) => (
              <article
                className={`business-value-card business-value-card--${card.tone}`}
                key={card.title}
              >
                <i className={card.icon} aria-hidden="true" />
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="business-section">
        <div className="business-container">
          <div className="business-section-head">
            <span className="business-section-tag">Para quem</span>
            <h2>Soluções pensadas para quem faz a gestão pública acontecer</h2>
          </div>

          <div className="business-audience-grid">
            <article>
              <i className="fa-solid fa-building-columns" aria-hidden="true" />
              <div>
                <h3>Órgãos da Administração Pública</h3>
                <p>
                  Secretarias, autarquias, fundações, casas legislativas e
                  defensorias.
                </p>
              </div>
            </article>
            <article>
              <i className="fa-solid fa-users-gear" aria-hidden="true" />
              <div>
                <h3>Gestores de infraestrutura</h3>
                <p>Patrimônio, saúde, educação, cultura/turismo e TI.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="business-band">
        <div className="business-container">
          <span className="business-section-tag">O que é a Pilares</span>
          <h2>
            Uma plataforma modular para inventário, manutenção e governança
          </h2>
          <p>
            Plataforma SaaS modular para inventário, rastreabilidade e
            manutenção de ativos; ordens de serviço; prestação de contas;
            eventos; ocorrências; dashboards e API, com app PWA, leitura de
            QR/NFC e painéis para gestão.
          </p>
        </div>
      </section>

      <section className="business-section">
        <div className="business-container">
          <div className="business-section-head">
            <span className="business-section-tag">Após 90 dias</span>
            <h2>Resultados esperados com uso pleno da solução</h2>
          </div>

          <div className="business-results-grid">
            {expectedResults.map((result) => (
              <article key={result.label}>
                <strong>{result.value}</strong>
                <span>{result.label}</span>
                <small>{result.detail}</small>
              </article>
            ))}
          </div>

          <p className="business-note">
            Ganhos dependem da adesão das equipes, da qualidade dos dados
            iniciais e da consistência de uso. Resultados maiores são esperados
            a partir do 6º mês de operação plena.
          </p>
        </div>
      </section>

      <section
        className="business-section business-section--muted"
        id="modulos"
      >
        <div className="business-container">
          <div className="business-section-head">
            <span className="business-section-tag">Mapa geral</span>
            <h2>Módulos que se adaptam à necessidade de cada instituição</h2>
          </div>

          <div className="business-modules-grid">
            {modules.map((module) => (
              <article key={module.name}>
                <i className="fa-solid fa-circle-check" aria-hidden="true" />
                <h3>{module.name}</h3>
                <p>{module.impact}</p>
                <strong>{module.kpi}</strong>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="business-section">
        <div className="business-container">
          <div className="business-section-head">
            <span className="business-section-tag">Funcionalidades</span>
            <h2>Recursos principais para campo, gestão e controle</h2>
          </div>

          <div className="business-feature-list">
            {featureBlocks.map((feature, index) => (
              <article className="business-feature" key={feature.title}>
                <div className="business-feature__copy">
                  <div className="business-feature__title">
                    <i className={feature.icon} aria-hidden="true" />
                    <h3>{feature.title}</h3>
                  </div>
                  <p>{feature.description}</p>
                  <ul>
                    {feature.bullets.map((bullet) => (
                      <li key={bullet}>
                        <i className="fa-solid fa-check" aria-hidden="true" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="business-feature__metrics">
                  {feature.metrics.map(([label, value]) => (
                    <div key={label}>
                      <span>{label}</span>
                      <strong>{value}</strong>
                    </div>
                  ))}
                </div>

                <span className="business-feature__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="business-section business-section--muted">
        <div className="business-container">
          <div className="business-section-head">
            <span className="business-section-tag">Diferenciais</span>
            <h2>Por que contratar agora</h2>
          </div>

          <div className="business-diff-grid">
            {differentiators.map((item) => (
              <article key={item.title}>
                <i className={item.icon} aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="business-section" id="implantacao">
        <div className="business-container">
          <div className="business-section-head">
            <span className="business-section-tag">Até 90 dias</span>
            <h2>Cronograma de implantação estruturado e acompanhado</h2>
          </div>

          <div className="business-timeline">
            {deployment.map((item, index) => (
              <article key={item.phase}>
                <span>{index + 1}</span>
                <small>{item.phase}</small>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="business-band business-band--infra">
        <div className="business-container">
          <div className="business-section-head">
            <span className="business-section-tag">Infraestrutura</span>
            <h2>Nuvem SaaS com segurança, mobilidade e escala</h2>
          </div>

          <div className="business-infra-grid">
            {infrastructure.map((item) => (
              <article key={item}>
                <i className="fa-solid fa-check" aria-hidden="true" />
                <span>{item}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="business-section business-form-section" id="cadastro">
        <div className="business-container business-form-layout">
          <div>
            <span className="business-section-tag">Próximo passo</span>
            <h2>Quero conhecer a Pilares</h2>
            <p>
              Preencha o formulário para nossa equipe entender a instituição,
              validar o melhor conjunto de módulos e apresentar uma proposta
              compatível com a operação.
            </p>

            <div className="business-contact-card">
              <a
                href="https://wa.me/5579996021438?text=Olá%2C%20gostaria%20de%20saber%20mais%20sobre%20a%20Pilares."
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-whatsapp" aria-hidden="true" />
                (79) 9 9602-1438
              </a>
              <a href="mailto:pilares.tech@gmail.com">
                <i className="fa-solid fa-envelope" aria-hidden="true" />
                pilares.tech@gmail.com
              </a>
              <a
                href="https://pilarestech.com"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa-solid fa-globe" aria-hidden="true" />
                pilarestech.com
              </a>
            </div>
          </div>

          <div className="business-form-card">
            {submitted ? (
              <div className="business-form-success">
                <i className="fa-solid fa-circle-check" aria-hidden="true" />
                <h3>Cadastro realizado</h3>
                <p>Obrigado pelo interesse. Nossa equipe entrará em contato.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <input
                  type="hidden"
                  name="_subject"
                  value="Interesse pela página business da Pilares"
                />

                <label>
                  Nome completo *
                  <input name="nome" required placeholder="Seu nome completo" />
                </label>

                <label>
                  E-mail *
                  <input
                    name="email"
                    required
                    type="email"
                    placeholder="seuemail@instituicao.gov.br"
                  />
                </label>

                <label>
                  Telefone *
                  <input
                    name="telefone"
                    required
                    type="tel"
                    placeholder="(00) 00000-0000"
                  />
                </label>

                <div className="business-form-row">
                  <label>
                    Cidade *
                    <input name="cidade" required placeholder="Sua cidade" />
                  </label>

                  <label>
                    UF *
                    <select name="uf" required defaultValue="">
                      <option value="" disabled>
                        UF
                      </option>
                      {states.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <label>
                  Entidade de interesse *
                  <select name="entidade" required defaultValue="">
                    <option value="" disabled>
                      Selecione a entidade
                    </option>
                    {entityTypes.map((entity) => (
                      <option key={entity} value={entity}>
                        {entity}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Cargo *
                  <input name="cargo" required placeholder="Seu cargo atual" />
                </label>

                <label>
                  Mensagem opcional
                  <textarea
                    name="mensagem"
                    placeholder="Se quiser, conte algo sobre sua necessidade, cenário atual ou prioridade."
                  />
                </label>

                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Enviando..." : "Enviar cadastro"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer className="business-footer">
        <div className="business-container">
          <Link to="/" className="business-footer__brand">
            <img src="/img/logo/header-logo6.png" alt="Pilares" />
            <span>Gestão inteligente de ativos</span>
          </Link>
          <p>
            © {new Date().getFullYear()} PILARES. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </main>
  );
};

export default BusinessPage;
