import React, { useEffect, useState } from "react";
import { LogOut, ExternalLink, ShieldAlert, CheckCircle, Info, User, AlertTriangle, XCircle } from "lucide-react";
import { CRIMSON, CRIMSON_DARK } from "../styles/authStyle"; 
import { supabase } from "../supabase"; 
import Profile from "./Profile"; 

export default function Dashboard({ onLogout }) {
  const [webGoatUrl, setWebGoatUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  
  const [currentView, setCurrentView] = useState("dashboard"); 
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const [ciaCompleted, setCiaCompleted] = useState(false);
  const [lessonError, setLessonError] = useState("");
  const [ciaAnswers, setCiaAnswers] = useState({
    confidentiality: false,
    integrity: false,
    accountability: false,
    availability: false,
  });

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
        setError("Cannot connect to server.");
      } finally {
        setLoading(false);
      }
    };

    fetchLink();
  }, []);

  const confirmLogout = async () => {
    await supabase.auth.signOut(); 
    onLogout();
  };

  const handleCheckboxChange = (e) => {
    setCiaAnswers({
      ...ciaAnswers,
      [e.target.name]: e.target.checked
    });
  };

  const handleSubmitLesson = () => {
    // Correct answers: Confidentiality, Integrity, Availability. Incorrect: Accountability.
    if (ciaAnswers.confidentiality && ciaAnswers.integrity && ciaAnswers.availability && !ciaAnswers.accountability) {
      setCiaCompleted(true);
      setLessonError("");
    } else {
      setLessonError("Incorrect. Please select only the three core principles of the CIA Triad.");
    }
  };

  return (
    <div style={{ padding: "40px 5%", maxWidth: "1000px", margin: "0 auto", fontFamily: "sans-serif" }}>
      
      <style>{`
        .dash-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px; gap: 16px; flex-wrap: wrap; }
        .dash-actions { display: flex; gap: 12px; }
        .lesson-checkbox { display: flex; align-items: center; gap: 10px; cursor: pointer; padding: 8px; border-radius: 6px; transition: background 0.2s; }
        .lesson-checkbox:hover { background: #e2e8f0; }
        .lesson-checkbox input { cursor: pointer; width: 16px; height: 16px; }
        
        @media (max-width: 600px) {
          .dash-header { flex-direction: column; }
          .dash-actions { width: 100%; }
          .dash-actions button { flex: 1; justify-content: center; }
        }
      `}</style>

      <div className="dash-header">
        <div>
          <h1 style={{ fontSize: "24px", color: "#111" }}>
            {currentView === "dashboard" ? "Security Dashboard" : "User Profile"}
          </h1>
          <p style={{ color: "#666", marginTop: "4px" }}>
            {currentView === "dashboard" ? "Welcome to your protected workspace." : "View your account details."}
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

          {/* Interactive Lesson Container */}
          <div style={{ padding: "20px", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "8px", marginBottom: "24px" }}>
            <h3 style={{ marginTop: 0, fontSize: "16px", color: "#0f172a" }}>Assignment: Identify the Principles</h3>
            <p style={{ color: "#475569", fontSize: "14px", marginBottom: "16px" }}>
              Select the three core concepts that make up the CIA Triad from the list below:
            </p>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginBottom: "20px" }}>
              <label className="lesson-checkbox" style={{ opacity: ciaCompleted ? 0.6 : 1, pointerEvents: ciaCompleted ? "none" : "auto" }}>
                <input type="checkbox" name="confidentiality" checked={ciaAnswers.confidentiality} onChange={handleCheckboxChange} />
                <span style={{ color: "#334155" }}>Confidentiality</span>
              </label>
              <label className="lesson-checkbox" style={{ opacity: ciaCompleted ? 0.6 : 1, pointerEvents: ciaCompleted ? "none" : "auto" }}>
                <input type="checkbox" name="integrity" checked={ciaAnswers.integrity} onChange={handleCheckboxChange} />
                <span style={{ color: "#334155" }}>Integrity</span>
              </label>
              <label className="lesson-checkbox" style={{ opacity: ciaCompleted ? 0.6 : 1, pointerEvents: ciaCompleted ? "none" : "auto" }}>
                <input type="checkbox" name="accountability" checked={ciaAnswers.accountability} onChange={handleCheckboxChange} />
                <span style={{ color: "#334155" }}>Accountability</span>
              </label>
              <label className="lesson-checkbox" style={{ opacity: ciaCompleted ? 0.6 : 1, pointerEvents: ciaCompleted ? "none" : "auto" }}>
                <input type="checkbox" name="availability" checked={ciaAnswers.availability} onChange={handleCheckboxChange} />
                <span style={{ color: "#334155" }}>Availability</span>
              </label>
            </div>

            {!ciaCompleted ? (
              <div>
                <button 
                  onClick={handleSubmitLesson}
                  style={{ padding: "10px 20px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "600", transition: "background 0.2s" }}
                  onMouseEnter={e => e.target.style.background = "#1d4ed8"}
                  onMouseLeave={e => e.target.style.background = "#2563eb"}
                >
                  Submit Answers
                </button>
                {lessonError && (
                  <p style={{ color: CRIMSON, fontSize: "14px", marginTop: "12px", display: "flex", alignItems: "center", gap: "6px" }}>
                    <XCircle size={16} /> {lessonError}
                  </p>
                )}
              </div>
            ) : (
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 16px", background: "#dcfce7", color: "#166534", borderRadius: "6px", fontWeight: "600", border: "1px solid #bbf7d0" }}>
                <CheckCircle size={20} /> Lesson Successfully Completed! You mastered the CIA Triad.
              </div>
            )}
          </div>

          {/* Secure Link Section */}
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
                  <strong>Instructor Note:</strong> Because WebGoat is an intentionally vulnerable application, it is hosted securely via a local WSL environment rather than exposed to the public internet, adhering to standard cybersecurity best practices. Use the dashboard to track your progress and access the secure tunnel.
                </span>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <Profile userEmail={userEmail} />
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