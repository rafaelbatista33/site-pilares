// src/layout/footer/Footer.styles.ts
import styled from "styled-components";

export const FooterWrapper = styled.footer`
  background: ${({ theme }) => theme.colors.bgSoft};
  border-top: 1px solid rgba(255, 255, 255, 0.04);
  padding: 60px 0 30px;
  margin-top: 80px;
`;

export const FooterTop = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 1.4fr);
  gap: 40px;
  margin-bottom: 32px;

  .left h4 {
    font-size: 1.2rem;
    margin-bottom: 8px;
  }

  .left p {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.textMuted};
    max-width: 380px;
  }

  .input-row {
    margin-top: 16px;
    display: flex;
    gap: 10px;
    flex-wrap: wrap;

    input {
      flex: 1;
      min-width: 180px;
      padding: 10px 12px;
      border-radius: 999px;
      border: 1px solid ${({ theme }) => theme.colors.borderSoft};
      background: rgba(5, 10, 31, 0.9);
      color: ${({ theme }) => theme.colors.textLight};
      font-size: 0.9rem;
    }

    button {
      padding: 10px 16px;
      border-radius: 999px;
      border: none;
      cursor: pointer;
      background: linear-gradient(135deg, #6534f4, #8f00ff);
      font-size: 0.9rem;
      font-weight: 500;
      white-space: nowrap;
    }
  }

  .right {
    display: flex;
    gap: 40px;
    justify-content: flex-end;

    .col h5 {
      margin-bottom: 10px;
      font-size: 0.95rem;
    }

    .col ul {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .col a {
      font-size: 0.85rem;
      color: ${({ theme }) => theme.colors.textMuted};
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;

    .right {
      justify-content: flex-start;
    }
  }
`;

export const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.04);
  padding-top: 16px;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textMuted};

  display: flex;
  justify-content: space-between;
  gap: 10px;

  .links {
    display: flex;
    gap: 14px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
