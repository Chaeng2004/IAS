import React from "react";

export default function CiaIntegrity() {
  return (
    <div style={{ animation: "fadeIn 0.3s" }}>
      <h2 style={{ fontSize: "24px", color: "#333", marginBottom: "16px" }}>Integrity</h2>
      <p style={{ color: "#444", lineHeight: "1.6", marginBottom: "20px" }}>
        Integrity is "the property of accuracy and completeness." In other words, integrity means maintaining the consistency, accuracy and trustworthiness of data over its entire life cycle. Data must not be changed during transit and unauthorized entities should not be able to alter the data.
      </p>

      <h3 style={{ fontSize: "20px", color: "#333", marginBottom: "12px" }}>Examples that compromise integrity:</h3>
      <ul style={{ color: "#444", lineHeight: "1.6", paddingLeft: "24px", marginBottom: "24px" }}>
        <li style={{ marginBottom: "8px" }}>human error when entering data</li>
        <li style={{ marginBottom: "8px" }}>errors during data transmission</li>
        <li style={{ marginBottom: "8px" }}>software bugs and hardware failures</li>
        <li style={{ marginBottom: "8px" }}>hackers change information that they should not have access to</li>
      </ul>

      <h3 style={{ fontSize: "20px", color: "#333", marginBottom: "12px" }}>Examples of methods ensuring integrity</h3>
      <ul style={{ color: "#444", lineHeight: "1.6", paddingLeft: "24px" }}>
        <li style={{ marginBottom: "8px" }}>well functioning authentication methods and access control</li>
        <li style={{ marginBottom: "8px" }}>checking integrity with hash functions</li>
        <li style={{ marginBottom: "8px" }}>backups and redundancy</li>
        <li style={{ marginBottom: "8px" }}>auditing and logging</li>
      </ul>
    </div>
  );
}