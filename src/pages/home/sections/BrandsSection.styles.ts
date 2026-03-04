// src/pages/home/sections/BrandsSection.styles.ts
import styled from "styled-components";

export const BrandsWrapper = styled.section`
  padding: 80px 0;
  background: radial-gradient(circle at center, #101537 0, #05081c 70%);
`;

export const BrandsRow = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
  gap: 40px;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

export const BrandsText = styled.div`
  .tag {
    display: inline-flex;
    padding: 4px 10px;
    border-radius: 999px;
    font-size: 0.75rem;
    background: rgba(101, 52, 244, 0.2);
    color: #c8bafe;
    margin-bottom: 8px;
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

export const BrandsVisual = styled.div`
  position: relative;
  min-height: 260px;

  .orbit {
    position: absolute;
    inset: 12%;
    border-radius: 999px;
    border: 1px dashed rgba(255, 255, 255, 0.18);
  }

  .badge {
    position: absolute;
    padding: 8px 12px;
    border-radius: 999px;
    background: ${({ theme }) => theme.colors.cardBg};
    border: 1px solid ${({ theme }) => theme.colors.borderSoft};
    font-size: 0.8rem;
  }

  .center {
    inset: 50%;
    transform: translate(-50%, -50%);
  }

  .tl {
    top: 10%;
    left: 10%;
  }

  .tr {
    top: 10%;
    right: 10%;
  }

  .bl {
    bottom: 10%;
    left: 10%;
  }

  .br {
    bottom: 10%;
    right: 10%;
  }
`;
