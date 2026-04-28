import React, { useEffect, useState } from "react";
import { LogOut, ExternalLink, ShieldAlert, CheckCircle, Info, User, AlertTriangle } from "lucide-react";
import { CRIMSON, CRIMSON_DARK } from "../styles/authStyle"; 
import { supabase } from "../supabase"; 
import Profile from "./Profile"; 
import CiaLessonContainer from "../shared/lessons/CiaLessonContainer";

export default function Dashboard({ onLogout }) {
  const [webGoatUrl, setWebGoatUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  
  const [currentView, setCurrentView] = useState("dashboard"); 
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const [ciaCompleted, setCiaCompleted] = useState(false);

  useEffect(() => {
    if (currentView === "dashboard") {
      document.title = "Dashboard | IAS";
    } else if (currentView === "profile") {
      document.title = "Profile | IAS";
    }
  }, [currentView]);

  useEffect(() => {
    const fetchLink = async () => {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (!session || sessionError) {
        setError("Unauthorized. Please log in.");
        setLoading(false);
        return;
      }

      setUserEmail(session.user.email);

      if (session.user.user_metadata?.ciaCompleted) {
        setCiaCompleted(true);
      }

      try {
        const API_URL = import.meta.env.VITE_API_URL;
        const response = await fetch(`${API_URL}/api/webgoat-link`, {
          headers: { "Authorization": session.access_token } 
        });
        
        const data = await response.json();
        
        if (response.ok) {
          setWebGoatUrl(data.url);
        } else {
          setError("Failed to load security module link.");
        }
      } catch (err) {
        setError("Cannot connect to WebGoat server.");
      } finally {
        setLoading(false);
      }
    };

    fetchLink();
  }, []);

  const handleCiaComplete = async () => {
    setCiaCompleted(true); 
    
    const { error } = await supabase.auth.updateUser({
      data: { ciaCompleted: true }
    });

    if (error) {
      console.error("Failed to save progress to database:", error.message);
    }
  };

  const confirmLogout = async () => {
    await supabase.auth.signOut(); 
    onLogout();
  };

  return (
    <div style={{ padding: "40px 5%", maxWidth: "1000px", margin: "0 auto", fontFamily: "sans-serif" }}>
      
      <style>{`
        .dash-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px; gap: 16px; flex-wrap: wrap; }
        .dash-actions { display: flex; gap: 12px; }
        
        @media (max-width: 600px) {
          .dash-header { flex-direction: column; }
          .dash-actions { width: 100%; }
          .dash-actions button { flex: 1; justify-content: center; }
        }
      `}</style>

      <div className="dash-header">
        <div>
          <h1 style={{ fontSize: "24px", color: "#111" }}>
            {currentView === "dashboard" ? "WebGoat Dashboard" : "User Profile"}
          </h1>
          <p style={{ color: "#666", marginTop: "4px" }}>
            {currentView === "dashboard" ? "Welcome to your mini webgoat workspace." : "View your account details."}
          </p>
        </div>
        <div className="dash-actions">
          <button 
            onClick={() => setCurrentView(currentView === "dashboard" ? "profile" : "dashboard")}
            style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 16px", background: "#f8fafc", color: "#334155", border: "1px solid #cbd5e1", borderRadius: "6px", cursor: "pointer", fontWeight: "600" }}
          >
            {currentView === "dashboard" ? <><User size={16} /> Profile</> : <><ShieldAlert size={16} /> Dashboard</>}
          </button>
          
          <button 
            onClick={() => setShowLogoutModal(true)}
            style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 16px", background: "#fef2f2", color: CRIMSON, border: `1px solid ${CRIMSON}`, borderRadius: "6px", cursor: "pointer", fontWeight: "600" }}
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>

      {currentView === "dashboard" ? (
        <div style={{ background: "#fff", border: "1px solid #e5e5e5", borderRadius: "12px", padding: "24px", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <div style={{ background: "#fef2f2", padding: "10px", borderRadius: "8px", color: CRIMSON }}>
              <ShieldAlert size={24} />
            </div>
            <div>
              <h2 style={{ fontSize: "18px", color: "#111", margin: 0 }}>WebGoat Module: CIA Triad</h2>
              <p style={{ color: "#666", fontSize: "14px", marginTop: "4px" }}>
                Status: {" "}
                {ciaCompleted ? (
                  <span style={{ color: "#16a34a", fontWeight: "600" }}>
                    <CheckCircle size={12} style={{ display: "inline", marginBottom: "-2px" }}/> Completed
                  </span>
                ) : (
                  <span style={{ color: "#d97706", fontWeight: "600" }}>
                    In Progress
                  </span>
                )}
              </p>
            </div>
          </div>

          <p style={{ color: "#444", fontSize: "15px", lineHeight: "1.6", marginBottom: "20px" }}>
            The CIA Triad is a foundational model in information security designed to guide policies for security within an organization. Complete the interactive assignment below to validate your understanding.
          </p>

          <CiaLessonContainer 
            isCompleted={ciaCompleted} 
            onComplete={handleCiaComplete} 
          />

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {loading ? (
              <p style={{ color: "#666" }}>Decrypting secure link...</p>
            ) : error ? (
              <p style={{ color: CRIMSON }}>{error}</p>
            ) : (
              <div>
                <a 
                  href={webGoatUrl} target="_blank" rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 24px", background: CRIMSON, color: "#fff", textDecoration: "none", borderRadius: "6px", fontWeight: "600", transition: "background 0.2s" }}
                  onMouseEnter={e => e.target.style.background = CRIMSON_DARK}
                  onMouseLeave={e => e.target.style.background = CRIMSON}
                >
                  Access Full WebGoat Environment <ExternalLink size={16} />
                </a>
              </div>
            )}

            <div style={{ background: "#f8fafc", borderLeft: `4px solid #3b82f6`, padding: "12px 16px", borderRadius: "0 8px 8px 0" }}>
              <p style={{ fontSize: "13px", color: "#334155", display: "flex", alignItems: "flex-start", gap: "8px", margin: 0, lineHeight: "1.5" }}>
                <Info size={16} style={{ color: "#3b82f6", flexShrink: 0, marginTop: "2px" }} />
                <span>
                  <strong>Warning Note:</strong> Because WebGoat is an intentionally vulnerable application, it is hosted securely via a local WSL environment rather than exposed to the public internet, adhering to standard cybersecurity best practices. 
                  We instead display a similar WebGoat Lesson Integration where you can answer all the questions based on the lesson presented and track your progress task status as same as in the WebGoat site.
                </span>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <Profile userEmail={userEmail} ciaCompleted={ciaCompleted} />
      )}

      {showLogoutModal && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50, padding: "20px" }}>
          <div style={{ background: "#fff", padding: "24px", borderRadius: "12px", width: "100%", maxWidth: "400px", boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <div style={{ background: "#fef2f2", padding: "8px", borderRadius: "50%", color: CRIMSON }}>
                <AlertTriangle size={24} />
              </div>
              <h3 style={{ margin: 0, fontSize: "18px", color: "#111" }}>Confirm Logout</h3>
            </div>
            <p style={{ color: "#444", marginBottom: "24px", lineHeight: "1.5" }}>
              Are you sure you want to securely end your session and log out of the system?
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
              <button 
                onClick={() => setShowLogoutModal(false)}
                style={{ padding: "8px 16px", background: "#f1f5f9", color: "#334155", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "600" }}
              >
                Cancel
              </button>
              <button 
                onClick={confirmLogout}
                style={{ padding: "8px 16px", background: CRIMSON, color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "600" }}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}