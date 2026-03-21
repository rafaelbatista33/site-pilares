import React, { useEffect, useState } from "react";
import { useI18n } from "../../i18n/I18nProvider";
import LanguageSelect from "../../components/LanguageSelect";
import { Link } from "react-router-dom";

type WindowWithAOS = Window & {
  AOS?: {
    init: () => void;
  };
};

export const SingleIndex1Page: React.FC = () => {
  const { t } = useI18n();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const form = event.currentTarget;
      const formData = new FormData(form);

      const response = await fetch("https://formspree.io/f/xqawkeoj", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (response.ok) {
        form.reset();
        setShowSuccessModal(true);
      } else {
        alert("Não foi possível enviar. Tente novamente em instantes.");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      alert(
        "Não foi possível enviar. Verifique sua conexão e tente novamente.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const win = window as WindowWithAOS;
      win.AOS?.init();
    }
  }, []);

  const handleMobileLinkClick = () => {
    if (typeof document === "undefined") return;

    const sidebar = document.querySelector(
      ".mobile-sidebar",
    ) as HTMLElement | null;

    const overlay = document.querySelector(
      ".mobile-sidebar-overlay",
    ) as HTMLElement | null;

    sidebar?.classList.remove("mobile-menu-active");
    overlay?.classList.remove("mobile-menu-active");
  };

  return (
    <>
      {/* ===== Scroll-top circle ===== */}
      <div className="paginacontainer">
        <div className="progress-wrap">
          <svg
            className="progress-circle svg-content"
            width="100%"
            height="100%"
            viewBox="-1 -1 102 102"
          >
            <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
          </svg>
        </div>
      </div>

      {/* ===== Preloader ===== */}
      <div className="overlay flex cac vac preloader-parent">
        <div>
          <div className="loader preloader flex vac">
            <svg width="200" height="200">
              <circle
                className="background"
                cx="90"
                cy="90"
                r="80"
                transform="rotate(-90, 100, 90)"
              />
              <circle
                className="outer"
                cx="90"
                cy="90"
                r="80"
                transform="rotate(-90, 100, 90)"
              />
            </svg>
            <span className="circle-background" />
            <span className="logo animated fade-in">
              <img src="/img/logo/header-logo1.png" alt="" />
            </span>
          </div>
        </div>
      </div>

      {/* ===== HEADER ===== */}
      <header>
        {/* HEADER DESKTOP */}
        <div
          className="header-area header-area6 header-area-all d-none d-lg-block"
          id="header"
        >
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="header-elements">
                  <div className="site-logo home1-site-logo">
                    <a href="#hero">
                      <img src="/img/logo/header-logo6.png" alt="" />
                    </a>
                  </div>

                  <div className="main-menu-ex main-menu-ex1">
                    <ul id="list-example">
                      <li>
                        <a href="#hero">{t("header.home")}</a>
                      </li>
                      <li>
                        <a href="#editing">{t("header.benefits")}</a>
                      </li>
                      <li>
                        <a href="#feature">{t("header.features")}</a>
                      </li>
                      <li>
                        <a href="#faq">{t("header.about")}</a>
                      </li>
                    </ul>
                  </div>

                  <div className="header2-buttons">
                    <LanguageSelect className="lang-select" />

                    <Link
                      to="/contato"
                      className="header-btn23 btn-contact-cta"
                    >
                      <span className="btn-contact-cta__label">
                        {t("header.contactCta")}
                      </span>
                      <span className="btn-contact-cta__icon">
                        <i className="fa-solid fa-message" />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* HEADER MOBILE (TOPO) */}
        <div className="mobile-header mobile-header-6 d-block d-lg-none">
          <div className="container">
            <div className="col-12">
              <div className="mobile-header-elements">
                {/* Logo à esquerda */}
                <div className="mobile-logo">
                  <a href="#hero">
                    <img src="/img/logo/header-logo6.png" alt="" />
                  </a>
                </div>

                {/* Idioma + hambúrguer alinhados à direita */}
                <div className="mobile-header-right">
                  <LanguageSelect className="lang-select lang-select--mobile" />

                  <div className="mobile-nav-icon ham-menu">
                    <i className="fa-solid fa-bars-staggered" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MENU MOBILE (SIDEBAR) */}
        <div className="mobile-sidebar">
          {/*
          <div className="logo-m">
                      <LanguageSelect className="lang-select lang-select--sidebar" />

          </div> */}

          <div className="menu-close">
            <i className="fa-solid fa-xmark" />
          </div>

          <div className="mobile-nav">
            <ul id="mobile-menu">
              <li>
                <a href="#hero" onClick={handleMobileLinkClick}>
                  {t("header.home")}
                </a>
              </li>
              <li>
                <a href="#editing" onClick={handleMobileLinkClick}>
                  {t("header.benefits")}
                </a>
              </li>
              <li>
                <a href="#feature" onClick={handleMobileLinkClick}>
                  {t("header.features")}
                </a>
              </li>
              <li>
                <a href="#faq" onClick={handleMobileLinkClick}>
                  {t("header.about")}
                </a>
              </li>
            </ul>

            <div className="mobile-button">
              <Link
                to="/contato"
                className="header-btn23 btn-contact-cta"
                onClick={handleMobileLinkClick}
              >
                <span className="btn-contact-cta__label">
                  {t("header.contactCta")}
                </span>
                <span className="btn-contact-cta__icon">
                  <i className="fa-solid fa-message" />
                </span>
              </Link>
            </div>
          </div>
        </div>

        <div className="mobile-sidebar-overlay" />
      </header>

      {/* ===== HERO ===== */}
      <div className="hero-area6" id="hero">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5">
              <div className="main-heading">
                <span
                  className="span"
                  data-aos="fade-left"
                  data-aos-duration="700"
                >
                  <img src="/img/icons/main-span6.png" alt="" />{" "}
                  {t("hero.badge")}
                </span>
                <h1 className="text-anime-style-3">{t("hero.title")}</h1>
                <div className="space16" />
                <p data-aos="fade-right" data-aos-duration="700">
                  {t("hero.descriptionRest")}
                </p>
                <div className="space30" />
                <div
                  className="buttons"
                  data-aos="fade-right"
                  data-aos-duration="900"
                >
                  <Link to="/contato" className="theme-btn8">
                    <span className="tb8">
                      Quero testar por 30 dias
                      <span className="arrow">
                        <i className="fa-solid fa-arrow-right" />
                      </span>
                    </span>
                  </Link>
                </div>

                <div className="master-card master-card6">
                  <div className="single-master6">
                    <div className="clients clients6">
                      <img src="/img/elements/client5.svg" alt="" />
                    </div>
                    <div className="space16" />
                  </div>

                  <div className="single-master6">
                    <div className="clients clients6">
                      <img src="/img/elements/hero6-review.svg" alt="" />
                    </div>
                    <div className="space16" />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <div
                className="images-all"
                data-aos="zoom-out"
                data-aos-duration="800"
              >
                <div className="image1">
                  <img src="/img/hero/hero6-img1.png" alt="" />
                </div>
                <div className="image2 animate1">
                  <img src="/img/hero/hero6-img2.png" alt="" />
                </div>
                <div className="image3 shape-animaiton2">
                  <img src="/img/hero/hero6-img3.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== HERO AREA END ======= */}

      <div
        data-bs-spy="scroll"
        data-bs-target="#list-example"
        data-bs-offset="0"
        className="scrollspy-example"
        tabIndex={0}
      >
        {/* ===== COUNTERS AREA START ======= */}
        <div className="counters6 sp" id="counters">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 m-auto text-center">
                <div className="heading6">
                  <h3 className="text-anime-style-3">
                    {t("counters.heading")}
                  </h3>
                </div>
              </div>
            </div>
            <div className="space30" />
            <div className="row">
              <div className="col-lg-3 col-md-6">
                <div
                  className="counter-box box1"
                  data-aos="zoom-out"
                  data-aos-duration="700"
                >
                  <h2>
                    <span className="counter">8.000</span>+
                  </h2>
                  <p>{t("counters.kpi1.label")}</p>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div
                  className="counter-box box2"
                  data-aos="zoom-out"
                  data-aos-duration="900"
                >
                  <h2>
                    <span className="counter">1.500</span>+
                  </h2>
                  <p>{t("counters.kpi2.label")}</p>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div
                  className="counter-box box3"
                  data-aos="zoom-out"
                  data-aos-duration="1100"
                >
                  <h2>
                    <span className="counter">700</span>+
                  </h2>
                  <p>{t("counters.kpi3.label")}</p>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div
                  className="counter-box box4"
                  data-aos="zoom-out"
                  data-aos-duration="1200"
                >
                  <h2>
                    <span className="counter">91</span>%
                  </h2>
                  <p>{t("counters.kpi4.label")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ===== COUNTERS AREA END ======= */}

        {/* ===== BENEFÍCIOS PRINCIPAIS ===== */}
        <div className="editing6 sp" id="editing">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 m-auto text-center">
                <div className="heading6 benefits-heading-main">
                  <span className="title">
                    <img src="/img/icons/span-image6.png" alt="" />
                  </span>
                  <h2 className="text-anime-style-3">{t("benefits.title")}</h2>
                  <div className="space16" />
                  <p>{t("benefits.subtitle")}</p>
                </div>
              </div>
            </div>

            <div className="space30" />
            <div className="row">
              {/* 1 */}
              <div
                className="col-lg-4 col-md-6"
                data-aos="zoom-in-up"
                data-aos-duration="600"
              >
                <div className="editing-box">
                  <div className="icon">
                    <img src="/img/icons/editing6-icon1.svg" alt="" />
                  </div>
                  <div className="space16" />
                  <div className="heading6">
                    <h4>{t("benefits.item1.title")}</h4>
                    <div className="space16" />
                    <p>{t("benefits.item1.text")}</p>
                  </div>
                </div>
              </div>

              {/* 2 */}
              <div
                className="col-lg-4 col-md-6"
                data-aos="zoom-in-up"
                data-aos-duration="800"
              >
                <div className="editing-box">
                  <div className="icon">
                    <img src="/img/icons/editing6-icon2.svg" alt="" />
                  </div>
                  <div className="space16" />
                  <div className="heading6">
                    <h4>{t("benefits.item2.title")}</h4>
                    <div className="space16" />
                    <p>{t("benefits.item2.text")}</p>
                  </div>
                </div>
              </div>

              {/* 3 */}
              <div
                className="col-lg-4 col-md-6"
                data-aos="zoom-in-up"
                data-aos-duration="1000"
              >
                <div className="editing-box">
                  <div className="icon">
                    <img src="/img/icons/editing6-icon3.svg" alt="" />
                  </div>
                  <div className="space16" />
                  <div className="heading6">
                    <h4>{t("benefits.item3.title")}</h4>
                    <div className="space16" />
                    <p>{t("benefits.item3.text")}</p>
                  </div>
                </div>
              </div>

              {/* 4 */}
              <div
                className="col-lg-4 col-md-6"
                data-aos="zoom-in-up"
                data-aos-duration="600"
              >
                <div className="editing-box">
                  <div className="icon">
                    <img src="/img/icons/editing6-icon4.svg" alt="" />
                  </div>
                  <div className="space16" />
                  <div className="heading6">
                    <h4>{t("benefits.item4.title")}</h4>
                    <div className="space16" />
                    <p>{t("benefits.item4.text")}</p>
                  </div>
                </div>
              </div>

              {/* 5 */}
              <div
                className="col-lg-4 col-md-6"
                data-aos="zoom-in-up"
                data-aos-duration="800"
              >
                <div className="editing-box">
                  <div className="icon">
                    <img src="/img/icons/editing6-icon5.svg" alt="" />
                  </div>
                  <div className="space16" />
                  <div className="heading6">
                    <h4>{t("benefits.item5.title")}</h4>
                    <div className="space16" />
                    <p>{t("benefits.item5.text")}</p>
                  </div>
                </div>
              </div>

              {/* 6 */}
              <div
                className="col-lg-4 col-md-6"
                data-aos="zoom-in-up"
                data-aos-duration="1000"
              >
                <div className="editing-box">
                  <div className="icon">
                    <img src="/img/icons/editing6-icon6.svg" alt="" />
                  </div>
                  <div className="space16" />
                  <div className="heading6">
                    <h4>{t("benefits.item6.title")}</h4>
                    <div className="space16" />
                    <p>{t("benefits.item6.text")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== RECURSOS PRINCIPAIS ======= */}
        <div className="features6 sp" id="feature">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 m-auto text-center">
                <div className="heading6">
                  <span className="title">
                    <img src="/img/icons/span-image6.png" alt="" />
                  </span>
                  <h2 className="text-anime-style-3">
                    {t("features.heading")}
                  </h2>
                </div>
              </div>
            </div>

            {/* Monitoramento em tempo real */}
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div
                  className="main-image right60"
                  data-aos="zoom-out"
                  data-aos-duration="800"
                >
                  <img src="/img/others/features6-img1.png" alt="" />
                </div>
              </div>
              <div className="col-1" />
              <div className="col-lg-5">
                <div className="heading6 features-heading">
                  <span
                    className="span3"
                    data-aos="fade-left"
                    data-aos-duration="700"
                  >
                    {t("features.monitoring.badge")}
                  </span>
                  <h3 className="text-anime-style-3">
                    {t("features.monitoring.title")}
                  </h3>
                  <div className="space16" />
                  <p data-aos="fade-left" data-aos-duration="900">
                    {t("features.monitoring.text")}
                  </p>
                </div>
              </div>
            </div>

            {/* Agendamento de tarefas inteligente */}
            <div className="row align-items-center">
              <div className="col-lg-5">
                <div className="heading6 features-heading">
                  <span
                    className="span3"
                    data-aos="fade-right"
                    data-aos-duration="700"
                  >
                    {t("features.scheduling.badge")}
                  </span>
                  <h3 className="text-anime-style-3">
                    {t("features.scheduling.title")}
                  </h3>
                  <div className="space16" />
                  <p data-aos="fade-right" data-aos-duration="900">
                    {t("features.scheduling.text")}
                  </p>
                </div>
              </div>
              <div className="col-1" />
              <div className="col-lg-6">
                <div
                  className="main-image right60"
                  data-aos="zoom-out"
                  data-aos-duration="1000"
                >
                  <img src="/img/others/features6-img2.png" alt="" />
                </div>
              </div>
            </div>

            {/* Histórico detalhado */}
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div
                  className="main-image right60"
                  data-aos="zoom-out"
                  data-aos-duration="1000"
                >
                  <img src="/img/others/features6-img3.png" alt="" />
                </div>
              </div>
              <div className="col-1" />
              <div className="col-lg-5">
                <div className="heading6 features-heading">
                  <span
                    className="span3"
                    data-aos="fade-left"
                    data-aos-duration="700"
                  >
                    {t("features.history.badge")}
                  </span>
                  <h3 className="text-anime-style-3">
                    {t("features.history.title")}
                  </h3>
                  <div className="space16" />
                  <p data-aos="fade-left" data-aos-duration="900">
                    {t("features.history.text")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== SOBRE A Pilares (FAQ) ======= */}
        <div className="faq6 sp" id="faq">
          <div className="container">
            <div className="row">
              <div className="col-lg-10 m-auto text-center">
                <div className="heading6">
                  <span className="span">{t("about.badge")}</span>
                  <h2 className="text-anime-style-3">{t("about.title")}</h2>
                </div>

                <div className="space40" />

                <div className="accordion accordion1" id="accordionExample">
                  {/* Quem é a Pilares */}
                  <div
                    className="accordion-item active"
                    data-aos="fade-up"
                    data-aos-duration="700"
                  >
                    <h2 className="accordion-header" id="headingOne">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        {t("about.who.question")}
                      </button>
                    </h2>
                    <div
                      id="collapseOne"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        {t("about.who.part1")}
                        <br />
                        <br />
                        {t("about.who.part2")}
                      </div>
                    </div>
                  </div>

                  {/* Visão */}
                  <div
                    className="accordion-item"
                    data-aos="fade-up"
                    data-aos-duration="800"
                  >
                    <h2 className="accordion-header" id="headingTwo">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo"
                        aria-expanded="false"
                        aria-controls="collapseTwo"
                      >
                        {t("about.vision.question")}
                      </button>
                    </h2>
                    <div
                      id="collapseTwo"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingTwo"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        {t("about.vision.answer")}
                      </div>
                    </div>
                  </div>

                  {/* Missão */}
                  <div
                    className="accordion-item"
                    data-aos="fade-up"
                    data-aos-duration="900"
                  >
                    <h2 className="accordion-header" id="headingThree">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseThree"
                        aria-expanded="false"
                        aria-controls="collapseThree"
                      >
                        {t("about.mission.question")}
                      </button>
                    </h2>
                    <div
                      id="collapseThree"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingThree"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        {t("about.mission.answer")}
                      </div>
                    </div>
                  </div>

                  {/* Valores */}
                  <div
                    className="accordion-item"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                  >
                    <h2 className="accordion-header" id="headingFour">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseFour"
                        aria-expanded="false"
                        aria-controls="collapseFour"
                      >
                        {t("about.values.question")}
                      </button>
                    </h2>
                    <div
                      id="collapseFour"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingFour"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        {t("about.values.answer")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== FOOTER AREA START ======= */}
      <div className="footer6 _relative">
        <div className="container bg">
          <div className="row">
            {/* FORM / CONTATO */}
            <div className="col-lg-5">
              <div className="subscribe-area" id="contato">
                <h5>{t("form.title")}</h5>
                <p>{t("form.description")}</p>

                <form className="multi-input-form" onSubmit={handleFormSubmit}>
                  <input
                    type="hidden"
                    name="_subject"
                    value="Novo contato pelo site Pilares"
                  />

                  <div className="input-row">
                    <input
                      type="text"
                      name="firstName"
                      placeholder={t("form.firstName")}
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder={t("form.lastName")}
                    />
                  </div>
                  <div className="input-row">
                    <input
                      type="tel"
                      name="phone"
                      placeholder={t("form.phone")}
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder={t("form.email")}
                    />
                  </div>
                  <div className="input-row">
                    <input
                      type="text"
                      name="company"
                      placeholder={t("form.company")}
                    />
                    <input
                      type="text"
                      name="role"
                      placeholder={t("form.role")}
                    />
                  </div>
                  <div className="input-row">
                    <input
                      type="text"
                      name="teamSize"
                      placeholder={t("form.teamSize")}
                    />
                  </div>
                  <div className="input-row">
                    <textarea name="need" placeholder={t("form.need")} />
                  </div>
                  <div className="button">
                    <button
                      type="submit"
                      className="theme-btn9"
                      disabled={isSubmitting}
                    >
                      <span className="tb8">
                        {isSubmitting ? "Enviando..." : "Enviar mensagem"}
                        <span className="arrow">
                          <i className="fa-solid fa-arrow-right" />
                        </span>
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* COLUNA 2 */}
            <div className="col-lg col-md-6 col-12">
              <div className="single-footer-items">
                <h3>{t("footer.resources.title")}</h3>
                <ul className="menu-list">
                  <li>
                    <a href="#editing">{t("footer.resources.partners")}</a>
                  </li>
                  <li>
                    <a href="#faq">{t("footer.resources.about")}</a>
                  </li>
                  <li>
                    <a href="#feature">{t("footer.resources.features")}</a>
                  </li>
                  <li>
                    <a href="#editing">{t("footer.resources.benefits")}</a>
                  </li>
                </ul>
              </div>
            </div>

            {/* COLUNA 3 */}
            <div className="col-lg col-md-6 col-12">
              <div className="single-footer-items">
                <h3>{t("footer.company.title")}</h3>
                <ul className="menu-list">
                  <li>
                    <a href="#contato">{t("footer.company.contactTeam")}</a>
                  </li>
                  <li>
                    <a href="#faq">{t("footer.company.story")}</a>
                  </li>
                </ul>
              </div>
            </div>

            {/* COLUNA 4 - REDES SOCIAIS */}
            <div className="col-lg-3 col-md-6 col-12">
              <div className="single-footer-items">
                <h3>{t("footer.social.title")}</h3>
                <ul className="social-icons">
                  <li>
                    <a
                      href="https://www.linkedin.com/company/pilaress/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa-brands fa-linkedin-in" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/pilares.govtech/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa-brands fa-instagram" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://wa.me/5579996021438"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa-brands fa-whatsapp" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space40" />

          {/* COPYRIGHT */}
          <div className="copyright-area">
            <div className="row align-items-center">
              <div className="col-md-5 col-12">
                <div className="logo">
                  <a href="#hero">
                    <img src="/img/logo/footer-logo6.png" alt="Pilares" />
                  </a>
                </div>
              </div>
              <div className="col-md-7 col-12">
                <div className="coppyright text-right">
                  <a href="/" rel="noreferrer">
                    {t("footer.copyright", { year: new Date().getFullYear() })}
                  </a>
                  <a href="#">{t("footer.privacy")}</a>
                  <a href="#">{t("footer.terms")}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ===== FOOTER AREA END ======= */}

      {/* MODAL DE SUCESSO DO FORMULÁRIO */}
      {showSuccessModal && (
        <div
          className="form-modal-backdrop"
          onClick={() => setShowSuccessModal(false)}
        >
          <div className="form-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="form-modal-close"
              onClick={() => setShowSuccessModal(false)}
            >
              <i className="fa-solid fa-xmark" />
            </button>

            <div className="form-modal-icon">
              <svg viewBox="0 0 52 52" className="checkmark" aria-hidden="true">
                <circle
                  className="checkmark-circle"
                  cx="26"
                  cy="26"
                  r="25"
                  fill="none"
                />
                <path
                  className="checkmark-check"
                  fill="none"
                  d="M14 27l7 7 17-17"
                />
              </svg>
            </div>

            <h3>Obrigado!</h3>
            <p>Logo mais entraremos em contato.</p>

            <button
              type="button"
              className="theme-btn8"
              onClick={() => setShowSuccessModal(false)}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleIndex1Page;
