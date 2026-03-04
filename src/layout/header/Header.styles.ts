// src/layout/header/Header.styles.ts
import styled from "styled-components";

export const HeaderWrapper = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: blur(18px);
  background: rgba(5, 10, 31, 0.9);
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
`;

export const Nav = styled.nav`
  height: ${({ theme }) => theme.layout.headerHeight};
  display: flex;
  align-items: center;
  justify-content: space-between;

  .header-cta {
    padding: 8px 18px;
    border-radius: 999px;
    background: linear-gradient(135deg, #6534f4, #8f00ff);
    font-size: 0.9rem;
    font-weight: 500;
    white-space: nowrap;
  }
`;

export const Logo = styled.a`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 700;
  letter-spacing: 0.04em;
  font-size: 1rem;
`;

export const NavList = styled.ul`
  display: flex;
  gap: 20px;
  margin-right: 20px;

  a {
    font-size: 0.9rem;
    opacity: 0.8;
    transition: opacity 0.2s ease, transform 0.15s ease;
  }

  a:hover {
    opacity: 1;
    transform: translateY(-1px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none; /* depois você pode implementar o mobile menu */
  }
`;
