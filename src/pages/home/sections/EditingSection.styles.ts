// src/pages/home/sections/EditingSection.styles.ts
import styled from "styled-components";

export const EditingWrapper = styled.section`
  padding: 80px 0;
  background: radial-gradient(circle at top, #101537 0, #05081c 55%);
`;

export const EditingHeader = styled.div`
  text-align: center;
  max-width: 640px;
  margin: 0 auto 36px;

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
    margin-bottom: 10px;
  }

  p {
    font-size: 0.95rem;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const EditingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

export const EditingCard = styled.div`
  padding: 20px 18px;
  border-radius: 18px;
  background: ${({ theme }) => theme.colors.cardBg};
  border: 1px solid ${({ theme }) => theme.colors.borderSoft};
  min-height: 140px;

  h4 {
    margin: 0 0 10px;
    font-size: 1rem;
  }

  p {
    margin: 0;
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;
