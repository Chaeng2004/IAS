import React from "react";

export default function CiaIntroduction() {
  return (
    <div style={{ animation: "fadeIn 0.3s" }}>
      <h2 style={{ fontSize: "24px", color: "#333", marginBottom: "16px" }}>The CIA Triad</h2>
      <p style={{ color: "#444", lineHeight: "1.6", marginBottom: "12px" }}>
        The CIA Triad (confidentiality, integrity, availability) is a model for information security. The three elements of the triad are considered the most crucial information security components and should be guaranteed in any secure system. Serious consequences can result if even one these elements is breached.
      </p>
      <p style={{ color: "#444", lineHeight: "1.6" }}>
        The CIA Triad was created to provide a baseline standard for evaluating and implementing security regardless of the underlying system and/or organization.
      </p>
    </div>
  );
}