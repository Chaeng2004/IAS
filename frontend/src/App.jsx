import { useState } from "react";
import { ShieldCheck, CheckCircle2, Sparkles } from "lucide-react";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import SuccessView from "./shared/SuccessView";
import { styles } from "./styles/authStyle";

export default function App() {
  const [tab, setTab] = useState("login");
  const [success, setSuccess] = useState(null);

  return (
    <div style={styles.root}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @media (max-width: 768px) {
          .left-panel { display: none !important; }
          .right-panel { padding: 36px 24px !important; }
        }
      `}</style>

      <div style={styles.rightPanel} className="right-panel">
        <div style={styles.formCard}>
          {success ? (
            <SuccessView type={success} onBack={() => setSuccess(null)} />
          ) : (
            <>
              <div style={styles.tabRow}>
                <button
                  style={{ ...styles.tab, ...(tab === "login" ? styles.tabActive : {}) }}
                  onClick={() => setTab("login")}
                >
                  Sign In
                </button>
                <button
                  style={{ ...styles.tab, ...(tab === "register" ? styles.tabActive : {}) }}
                  onClick={() => setTab("register")}
                >
                  Register
                </button>
              </div>

              {tab === "login"
                ? <Login onSuccess={setSuccess} />
                : <Register onSuccess={setSuccess} />
              }

              <div style={styles.divider}>
                <div style={styles.dividerLine} />
                <span style={styles.dividerText}>OR</span>
                <div style={styles.dividerLine} />
              </div>

              <p style={{ textAlign: "center", fontSize: 13, color: "#999", fontFamily: "'Georgia', serif" }}>
                {tab === "login" ? "Don't have an account? " : "Already have an account? "}
                <button
                  style={{ ...styles.forgotLink, fontWeight: 600 }}
                  onClick={() => setTab(tab === "login" ? "register" : "login")}
                >
                  {tab === "login" ? "Create one now" : "Sign in here"}
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}