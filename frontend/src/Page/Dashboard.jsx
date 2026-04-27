import React, { useEffect, useState } from "react";
import { LogOut, ExternalLink, ShieldAlert, CheckCircle } from "lucide-react";
import { CRIMSON, CRIMSON_DARK } from "./styles/authStyle"; 

export default function Dashboard({ onLogout }) {
  const [webGoatUrl, setWebGoatUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLink = async () => {
      const token = localStorage.getItem("token");
      
      if (!token) {
        setError("Unauthorized. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/webgoat-link", {
          headers: { "Authorization": token }
        });
        
        const data = await response.json();
        
        if (response.ok) {
          setWebGoatUrl(data.url);
        } else {
          setError("Failed to load security module link.");
        }
      } catch (err) {
        setError("Cannot connect to server.");
      } finally {
        setLoading(false);
      }
    };

    fetchLink();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    onLogout();
  };

  return (
    <div style={{ padding: "40px 20px", maxWidth: "800px", margin: "0 auto", fontFamily: "sans-serif" }}>
      
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}>
        <div>
          <h1 style={{ fontSize: "24px", color: "#111" }}>Security Dashboard</h1>
          <p style={{ color: "#666", marginTop: "4px" }}>Welcome to your protected workspace.</p>
        </div>
        <button 
          onClick={handleLogout}
          style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 16px", background: "#fef2f2", color: CRIMSON, border: `1px solid ${CRIMSON}`, borderRadius: "6px", cursor: "pointer", fontWeight: "600" }}
        >
          <LogOut size={16} /> Logout
        </button>
      </div>

      <div style={{ background: "#fff", border: "1px solid #e5e5e5", borderRadius: "12px", padding: "24px", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
          <div style={{ background: "#fef2f2", padding: "10px", borderRadius: "8px", color: CRIMSON }}>
            <ShieldAlert size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: "18px", color: "#111" }}>WebGoat Module: SQL Injection</h2>
            <p style={{ color: "#666", fontSize: "14px", marginTop: "4px" }}>Status: <span style={{ color: "#16a34a", fontWeight: "600" }}><CheckCircle size={12} style={{ display: "inline", marginBottom: "-2px" }}/> Completed</span></p>
          </div>
        </div>

        <p style={{ color: "#444", fontSize: "15px", lineHeight: "1.6", marginBottom: "20px", paddingBottom: "20px", borderBottom: "1px solid #eee" }}>
          This module demonstrates how malicious SQL statements can be inserted into entry fields for execution. The attached WebGoat lesson has been completed and properly connected to this project.
        </p>

        <div style={{ width: "100%", height: "200px", background: "#f8fafc", border: "2px dashed #cbd5e1", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748b", marginBottom: "24px", fontSize: "14px" }}>
          [Insert Screenshot of completed WebGoat Lesson here]
        </div>

        {loading ? (
          <p style={{ color: "#666" }}>Decrypting secure link...</p>
        ) : error ? (
          <p style={{ color: CRIMSON }}>{error}</p>
        ) : (
          <a 
            href={webGoatUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 24px", background: CRIMSON, color: "#fff", textDecoration: "none", borderRadius: "6px", fontWeight: "600", transition: "background 0.2s" }}
            onMouseEnter={e => e.target.style.background = CRIMSON_DARK}
            onMouseLeave={e => e.target.style.background = CRIMSON}
          >
            Open WebGoat Lesson <ExternalLink size={16} />
          </a>
        )}
        <p style={{ fontSize: "12px", color: "#888", marginTop: "12px", fontStyle: "italic" }}>
          Note: You must be logged into the WebGoat instance to view this lesson.
        </p>
      </div>

    </div>
  );
}