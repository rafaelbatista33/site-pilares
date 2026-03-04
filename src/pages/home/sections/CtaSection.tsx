// src/pages/home/sections/CtaSection.tsx
import React from "react";
import { CtaWrapper, CtaGrid, CtaText, CtaVisual } from "./CtaSection.styles";

export const CtaSection: React.FC = () => {
  return (
    <CtaWrapper id="cta">
      <div className="container">
        <CtaGrid>
          <CtaText>
            <span className="tag">Start Free</span>
            <h2>
              Access A Library Of <br />
              Pre-Built Templates
            </h2>
            <p>
              Launch faster with professionally designed templates for landing
              pages, product launches, webinars, pricing pages and more.
              Customize everything to match your brand in a few clicks.
            </p>
            <a href="#hero" className="primary">
              Get Started, It&apos;s Free
            </a>
          </CtaText>

          <CtaVisual>
            <div className="card main" />
            <div className="card shadow" />
          </CtaVisual>
        </CtaGrid>
      </div>
    </CtaWrapper>
  );
};
