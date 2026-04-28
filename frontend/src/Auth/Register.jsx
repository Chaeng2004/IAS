import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck } from "lucide-react"; 
import { CRIMSON, CRIMSON_DARK } from "../styles/authStyle"; 
import InputField from "../shared/InputField"; 
import { supabase } from "../supabase"; // Import Supabase

export default function Register({ onSuccess }) {
  const [step, setStep] = useState(1); 
  const [form, setForm] = useState({ email: "", password: "", confirm: "", otp: "" }); 
  const [showPass, setShowPass] = useState(false); 
  const [showConfirm, setShowConfirm] = useState(false); 
  const [agreed, setAgreed] = useState(false); 
  const [loading, setLoading] = useState(false); 

  const set = key => e => setForm(f => ({ ...f, [key]: e.target.value })); 

  const getPasswordStrength = (pass) => {
    let score = 0;
    if (!pass) return { score: 0, width: "0%" };
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1; 
    return { score }; 
  };

  const strength = getPasswordStrength(form.password);
  const passwordsMatch = form.password.length > 0 && form.password === form.confirm;

  // 1. Send Registration to Supabase
  async function handleRegisterSubmit() {
    if (!form.email || strength.score < 2 || !passwordsMatch || !agreed) return; 
    setLoading(true); 

    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
    } else {
      setStep(2); // Move to OTP screen
    }
  }

  // 2. Verify Supabase OTP
  async function handleOTPSubmit() {
    if (!form.otp || form.otp.length !== 8) return;
    setLoading(true);

    const { error } = await supabase.auth.verifyOtp({
      email: form.email,
      token: form.otp,
      type: 'signup' // Tells Supabase this is a new account verification
    });

    setLoading(false);

    if (error) {
      alert(error.message || "Invalid OTP");
    } else {
      alert("Verification successful! You can now log in.");
      onSuccess(); 
    }
  }

  // RENDER: OTP SCREEN
  if (step === 2) {
    return (
      <div style={{ textAlign: "center" }}>
        <ShieldCheck size={48} color={CRIMSON} style={{ margin: "0 auto 16px" }} />
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, color: "#111" }}>Check your email</h2>
        <p style={{ fontSize: 14, color: "#666", marginBottom: 24 }}>We sent a 6-digit code to <strong>{form.email}</strong>.</p>
        
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <input
            type="text"
            maxLength="6"
            placeholder="••••••"
            value={form.otp}
            onChange={set("otp")}
            style={{ width: "100%", padding: "12px", fontSize: 24, letterSpacing: 8, textAlign: "center", border: "1px solid #e5e5e5", borderRadius: 8 }}
          />
          <button
            style={{ width: "100%", padding: "12px", background: CRIMSON, color: "#fff", border: "none", borderRadius: 8, fontWeight: 600, cursor: "pointer", opacity: loading ? 0.7 : 1 }}
            onClick={handleOTPSubmit}
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify Account"}
          </button>
        </div>
      </div>
    );
  }

  // RENDER: REGISTRATION SCREEN
  return (
    <>
      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, color: "#111" }}>Create your account</h2> 
      <p style={{ fontSize: 14, color: "#666", marginBottom: 24 }}>Fill in the details below to get started.</p> 

      <InputField label="Email Address" icon={<Mail size={16} />} type="email" placeholder="you@gmail.com" value={form.email} onChange={set("email")} /> 

      <div style={{ marginBottom: 16 }}> 
        <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#444", marginBottom: 6 }}>Password</label> 
        <div style={{ position: "relative", display: "flex", alignItems: "center" }}> 
          <span style={{ position: "absolute", left: 12, color: "#999" }}><Lock size={16} /></span> 
          <input type={showPass ? "text" : "password"} value={form.password} onChange={set("password")} style={{ width: "100%", padding: "10px 40px", border: "1px solid #e5e5e5", borderRadius: 8 }} /> 
          <button style={{ position: "absolute", right: 12, background: "none", border: "none", cursor: "pointer", color: "#999" }} onClick={() => setShowPass(!showPass)}> 
            {showPass ? <EyeOff size={15} /> : <Eye size={15} />} 
          </button> 
        </div>
      </div>

      <div style={{ marginBottom: 16 }}> 
        <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#444", marginBottom: 6 }}>Confirm Password</label> 
        <div style={{ position: "relative", display: "flex", alignItems: "center" }}> 
          <span style={{ position: "absolute", left: 12, color: "#999" }}><Lock size={16} /></span> 
          <input type={showConfirm ? "text" : "password"} value={form.confirm} onChange={set("confirm")} style={{ width: "100%", padding: "10px 40px", border: "1px solid #e5e5e5", borderRadius: 8 }} /> 
          <button style={{ position: "absolute", right: 12, background: "none", border: "none", cursor: "pointer", color: "#999" }} onClick={() => setShowConfirm(!showConfirm)}> 
            {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />} 
          </button> 
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}> 
        <input type="checkbox" id="terms" checked={agreed} onChange={e => setAgreed(e.target.checked)} style={{ cursor: "pointer" }} /> 
        <label htmlFor="terms" style={{ fontSize: 13, color: "#666" }}>I agree to the Terms of Service</label> 
      </div> 

      <button
        style={{ width: "100%", padding: "12px", background: CRIMSON, color: "#fff", border: "none", borderRadius: 8, fontWeight: 600, cursor: "pointer", opacity: loading || strength.score < 2 || !passwordsMatch || !agreed ? 0.6 : 1 }} 
        onClick={handleRegisterSubmit} 
        disabled={strength.score < 2 || !passwordsMatch || !agreed || loading}
      >
        {loading ? "Sending OTP..." : <>Create Account <ArrowRight size={16} style={{ display: "inline", verticalAlign: "middle" }} /></>} 
      </button> 
    </>
  );
}