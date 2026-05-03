import React from "react";
import Section from "../components/common/Section";

export default function Home() {
  return (
    <div className="space-y-12 px-6 py-12 max-w-7xl mx-auto">

      <Section id="problem" title="Problem Understanding">
        <p>
          AQI systems provide area-based pollution levels but do not reflect
          personal exposure based on activity and time.
        </p>
      </Section>

      <Section id="objectives" title="Objectives">
        <ul className="list-disc pl-6 space-y-1">
          <li>Understand limitations of AQI systems</li>
          <li>Build personalized exposure model</li>
          <li>Integrate environmental + user data</li>
        </ul>
      </Section>

      <Section id="feasibility" title="Feasibility">
        <ul className="list-disc pl-6 space-y-1">
          <li>Uses APIs for real-time data</li>
          <li>Frontend-based system</li>
          <li>Extendable to ML models</li>
        </ul>
      </Section>

    </div>
  );
}