// src/pages/home/HomePage.tsx
import React from "react";
import { HeroSection } from "./sections/HeroSection";
import { CountersSection } from "./sections/CountersSection";
import { EditingSection } from "./sections/EditingSection";
import { FeaturesSection } from "./sections/FeaturesSection";
import { BrandsSection } from "./sections/BrandsSection";
import { FaqSection } from "./sections/FaqSection";
import { CtaSection } from "./sections/CtaSection";

export const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <CountersSection />
      <EditingSection />
      <FeaturesSection />
      <BrandsSection />
      <FaqSection />
      <CtaSection />
    </>
  );
};
