// src/pages/home/sections/HeroSection.styles.ts
import styled from "styled-components";

export const HeroWrapper = styled.section`
  padding: 120px 0 80px;
  background: radial-gradient(circle at top, #6534f4 0, #050a1f 55%);
`;

export const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
  gap: 40px;
  align-items: center;

  .eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 4px 10px;
    border-radius: 999px;
    font-size: 0.75rem;
    background: rgba(0, 0, 0, 0.25);
    color: ${({ theme }) => theme.colors.textMuted};

    .dot {
      width: 6px;
      height: 6px;
      border-radius: 999px;
      background: #ffcd4d;
    }
  }

  .images {
    position: relative;
    min-height: 260px;
  }

  .hero-card {
    position: absolute;
    border-radius: 24px;
    background: ${({ theme }) => theme.colors.cardBg};
    border: 1px solid ${({ theme }) => theme.colors.borderSoft};
    box-shadow: 0 18px 60px rgba(0, 0, 0, 0.6);
  }

  .hero-card.main {
    inset: 0;
    transform: translate(10px, -10px);
  }

  .hero-card.secondary {
    inset: 18%;
    transform: translate(-18px, 10px);
    opacity: 0.65;
  }

  .hero-badge {
    position: absolute;
    bottom: 14px;
    left: 18px;
    padding: 8px 12px;
    border-radius: 999px;
    background: #121738;
    font-size: 0.75rem;
    border: 1px solid ${({ theme }) => theme.colors.borderSoft};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

export const HeroTitle = styled.h1`
  margin: 16px 0 12px;
  font-size: clamp(2.3rem, 4vw, 3.4rem);
  line-height: 1.08;
`;

export const HeroText = styled.p`
  max-width: 480px;
  font-size: 0.95rem;
  opacity: 0.88;
`;

export const HeroButtons = styled.div`
  margin-top: 28px;
  display: flex;
  gap: 14px;
  flex-wrap: wrap;

  .primary {
    padding: 10px 20px;
    border-radius: 999px;
    background: linear-gradient(135deg, #6534f4, #8f00ff);
    font-size: 0.9rem;
    font-weight: 500;
  }

  .ghost {
    padding: 9px 16px;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.16);
    background: transparent;
    color: inherit;
    font-size: 0.9rem;
    cursor: pointer;
  }
`;
