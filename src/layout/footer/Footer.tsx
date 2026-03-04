// src/layout/footer/Footer.tsx
import React from "react";
import { FooterWrapper, FooterTop, FooterBottom } from "./Footer.styles";

export const Footer: React.FC = () => {
  return (
    <FooterWrapper id="footer">
      <div className="container">
        <FooterTop>
          <div className="left">
            <h4>Subscribe to our newsletter</h4>
            <p>
              eSoft has exceeded our expectations every way. Build and launch
              pages faster with visual editing.
            </p>
            <div className="input-row">
              <input type="email" placeholder="Email Address" />
              <button type="button">Get Started Now</button>
            </div>
          </div>

          <div className="right">
            <div className="col">
              <h5>Resources</h5>
              <ul>
                <li>
                  <a href="#">Community</a>
                </li>
                <li>
                  <a href="#">Affiliates</a>
                </li>
                <li>
                  <a href="#">Partnerships</a>
                </li>
                <li>
                  <a href="#">API Docs</a>
                </li>
              </ul>
            </div>

            <div className="col">
              <h5>Download</h5>
              <ul>
                <li>
                  <a href="#">iPhone &amp; iPad</a>
                </li>
                <li>
                  <a href="#">Android</a>
                </li>
                <li>
                  <a href="#">MacOS</a>
                </li>
                <li>
                  <a href="#">Windows</a>
                </li>
              </ul>
            </div>
          </div>
        </FooterTop>

        <FooterBottom>
          <span>© 2024 eSoft</span>
          <div className="links">
            <a href="#">Security</a>
            <a href="#">Your Privacy</a>
            <a href="#">Terms</a>
          </div>
        </FooterBottom>
      </div>
    </FooterWrapper>
  );
};
