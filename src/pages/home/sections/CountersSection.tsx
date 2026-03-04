// src/pages/home/sections/CountersSection.tsx
import React from "react";
import {
  CountersWrapper,
  CountersHeader,
  CountersGrid,
  CounterCard,
} from "./CountersSection.styles";

export const CountersSection: React.FC = () => {
  return (
    <CountersWrapper id="counters">
      <div className="container">
        <CountersHeader>
          <h3>Trusted by 5,800+ Websites Worldwide</h3>
          <p>
            Designers, marketers and developers all over the world use eSoft
            Builder to launch high-converting pages in minutes.
          </p>
        </CountersHeader>

        <CountersGrid>
          <CounterCard>
            <h2>
              16M<span>+</span>
            </h2>
            <p>Pages Built With eSoft</p>
          </CounterCard>

          <CounterCard>
            <h2>
              6.5K<span>+</span>
            </h2>
            <p>5 Star Reviews</p>
          </CounterCard>

          <CounterCard>
            <h2>
              100<span>+</span>
            </h2>
            <p>Premium Templates</p>
          </CounterCard>

          <CounterCard>
            <h2>
              15<span>s</span>
            </h2>
            <p>Average Page Load</p>
          </CounterCard>
        </CountersGrid>
      </div>
    </CountersWrapper>
  );
};
