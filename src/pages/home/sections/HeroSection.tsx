// src/pages/home/sections/HeroSection.tsx
import React from "react";
import {
  HeroWrapper,
  HeroGrid,
  HeroTitle,
  HeroText,
  HeroButtons,
} from "./HeroSection.styles";

export const HeroSection: React.FC = () => {
  return (
    <HeroWrapper id="hero">
      <div className="container">
        <HeroGrid>
          <div>
            <span className="eyebrow">
              <span className="dot" />
              Top Choice For 5,800+ Websites Worldwide
            </span>
            <HeroTitle>Build Your Website With eSoft Builder</HeroTitle>
            <HeroText>
              eSoft takes the Customizer to the next level so you can customize
              every aspect of your website from a single visual interface.
            </HeroText>
            <HeroButtons>
              <a href="#cta" className="primary">
                Get Started Now
              </a>
              <button className="ghost" type="button">
                ▶ Play Video
              </button>
            </HeroButtons>
          </div>

          <div className="images">
            <div className="hero-card main" />
            <div className="hero-card secondary" />
            <div className="hero-badge">Drag &amp; Drop Builder</div>
          </div>
        </HeroGrid>
      </div>
    </HeroWrapper>
  );
};
