// src/layout/header/Header.tsx
import React from "react";
import { HeaderWrapper, Nav, Logo, NavList } from "./Header.styles";

export const Header: React.FC = () => {
  return (
    <HeaderWrapper>
      <Logo href="#hero">eSoft Builder</Logo>

      <Nav>
        <NavList>
          <li>
            <a href="#counters">Counters</a>
          </li>
          <li>
            <a href="#editing">Editing</a>
          </li>
          <li>
            <a href="#feature">Features</a>
          </li>
          <li>
            <a href="#brands">Brands</a>
          </li>
          <li>
            <a href="#faq">FAQ</a>
          </li>
        </NavList>

        <a href="#cta" className="header-cta">
          Get Started
        </a>
      </Nav>
    </HeaderWrapper>
  );
};
