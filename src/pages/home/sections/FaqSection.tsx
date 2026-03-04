// src/pages/home/sections/FaqSection.tsx
import React, { useState } from "react";
import {
  FaqWrapper,
  FaqHeader,
  FaqList,
  FaqItem,
  Question,
  Answer,
} from "./FaqSection.styles";

const faqData = [
  {
    q: "What is eSoft Builder?",
    a: "eSoft Builder is a visual page builder that lets you design and launch websites without writing code, while still giving developers full control when needed.",
  },
  {
    q: "Do I need coding skills to use it?",
    a: "No. You can build and customize pages using drag and drop. If you know CSS, you can enhance your designs even further.",
  },
  {
    q: "Can I integrate my existing tools?",
    a: "Yes. eSoft integrates with popular CRMs, email marketing tools, analytics platforms and more via native integrations and Zapier.",
  },
  {
    q: "Is it mobile responsive?",
    a: "Absolutely. Every layout is responsive by default, and you can tweak designs for desktop, tablet and mobile views individually.",
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <FaqWrapper id="faq">
      <div className="container">
        <FaqHeader>
          <span className="tag">FAQ</span>
          <h2>Frequently Asked Questions</h2>
          <p>
            Still wondering if eSoft is right for you? These are the questions
            we hear most from new customers.
          </p>
        </FaqHeader>

        <FaqList>
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <FaqItem key={item.q} $open={isOpen}>
                <button type="button" onClick={() => toggle(index)}>
                  <Question>{item.q}</Question>
                  <span className="icon">{isOpen ? "−" : "+"}</span>
                </button>
                {isOpen && <Answer>{item.a}</Answer>}
              </FaqItem>
            );
          })}
        </FaqList>
      </div>
    </FaqWrapper>
  );
};
