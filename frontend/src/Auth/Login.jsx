import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import InputField from "../shared/InputField";
import { styles, CRIMSON, CRIMSON_DARK } from "../styles/authStyle";
import { supabase } from "../supabase"; 
import toast, { Toaster } from 'react-hot-toast'; // 1. Import the Toast library

export default function Login({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // 2. Add a state to track if the user is trying to reset their password
  const [isResetMode, setIsResetMode] = useState(false);

  async function handleSubmit() {
    // Prevent submitting if fields are empty based on the current mode
    if (!email || (!password && !isResetMode)) {
        toast.error("Please fill in all required fields.");
        return;
    }
    
    setLoading(true);

    if (isResetMode) {
      // --- FORGOT PASSWORD FLOW ---
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      
      setLoading(false);

      if (error) {
        toast.error(error.message); 
      } else {
        toast.success("Reset link sent! Check your email.");
        setIsResetMode(false); // Switch back to the login screen
      }
      
    } else {
      // --- NORMAL LOGIN FLOW ---
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      setLoading(false);

      if (error) {
        toast.error(error.message); // Replaced alert with toast!
      } else {
        toast.success("Login successful!");
        
        // Add a tiny half-second delay so the user can actually see the success toast before the dashboard loads
        setTimeout(() => {
            onSuccess(); 
        }, 500);
      }
    }
  }

  return (
    <>
      {/* 3. Add the Toaster component so the popups have a place to render */}
      <Toaster position="top-center" reverseOrder={false} />

      {/* 4. Dynamically change the headers based on the mode */}
      <h2 style={styles.heading}>{isResetMode ? "Reset Password" : "Welcome back"}</h2>
      <p style={styles.subheading}>
        {isResetMode ? "Enter your email to receive a secure recovery link." : "Sign in to your account to continue."}
      </p>

      <InputField label="Email Address" icon={<Mail size={16} />} type="email" placeholder="you@gmail.com" value={email} onChange={e => setEmail(e.target.value)} />

      {/* 5. Hide the password field if we are in Reset Mode */}
      {!isResetMode && (
        <div style={styles.fieldGroup}>
          <div style={styles.inlineRow}>
            <label style={{ ...styles.label, marginBottom: 0 }}>Password</label>
            {/* The Forgot Password button triggers the mode change */}
            <button style={styles.forgotLink} onClick={() => setIsResetMode(true)}>
                Forgot password?
            </button>
          </div>
          <div style={styles.inputWrap}>
            <span style={styles.inputIcon}><Lock size={16} /></span>
            <input
              type={showPass ? "text" : "password"} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} style={styles.input}
              onFocus={e => { e.target.style.borderColor = CRIMSON; e.target.style.background = "#fff"; }}
              onBlur={e => { e.target.style.borderColor = "#e5e5e5"; e.target.style.background = "#fafafa"; }}
            />
            <button style={styles.eyeBtn} onClick={() => setShowPass(v => !v)}>
              {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
        </div>
      )}

      <button
        style={{ ...styles.submitBtn, marginTop: 22, opacity: loading ? 0.8 : 1 }} onClick={handleSubmit}
        onMouseEnter={e => { e.target.style.background = CRIMSON_DARK; }} onMouseLeave={e => { e.target.style.background = CRIMSON; }}
      >
        {loading ? "Processing…" : <>{isResetMode ? "Send Reset Link" : "Sign In"} <ArrowRight size={16} /></>}
      </button>

      {/* 6. Add a back button if they change their mind about resetting */}
      {isResetMode && (
        <button 
            onClick={() => setIsResetMode(false)}
            style={{ background: "none", border: "none", color: CRIMSON, width: "100%", marginTop: "16px", fontWeight: "600", cursor: "pointer" }}
        >
            Wait, I remember it! Go back.
        </button>
      )}
    </>
  );
}