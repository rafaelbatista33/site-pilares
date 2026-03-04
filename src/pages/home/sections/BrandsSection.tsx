// src/pages/home/sections/BrandsSection.tsx
import React from "react";
import {
  BrandsWrapper,
  BrandsRow,
  BrandsText,
  BrandsVisual,
} from "./BrandsSection.styles";

export const BrandsSection: React.FC = () => {
  return (
    <BrandsWrapper id="brands">
      <div className="container">
        <BrandsRow>
          <BrandsText>
            <span className="tag">Integration Brands</span>
            <h2>Integrate eSoft With 3K+ Apps</h2>
            <p>
              Connect your favorite CRM, email marketing platform, analytics and
              automation tools in a few clicks. eSoft Builder integrates with
              thousands of apps so your website fits perfectly into your stack.
            </p>
            <a href="#cta" className="primary">
              Get Started, It&apos;s Free
            </a>
          </BrandsText>

          <BrandsVisual>
            <div className="orbit" />
            <div className="badge center">3K+ Apps</div>
            <div className="badge tl">CRM</div>
            <div className="badge tr">Email</div>
            <div className="badge bl">Analytics</div>
            <div className="badge br">Automation</div>
          </BrandsVisual>
        </BrandsRow>
      </div>
    </BrandsWrapper>
  );
};
