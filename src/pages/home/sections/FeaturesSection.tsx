// src/pages/home/sections/FeaturesSection.tsx
import React from "react";
import {
  FeaturesWrapper,
  FeaturesRow,
  FeaturesText,
  FeaturesImage,
} from "./FeaturesSection.styles";

export const FeaturesSection: React.FC = () => {
  return (
    <FeaturesWrapper id="feature">
      <div className="container">
        <FeaturesRow>
          <FeaturesImage>
            {/* Aqui você pode trocar por <img src="/img/..." /> se quiser */}
            <div className="mockup main" />
            <div className="mockup secondary" />
          </FeaturesImage>

          <FeaturesText>
            <span className="tag">Page Builder</span>
            <h3>Front / Back-End Page Builder</h3>
            <p>
              Build responsive pages and manage your content visually. Drag and
              drop sections, tweak typography, colors, spacing and launch in a
              fraction of the time of traditional development.
            </p>
            <p>
              Whether you&apos;re a marketer, designer or developer, eSoft
              Builder gives you the tools to move faster without sacrificing
              quality or performance.
            </p>
            <a href="#cta" className="primary">
              Get More Info
            </a>
          </FeaturesText>
        </FeaturesRow>
      </div>
    </FeaturesWrapper>
  );
};
