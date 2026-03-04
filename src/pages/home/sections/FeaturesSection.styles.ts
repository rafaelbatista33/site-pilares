// src/pages/home/sections/FeaturesSection.styles.ts
import styled from "styled-components";

export const FeaturesWrapper = styled.section`
  padding: 80px 0;
  background: #05081c;
`;

export const FeaturesRow = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1.1fr);
  gap: 40px;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

export const FeaturesImage = styled.div`
  position: relative;
  min-height: 260px;

  .mockup {
    position: absolute;
    border-radius: 24px;
    background: ${({ theme }) => theme.colors.cardBg};
    border: 1px solid ${({ theme }) => theme.colors.borderSoft};
    box-shadow: 0 18px 60px rgba(0, 0, 0, 0.6);
  }

  .mockup.main {
    inset: 0;
  }

  .mockup.secondary {
    inset: 18%;
    transform: translate(24px, 10px);
    opacity: 0.7;
  }
`;

export const FeaturesText = styled.div`
  .tag {
    display: inline-flex;
    padding: 4px 10px;
    border-radius: 999px;
    font-size: 0.75rem;
    background: rgba(101, 52, 244, 0.2);
    color: #c8bafe;
    margin-bottom: 8px;
  }

  h3 {
    font-size: 1.6rem;
    margin: 4px 0 12px;
  }

  p {
    font-size: 0.95rem;
    color: ${({ theme }) => theme.colors.textMuted};
    margin: 0 0 10px;
  }

  .primary {
    display: inline-flex;
    margin-top: 18px;
    padding: 10px 20px;
    border-radius: 999px;
    background: linear-gradient(135deg, #6534f4, #8f00ff);
    font-size: 0.9rem;
    font-weight: 500;
  }
`;
