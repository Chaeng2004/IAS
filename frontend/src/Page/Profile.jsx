import React from "react";
import { User, CheckCircle } from "lucide-react";

export default function Profile({ userEmail }) {
  return (
    <div className="profile-card" style={{ background: "#fff", border: "1px solid #e5e5e5", borderRadius: "12px", padding: "32px", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)" }}>
      <style>{`
        .profile-layout { display: flex; align-items: center; gap: 32px; text-align: left; }
        .profile-avatar { width: 100px; height: 100px; flex-shrink: 0; background: #f1f5f9; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid #e2e8f0; }
        .profile-stats-grid { display: flex; gap: 20px; margin-top: 24px; }
        .stat-box { flex: 1; background: #f8fafc; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; }
        
        /* Mobile Breakpoint */
        @media (max-width: 600px) {
          .profile-layout { flex-direction: column; text-align: center; }
          .profile-stats-grid { flex-direction: column; width: 100%; gap: 16px; }
          .stat-box { display: flex; flex-direction: column; align-items: center; }
        }
      `}</style>

      <div className="profile-layout">
        
        <div className="profile-avatar">
          <User size={48} color="#64748b" />
        </div>

        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: "24px", color: "#111", marginBottom: "4px" }}>Verified Protected User</h2>
          <p style={{ color: "#666", fontSize: "16px" }}>{userEmail}</p>

          <div className="profile-stats-grid">
            <div className="stat-box">
              <p style={{ fontSize: "12px", color: "#64748b", textTransform: "uppercase", fontWeight: "700", marginBottom: "6px" }}>Account Status</p>
              <p style={{ fontSize: "16px", color: "#16a34a", fontWeight: "600", display: "flex", alignItems: "center", gap: "6px" }}>
                <CheckCircle size={16}/> Active & Verified
              </p>
            </div>
            
            <div className="stat-box">
              <p style={{ fontSize: "12px", color: "#64748b", textTransform: "uppercase", fontWeight: "700", marginBottom: "6px" }}>Clearance Level</p>
              <p style={{ fontSize: "16px", color: "#111", fontWeight: "600" }}>Student</p>
            </div> 
          </div>
        </div>

      </div>
    </div>
  );
}