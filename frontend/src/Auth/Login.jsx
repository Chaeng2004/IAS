import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import InputField from "../shared/InputField";
import { styles, CRIMSON, CRIMSON_DARK } from "../styles/authStyle";
import { supabase } from "../supabase"; 
import toast, { Toaster } from 'react-hot-toast'; 

export default function Login({ onSuccess }) {
  // Login States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Password Reset States
  const [isResetMode, setIsResetMode] = useState(false);
  const [resetStep, setResetStep] = useState(1); // 1 = Email, 2 = Code, 3 = New Password
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleSubmit() {
    setLoading(true);

    if (isResetMode) {
      // --- FORGOT PASSWORD FLOW ---
      if (resetStep === 1) {
        // STEP 1: Send the Code
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
        // STEP 2: Verify the Code
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
          setResetStep(3); // Move to the New Password step
        }
        
        } else if (resetStep === 3) {
          if (!newPassword || newPassword.length < 8) {
            toast.error("Password must be at least 8 characters.");
            setLoading(false);
            return;
          }
          if (newPassword !== confirmPassword) {
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
        }, 2000); // Give them 2 seconds to read the success message
      }
    }
      
    } else {
      // --- NORMAL LOGIN FLOW ---
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

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      {/* Dynamic Headers */}
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

      {/* Dynamic Form Inputs */}
      {isResetMode ? (
        resetStep === 1 ? (
          <InputField label="Email Address" icon={<Mail size={16} />} type="email" placeholder="you@gmail.com" value={email} onChange={e => setEmail(e.target.value)} />
        ) : resetStep === 2 ? (
          <InputField label="Verification Code" icon={<Lock size={16} />} type="text" placeholder="Enter 8-digit code" value={resetCode} onChange={e => setResetCode(e.target.value)} />
        ) : (
          <>
            {/* Step 3 UI: New Password Fields */}
            <div style={styles.fieldGroup}>
              <div style={styles.inlineRow}><label style={{ ...styles.label, marginBottom: 0 }}>New Password</label></div>
              <div style={styles.inputWrap}>
                <span style={styles.inputIcon}><Lock size={16} /></span>
                <input
                  type={showPass ? "text" : "password"} placeholder="••••••••" value={newPassword} onChange={e => setNewPassword(e.target.value)} style={styles.input}
                  onFocus={e => { e.target.style.borderColor = CRIMSON; e.target.style.background = "#fff"; }}
                  onBlur={e => { e.target.style.borderColor = "#e5e5e5"; e.target.style.background = "#fafafa"; }}
                />
                <button style={styles.eyeBtn} onClick={() => setShowPass(v => !v)}>
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <div style={styles.fieldGroup}>
              <div style={styles.inlineRow}><label style={{ ...styles.label, marginBottom: 0 }}>Confirm Password</label></div>
              <div style={styles.inputWrap}>
                <span style={styles.inputIcon}><Lock size={16} /></span>
                <input
                  type={showPass ? "text" : "password"} placeholder="••••••••" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} style={styles.input}
                  onFocus={e => { e.target.style.borderColor = CRIMSON; e.target.style.background = "#fff"; }}
                  onBlur={e => { e.target.style.borderColor = "#e5e5e5"; e.target.style.background = "#fafafa"; }}
                />
              </div>
            </div>
          </>
        )
      ) : (
        // Normal Login Email Field
        <InputField label="Email Address" icon={<Mail size={16} />} type="email" placeholder="you@gmail.com" value={email} onChange={e => setEmail(e.target.value)} />
      )}

      {/* Normal Login Password Field */}
      {!isResetMode && (
        <div style={styles.fieldGroup}>
          <div style={styles.inlineRow}>
            <label style={{ ...styles.label, marginBottom: 0 }}>Password</label>
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

      {/* Dynamic Submit Button */}
      <button
        style={{ ...styles.submitBtn, marginTop: 22, opacity: loading ? 0.8 : 1 }} onClick={handleSubmit}
        onMouseEnter={e => { e.target.style.background = CRIMSON_DARK; }} onMouseLeave={e => { e.target.style.background = CRIMSON; }}
      >
        {loading ? "Processing…" : <>
          {isResetMode 
            ? (resetStep === 1 ? "Send Reset Code" : resetStep === 2 ? "Verify Code" : "Update Password") 
            : "Sign In"} 
          
        </>}
      </button>

      {/* Go Back / Cancel Button */}
      {isResetMode && (
        <button 
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
    </>
  );
}