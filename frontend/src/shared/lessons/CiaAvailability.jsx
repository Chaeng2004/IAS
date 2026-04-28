import React from "react";

export default function CiaAvailability() {
  return (
    <div style={{ animation: "fadeIn 0.3s" }}>
      <h2 style={{ fontSize: "24px", color: "#333", marginBottom: "16px" }}>Availability</h2>
      <p style={{ color: "#444", lineHeight: "1.6", marginBottom: "20px" }}>
        Availability is "the property of being accessible and usable on demand by an authorized entity." In other words, authorized persons should have access to permitted resources at all times.
      </p>

      <h3 style={{ fontSize: "20px", color: "#333", marginBottom: "12px" }}>Examples that compromise availability:</h3>
      <ul style={{ color: "#444", lineHeight: "1.6", paddingLeft: "24px", marginBottom: "24px" }}>
        <li style={{ marginBottom: "8px" }}>denial-of-service attacks (DOS)</li>
        <li style={{ marginBottom: "8px" }}>hardware failures</li>
        <li style={{ marginBottom: "8px" }}>fire or other natural disasters</li>
        <li style={{ marginBottom: "8px" }}>software or network misconfigurations</li>
      </ul>

      <h3 style={{ fontSize: "20px", color: "#333", marginBottom: "12px" }}>Examples of methods ensuring availability</h3>
      <ul style={{ color: "#444", lineHeight: "1.6", paddingLeft: "24px" }}>
        <li style={{ marginBottom: "8px" }}>intrusion detection systems (IDSs)</li>
        <li style={{ marginBottom: "8px" }}>network traffic control</li>
        <li style={{ marginBottom: "8px" }}>firewalls</li>
        <li style={{ marginBottom: "8px" }}>
          physical security of hardware and underlying infrastructure
          <ul style={{ marginTop: "4px" }}>
             <li>protections against fire, water, and other elements</li>
          </ul>
        </li>
        <li style={{ marginBottom: "8px" }}>hardware maintenance</li>
        <li style={{ marginBottom: "8px" }}>redundancy</li>
      </ul>
    </div>
  );
}