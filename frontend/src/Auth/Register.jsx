import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ShieldCheck } from "lucide-react"; 
import { CRIMSON, CRIMSON_DARK } from "../styles/authStyle"; 
import InputField from "../shared/InputField"; 
import { supabase } from "../supabase"; 
import toast, { Toaster } from 'react-hot-toast'; 

export default function Register({ onSuccess }) {
  const [step, setStep] = useState(1); 
  const [form, setForm] = useState({ email: "", password: "", confirm: "", otp: "" }); 
  const [showPass, setShowPass] = useState(false); 
  const [showConfirm, setShowConfirm] = useState(false); 
  const [loading, setLoading] = useState(false); 

  const set = key => e => setForm(f => ({ ...f, [key]: e.target.value })); 

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

  const strength = getPasswordStrength(form.password);
  const passwordsMatch = form.password.length > 0 && form.password === form.confirm;

  async function handleRegisterSubmit() {
    if (!form.email || strength.score < 2 || !passwordsMatch) return; 
    setLoading(true); 

    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    });

    setLoading(false);

    if (error) {
      toast.error(error.message); 
    } else {
      toast.success("Registration successful! Check your email for the OTP.");
      setStep(2); 
    }
  }

  async function handleOTPSubmit() {
    if (!form.otp || form.otp.length !== 8) return;
    setLoading(true);

    const { error } = await supabase.auth.verifyOtp({
      email: form.email,
      token: form.otp,
      type: 'signup' 
    });

    setLoading(false);

    if (error) {
      toast.error(error.message || "Invalid OTP"); 
    } else {
      toast.success("Account Verified! Redirecting to login...");
      setTimeout(() => {
        onSuccess();
      }, 2000); 
    }
  }

  if (step === 2) {
    return (
      <>
        <Toaster position="top-center" reverseOrder={false} />
        <div style={{ textAlign: "center" }}>
          <ShieldCheck size={48} color={CRIMSON} style={{ margin: "0 auto 16px" }} />
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, color: "#111" }}>Check your email</h2>
          <p style={{ fontSize: 14, color: "#666", marginBottom: 24 }}>We sent a 8-digit code to <strong>{form.email}</strong>.</p>
          
          <form onSubmit={(e) => { e.preventDefault(); handleOTPSubmit(); }} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <input
              type="text"
              maxLength="8"
              placeholder="••••••••"
              value={form.otp}
              onChange={set("otp")}
              style={{ width: "100%", padding: "12px", fontSize: 24, letterSpacing: 8, textAlign: "center", border: "1px solid #e5e5e5", borderRadius: 8, outline: "none", transition: "all 0.2s" }}
              onFocus={e => { e.target.style.borderColor = CRIMSON; e.target.style.background = "#fff"; }}
              onBlur={e => { e.target.style.borderColor = "#e5e5e5"; e.target.style.background = "transparent"; }}
            />
            <button
              type="submit"
              style={{ width: "100%", padding: "12px", background: CRIMSON, color: "#fff", border: "none", borderRadius: 8, fontWeight: 600, cursor: "pointer", opacity: loading ? 0.7 : 1 }}
              disabled={loading}
              onMouseEnter={e => { e.target.style.background = CRIMSON_DARK; }} 
              onMouseLeave={e => { e.target.style.background = CRIMSON; }}
            >
              {loading ? "Verifying..." : "Verify Account"}
            </button>
          </form>
        </div>
      </>
    );
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleRegisterSubmit(); }}>
      <Toaster position="top-center" reverseOrder={false} />
      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, color: "#111" }}>Create your account</h2> 
      <p style={{ fontSize: 14, color: "#666", marginBottom: 24 }}>Fill in the details below to get started.</p> 

      <InputField label="Email Address" icon={<Mail size={16} />} type="email" placeholder="you@gmail.com" value={form.email} onChange={set("email")} /> 

      <div style={{ marginBottom: 16 }}> 
        <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#444", marginBottom: 6 }}>Password</label> 
        <div style={{ position: "relative", display: "flex", alignItems: "center" }}> 
          <span style={{ position: "absolute", left: 12, color: "#999" }}><Lock size={16} /></span> 
          <input 
            type={showPass ? "text" : "password"} 
            value={form.password} 
            onChange={set("password")} 
            style={{ width: "100%", padding: "10px 40px", border: "1px solid #e5e5e5", borderRadius: 8, outline: "none", transition: "all 0.2s" }} 
            onFocus={e => { e.target.style.borderColor = CRIMSON; e.target.style.background = "#fff"; }}
            onBlur={e => { e.target.style.borderColor = "#e5e5e5"; e.target.style.background = "transparent"; }}
          />
          <button type="button" style={{ position: "absolute", right: 12, background: "none", border: "none", cursor: "pointer", color: "#999" }} onClick={() => setShowPass(!showPass)}> 
            {showPass ? <EyeOff size={15} /> : <Eye size={15} />} 
          </button> 
        </div>
        
        {form.password && (
          <div style={{ marginTop: 8 }}>
            <div style={{ height: 4, width: "100%", backgroundColor: "#e5e5e5", borderRadius: 2, overflow: "hidden" }}>
              <div style={{ height: "100%", width: strength.width, backgroundColor: strength.color, transition: "all 0.3s ease" }} />
            </div>
            <p style={{ fontSize: 12, color: strength.color, marginTop: 4, fontWeight: 600 }}>{strength.label}</p>
          </div>
        )}
      </div>

      <div style={{ marginBottom: 16 }}> 
        <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#444", marginBottom: 6 }}>Confirm Password</label> 
        <div style={{ position: "relative", display: "flex", alignItems: "center" }}> 
          <span style={{ position: "absolute", left: 12, color: "#999" }}><Lock size={16} /></span> 
          <input 
            type={showConfirm ? "text" : "password"} 
            value={form.confirm} 
            onChange={set("confirm")} 
            style={{ width: "100%", padding: "10px 40px", border: "1px solid #e5e5e5", borderRadius: 8, outline: "none", transition: "all 0.2s" }} 
            onFocus={e => { e.target.style.borderColor = CRIMSON; e.target.style.background = "#fff"; }}
            onBlur={e => { e.target.style.borderColor = "#e5e5e5"; e.target.style.background = "transparent"; }}
          />
          <button type="button" style={{ position: "absolute", right: 12, background: "none", border: "none", cursor: "pointer", color: "#999" }} onClick={() => setShowConfirm(!showConfirm)}> 
            {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />} 
          </button> 
        </div>
      </div>

      <button
        type="submit"
        style={{ width: "100%", padding: "12px", background: CRIMSON, color: "#fff", border: "none", borderRadius: 8, fontWeight: 600, cursor: "pointer", opacity: loading || strength.score < 2 || !passwordsMatch ? 0.6 : 1, transition: "background 0.2s" }} 
        disabled={strength.score < 2 || !passwordsMatch || loading}
        onMouseEnter={e => { if (!e.target.disabled) e.target.style.background = CRIMSON_DARK; }} 
        onMouseLeave={e => { if (!e.target.disabled) e.target.style.background = CRIMSON; }}
      >
        {loading ? "Sending OTP..." : "Create Account"} 
      </button> 
    </form>
  );
}