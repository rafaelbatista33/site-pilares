// src/pages/home/sections/CountersSection.styles.ts
import styled from "styled-components";

export const CountersWrapper = styled.section`
  padding: 80px 0;
  background: #05081c;
`;

export const CountersHeader = styled.div`
  text-align: center;
  max-width: 640px;
  margin: 0 auto 32px;

  h3 {
    font-size: 1.6rem;
    margin-bottom: 10px;
  }

  p {
    font-size: 0.95rem;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const CountersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

export const CounterCard = styled.div`
  padding: 22px 18px;
  border-radius: 18px;
  background: ${({ theme }) => theme.colors.cardBg};
  border: 1px solid ${({ theme }) => theme.colors.borderSoft};
  text-align: left;

  h2 {
    margin: 0 0 4px;
    font-size: 1.8rem;
    span {
      font-size: 1.1rem;
    }
  }

  p {
    margin: 0;
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;
