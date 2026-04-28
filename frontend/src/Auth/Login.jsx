import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import InputField from "../shared/InputField";
import { styles, CRIMSON, CRIMSON_DARK } from "../styles/authStyle";
import { supabase } from "../supabase"; 
import toast, { Toaster } from 'react-hot-toast'; 

export default function Login({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [isResetMode, setIsResetMode] = useState(false);
  const [resetStep, setResetStep] = useState(1); 
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const getPasswordStrength = (pass) => {
    let score = 0;
    if (!pass) return { score: 0, width: "0%", color: "transparent", label: "" };
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1; 

    let width = "0%";
    let color = "transparent";
    let label = "";

    if (score <= 1) { 
      width = "33%"; color = "#ff4d4f"; label = "Weak"; 
    } else if (score === 2) { 
      width = "66%"; color = "#faad14"; label = "Medium"; 
    } else if (score >= 3) { 
      width = "100%"; color = "#52c41a"; label = "Strong"; 
    }

    return { score, width, color, label }; 
  };

  const strength = getPasswordStrength(newPassword);
  const passwordsMatch = newPassword.length > 0 && newPassword === confirmPassword;

  async function handleSubmit() {
    setLoading(true);

    if (isResetMode) {
      if (resetStep === 1) {
        if (!email) {
          toast.error("Please enter your email.");
          setLoading(false);
          return;
        }

        const { error } = await supabase.auth.resetPasswordForEmail(email);
        
        if (error) {
          toast.error(error.message); 
        } else {
          toast.success("Reset code sent! Check your email.");
          setResetStep(2);
        }
        
      } else if (resetStep === 2) {
        if (!resetCode || resetCode.length !== 8) {
          toast.error("Please enter the 8-digit code.");
          setLoading(false);
          return;
        }

        const { error } = await supabase.auth.verifyOtp({
          email,
          token: resetCode,
          type: 'recovery' 
        });
        
        if (error) {
          toast.error(error.message);
        } else {
          toast.success("Code verified! Please set your new password.");
          setResetStep(3); 
        }
        
      } else if (resetStep === 3) {
        if (strength.score < 2) {
          toast.error("Please enter a stronger password.");
          setLoading(false);
          return;
        }
        if (!passwordsMatch) {
          toast.error("Passwords do not match.");
          setLoading(false);
          return;
        }

        const { error } = await supabase.auth.updateUser({ password: newPassword });

        if (error) {
          toast.error(error.message);
        } else {
          toast.success("Password updated! Please log in with your new password.");

          setTimeout(() => {
            setIsResetMode(false);
            setResetStep(1);
            setResetCode("");
            setNewPassword("");
            setConfirmPassword("");
            setPassword(""); 
          }, 2000); 
        }
      }
      
    } else {
      if (!email || !password) {
        toast.error("Please fill in all required fields.");
        setLoading(false);
        return;
      }

      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        toast.error(error.message); 
      } else {
        toast.success("Login successful!");
        setTimeout(() => {
            onSuccess(); 
        }, 500);
      }
    }
    
    setLoading(false);
  }

  const isSubmitDisabled = loading || (isResetMode && resetStep === 3 && (strength.score < 2 || !passwordsMatch));

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
      <Toaster position="top-center" reverseOrder={false} />

      <h2 style={styles.heading}>
        {isResetMode 
          ? (resetStep === 1 ? "Reset Password" : resetStep === 2 ? "Enter Reset Code" : "Set New Password") 
          : "Welcome back"}
      </h2>
      <p style={styles.subheading}>
        {isResetMode 
          ? (resetStep === 1 ? "Enter your email to receive an 8-digit recovery code." 
             : resetStep === 2 ? "Enter the 8-digit code sent to your email."
             : "Please create a new, secure password.") 
          : "Sign in to your account to continue."}
      </p>

      {isResetMode ? (
        resetStep === 1 ? (
          <InputField label="Email Address" icon={<Mail size={16} />} type="email" placeholder="you@gmail.com" value={email} onChange={e => setEmail(e.target.value)} />
        ) : resetStep === 2 ? (
          <InputField label="Verification Code" icon={<Lock size={16} />} type="text" placeholder="Enter 8-digit code" value={resetCode} onChange={e => setResetCode(e.target.value)} />
        ) : (
          <>
            <div style={styles.fieldGroup}>
              <div style={styles.inlineRow}><label style={{ ...styles.label, marginBottom: 0 }}>New Password</label></div>
              <div style={styles.inputWrap}>
                <span style={styles.inputIcon}><Lock size={16} /></span>
                <input
                  type={showPass ? "text" : "password"} placeholder="••••••••" value={newPassword} onChange={e => setNewPassword(e.target.value)} 
                  style={{ ...styles.input, outline: "none", transition: "all 0.2s" }}
                  onFocus={e => { e.target.style.borderColor = CRIMSON; e.target.style.background = "#fff"; }}
                  onBlur={e => { e.target.style.borderColor = "#e5e5e5"; e.target.style.background = "transparent"; }}
                />
                <button type="button" style={styles.eyeBtn} onClick={() => setShowPass(v => !v)}>
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              
              {newPassword && (
                <div style={{ marginTop: 8 }}>
                  <div style={{ height: 4, width: "100%", backgroundColor: "#e5e5e5", borderRadius: 2, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: strength.width, backgroundColor: strength.color, transition: "all 0.3s ease" }} />
                  </div>
                  <p style={{ fontSize: 12, color: strength.color, marginTop: 4, fontWeight: 600 }}>{strength.label}</p>
                </div>
              )}
            </div>

            <div style={styles.fieldGroup}>
              <div style={styles.inlineRow}><label style={{ ...styles.label, marginBottom: 0 }}>Confirm Password</label></div>
              <div style={styles.inputWrap}>
                <span style={styles.inputIcon}><Lock size={16} /></span>
                <input
                  type={showPass ? "text" : "password"} placeholder="••••••••" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} 
                  style={{ ...styles.input, outline: "none", transition: "all 0.2s" }}
                  onFocus={e => { e.target.style.borderColor = CRIMSON; e.target.style.background = "#fff"; }}
                  onBlur={e => { e.target.style.borderColor = "#e5e5e5"; e.target.style.background = "transparent"; }}
                />
              </div>
            </div>
          </>
        )
      ) : (
        <InputField label="Email Address" icon={<Mail size={16} />} type="email" placeholder="you@gmail.com" value={email} onChange={e => setEmail(e.target.value)} />
      )}

      {!isResetMode && (
        <div style={styles.fieldGroup}>
          <div style={styles.inlineRow}>
            <label style={{ ...styles.label, marginBottom: 0 }}>Password</label>
            <button type="button" style={styles.forgotLink} onClick={() => setIsResetMode(true)}>
                Forgot password?
            </button>
          </div>
          <div style={styles.inputWrap}>
            <span style={styles.inputIcon}><Lock size={16} /></span>
            <input
              type={showPass ? "text" : "password"} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} 
              style={{ ...styles.input, outline: "none", transition: "all 0.2s" }}
              onFocus={e => { e.target.style.borderColor = CRIMSON; e.target.style.background = "#fff"; }}
              onBlur={e => { e.target.style.borderColor = "#e5e5e5"; e.target.style.background = "transparent"; }}
            />
            <button type="button" style={styles.eyeBtn} onClick={() => setShowPass(v => !v)}>
              {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
        </div>
      )}

      <button
        type="submit"
        style={{ ...styles.submitBtn, marginTop: 22, opacity: isSubmitDisabled ? 0.6 : 1, transition: "background 0.2s", cursor: isSubmitDisabled ? "not-allowed" : "pointer" }} 
        disabled={isSubmitDisabled}
        onMouseEnter={e => { if (!e.target.disabled) e.target.style.background = CRIMSON_DARK; }} 
        onMouseLeave={e => { if (!e.target.disabled) e.target.style.background = CRIMSON; }}
      >
        {loading ? "Processing…" : <>
          {isResetMode 
            ? (resetStep === 1 ? "Send Reset Code" : resetStep === 2 ? "Verify Code" : "Update Password") 
            : "Sign In"} 
        </>}
      </button>

      {isResetMode && (
        <button 
            type="button"
            onClick={() => {
              setIsResetMode(false);
              setResetStep(1); 
              setResetCode(""); 
              setNewPassword("");
              setConfirmPassword("");
            }}
            style={{ background: "none", border: "none", color: CRIMSON, width: "100%", marginTop: "16px", fontWeight: "600", cursor: "pointer" }}
        >
            Wait, I remember it! Go back.
        </button>
      )}
    </form>
  );
}