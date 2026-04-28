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
  const [resetStep, setResetStep] = useState(1); // 1 = input email, 2 = input code
  const [resetCode, setResetCode] = useState("");

  async function handleSubmit() {
    setLoading(true);

    if (isResetMode) {
      // --- FORGOT PASSWORD FLOW ---
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
          setResetStep(2); // Move to the verification code input
        }
      } else {
        // Step 2: Verify the 8-digit code
        if (!resetCode || resetCode.length !== 8) {
          toast.error("Please enter the 8-digit code.");
          setLoading(false);
          return;
        }

        const { error } = await supabase.auth.verifyOtp({
          email,
          token: resetCode,
          type: 'recovery' // Tells Supabase this code is for a password reset
        });
        
        if (error) {
          toast.error(error.message);
        } else {
          toast.success("Identity verified! You can now change your password in your profile.");
          // Add a tiny delay to let the user read the success toast
          setTimeout(() => {
            onSuccess(); 
          }, 800);
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

      {/* Dynamic Headers based on Mode and Step */}
      <h2 style={styles.heading}>
        {isResetMode ? (resetStep === 1 ? "Reset Password" : "Enter Reset Code") : "Welcome back"}
      </h2>
      <p style={styles.subheading}>
        {isResetMode 
          ? (resetStep === 1 ? "Enter your email to receive an 8-digit recovery code." : "Enter the 8-digit code sent to your email.") 
          : "Sign in to your account to continue."}
      </p>

      {/* Show the Code input on Step 2, otherwise show the Email input */}
      {isResetMode && resetStep === 2 ? (
        <InputField 
          label="Verification Code" 
          icon={<Lock size={16} />} 
          type="text"
          placeholder="Enter 8-digit code" 
          value={resetCode} 
          onChange={e => setResetCode(e.target.value)} 
        />
      ) : (
        <InputField label="Email Address" icon={<Mail size={16} />} type="email" placeholder="you@gmail.com" value={email} onChange={e => setEmail(e.target.value)} />
      )}

      {/* Only show the password field during a normal login */}
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
          {isResetMode ? (resetStep === 1 ? "Send Reset Code" : "Verify Code") : "Sign In"} 
          <ArrowRight size={16} />
        </>}
      </button>

      {/* Go Back button during Reset Mode */}
      {isResetMode && (
        <button 
            onClick={() => {
              setIsResetMode(false);
              setResetStep(1); // Reset the step in case they come back later
              setResetCode(""); // Clear out any typed code
            }}
            style={{ background: "none", border: "none", color: CRIMSON, width: "100%", marginTop: "16px", fontWeight: "600", cursor: "pointer" }}
        >
            Wait, I remember it! Go back.
        </button>
      )}
    </>
  );
}