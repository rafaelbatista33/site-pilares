// src/pages/home/sections/CtaSection.styles.ts
import styled from "styled-components";

export const CtaWrapper = styled.section`
  padding: 80px 0;
  background: radial-gradient(circle at bottom, #6534f4 0, #050a1f 60%);
`;

export const CtaGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
  gap: 40px;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

export const CtaText = styled.div`
  .tag {
    display: inline-flex;
    padding: 4px 10px;
    border-radius: 999px;
    font-size: 0.75rem;
    background: rgba(101, 52, 244, 0.2);
    color: #c8bafe;
    margin-bottom: 10px;
  }

  h2 {
    font-size: 1.8rem;
    margin: 4px 0 12px;
  }

  p {
    font-size: 0.95rem;
    color: ${({ theme }) => theme.colors.textMuted};
    margin-bottom: 18px;
  }

  .primary {
    display: inline-flex;
    padding: 10px 20px;
    border-radius: 999px;
    background: linear-gradient(135deg, #6534f4, #8f00ff);
    font-size: 0.9rem;
    font-weight: 500;
  }
`;

export const CtaVisual = styled.div`
  position: relative;
  min-height: 230px;

  .card {
    position: absolute;
    border-radius: 26px;
    background: ${({ theme }) => theme.colors.cardBg};
    border: 1px solid ${({ theme }) => theme.colors.borderSoft};
    box-shadow: 0 18px 60px rgba(0, 0, 0, 0.6);
  }

  .card.main {
    inset: 0;
  }

  .card.shadow {
    inset: 18%;
    transform: translate(18px, 12px);
    opacity: 0.6;
  }
`;
