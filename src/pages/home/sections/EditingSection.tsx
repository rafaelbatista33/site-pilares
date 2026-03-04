// src/pages/home/sections/EditingSection.tsx
import React from "react";
import {
  EditingWrapper,
  EditingHeader,
  EditingGrid,
  EditingCard,
} from "./EditingSection.styles";

const items = [
  {
    title: "Drag & Drop Editing",
    description:
      "Move sections, columns and widgets visually. No code required to build complex layouts.",
  },
  {
    title: "True Visual Editing",
    description:
      "See changes in real time as you design. What you see in the editor is exactly what goes live.",
  },
  {
    title: "Custom CSS Control",
    description:
      "Developers can extend every component with CSS for full design control.",
  },
  {
    title: "Responsive Editing",
    description:
      "Preview and tweak your designs for desktop, tablet and mobile in one place.",
  },
  {
    title: "Copy / Paste Styles",
    description:
      "Reuse styling from any element across the page to keep consistency in seconds.",
  },
  {
    title: "Global Element Styles",
    description:
      "Update design once and sync it across pages with global styles.",
  },
];

export const EditingSection: React.FC = () => {
  return (
    <EditingWrapper id="editing">
      <div className="container">
        <EditingHeader>
          <span className="tag">Visual Builder</span>
          <h2>Powerful Visual Editing For Your Entire Site</h2>
          <p>
            Design your pages, headers, footers and templates from one visual
            canvas. eSoft Builder gives you the speed of a page builder with the
            flexibility of custom code.
          </p>
        </EditingHeader>

        <EditingGrid>
          {items.map((item) => (
            <EditingCard key={item.title}>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </EditingCard>
          ))}
        </EditingGrid>
      </div>
    </EditingWrapper>
  );
};
