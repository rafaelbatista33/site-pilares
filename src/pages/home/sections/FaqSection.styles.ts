// src/pages/home/sections/FaqSection.styles.ts
import styled from "styled-components";

export const FaqWrapper = styled.section`
  padding: 80px 0;
  background: #05081c;
`;

export const FaqHeader = styled.div`
  text-align: center;
  max-width: 600px;
  margin: 0 auto 32px;

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
    font-size: 1.7rem;
    margin-bottom: 8px;
  }

  p {
    font-size: 0.95rem;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const FaqList = styled.div`
  max-width: 720px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const FaqItem = styled.div<{ $open: boolean }>`
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.cardBg};
  border: 1px solid
    ${({ theme, $open }) =>
      $open ? theme.colors.primary : theme.colors.borderSoft};
  padding: 10px 14px;

  button {
    width: 100%;
    padding: 0;
    border: none;
    background: transparent;
    color: inherit;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
  }

  .icon {
    font-size: 1.2rem;
    padding-left: 10px;
  }
`;

export const Question = styled.p`
  margin: 0;
  font-size: 0.95rem;
  font-weight: 500;
`;

export const Answer = styled.p`
  margin: 8px 0 4px;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;
