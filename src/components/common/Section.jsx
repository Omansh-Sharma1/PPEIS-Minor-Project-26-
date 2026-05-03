// src/components/common/Section.jsx
import React from "react";

export default function Section({ id, title, children }) {
  return (
    <section
      id={id}
      className="max-w-4xl mx-auto my-12 px-6 py-8 bg-gray-900/70 backdrop-blur-md 
                 border border-gray-700 rounded-2xl shadow-lg transition-all duration-300 hover:scale-[1.02]"
    >
      <h2 className="text-3xl font-bold mb-6 text-gradient bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
        {title}
      </h2>
      <div className="text-gray-300 space-y-3 text-base">{children}</div>
    </section>
  );
}