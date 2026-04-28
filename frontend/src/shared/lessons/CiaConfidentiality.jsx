import React from "react";

export default function CiaConfidentiality() {
  return (
    <div style={{ animation: "fadeIn 0.3s" }}>
      <h2 style={{ fontSize: "24px", color: "#333", marginBottom: "16px" }}>Confidentiality</h2>
      <p style={{ color: "#444", lineHeight: "1.6", marginBottom: "12px" }}>
        Confidentiality is "the property, that information is not made available or disclosed to unauthorized individuals, entities, or processes." In other words, confidentiality requires that unauthorized users should not be able to access sensitive resources. Confidentiality must be balanced with availability; authorized persons must still be able to access the resources they have been granted permissions for.
      </p>
      <p style={{ color: "#444", lineHeight: "1.6", marginBottom: "20px" }}>
        Although confidentiality is similar to "privacy", these two words are not interchangeable. Rather, confidentiality is a component of privacy; confidentiality is implemented to protect resources from unauthorized entities.
      </p>
      
      <h3 style={{ fontSize: "20px", color: "#333", marginBottom: "12px" }}>Examples that compromise confidentiality:</h3>
      <ul style={{ color: "#444", lineHeight: "1.6", paddingLeft: "24px" }}>
        <li style={{ marginBottom: "8px" }}>a hacker gets access to the password database of a company</li>
        <li style={{ marginBottom: "8px" }}>a sensitive emails is sent to the incorrect individual</li>
        <li style={{ marginBottom: "8px" }}>a hacker reads sensitive information by intercepting and eavesdropping on an information transfer</li>
      </ul>
    </div>
  );
}