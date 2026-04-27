import { useState } from "react";
import { Mail, Lock, User, Eye, EyeOff, ArrowRight } from "lucide-react"; 
import InputField  from "../shared/InputField"; 
import { styles, CRIMSON, CRIMSON_DARK } from "../styles/authStyle"; 

export default function Register({ onSuccess }) {
  const [form, setForm] = useState({ first: "", last: "", email: "", phone: "", password: "", confirm: "" }); 
  const [showPass, setShowPass] = useState(false); 
  const [showConfirm, setShowConfirm] = useState(false); 
  const [agreed, setAgreed] = useState(false); 
  const [loading, setLoading] = useState(false); 

  const set = key => e => setForm(f => ({ ...f, [key]: e.target.value })); 

  const getPasswordStrength = (pass) => {
    let score = 0;
    if (!pass) return { score: 0, label: "", color: "#e5e5e5", width: "0%" };
    
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1; 

    if (score <= 1) return { score, label: "Weak", color: "#ef4444", width: "33%" }; 
    if (score <= 3) return { score, label: "Medium", color: "#eab308", width: "66%" }; 
    return { score, label: "Strong", color: "#22c55e", width: "100%" }; 
  };

  const strength = getPasswordStrength(form.password);
  const passwordsMatch = form.password.length > 0 && form.password === form.confirm;

  async function handleSubmit() {
    if (!form.email || strength.score < 2 || !passwordsMatch || !agreed) return; 
    setLoading(true); 

    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }) 
      });

      const data = await response.json();

      if (response.ok) {
        onSuccess(); 
      } else {
        alert(data.error || "Registration failed");
      }
    } catch (error) {
      alert("Cannot connect to server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h2 style={styles.heading}>Create your account</h2> 
      <p style={styles.subheading}>Fill in the details below to get started.</p> 

      <div style={styles.rowFields}> 
        <div style={styles.fieldGroup}> 
          <label style={styles.label}>First Name</label> 
          <div style={styles.inputWrap}> 
            <span style={styles.inputIcon}><User size={15} /></span> 
            <input
              type="text" value={form.first} 
              onChange={set("first")} style={styles.input} 
              onFocus={e => { e.target.style.borderColor = CRIMSON; e.target.style.background = "#fff"; }} 
              onBlur={e => { e.target.style.borderColor = "#e5e5e5"; e.target.style.background = "#fafafa"; }} 
            /> 
          </div>
        </div>
        <div style={styles.fieldGroup}> 
          <label style={styles.label}>Last Name</label> 
          <div style={styles.inputWrap}> 
            <span style={styles.inputIcon}><User size={15} /></span> 
            <input
              type="text"  value={form.last} 
              onChange={set("last")} style={styles.input} 
              onFocus={e => { e.target.style.borderColor = CRIMSON; e.target.style.background = "#fff"; }} 
              onBlur={e => { e.target.style.borderColor = "#e5e5e5"; e.target.style.background = "#fafafa"; }} 
            /> 
          </div>
        </div>
      </div>

      <InputField
        label="Email Address" 
        icon={<Mail size={16} />} 
        type="email" 
        placeholder="you@gmail.com" 
        value={form.email} 
        onChange={set("email")} 
      /> 

      <div style={styles.fieldGroup}> 
        <label style={styles.label}>Password</label> 
        <div style={styles.inputWrap}> 
          <span style={styles.inputIcon}><Lock size={16} /></span> 
          <input
            type={showPass ? "text" : "password"} 
            value={form.password} 
            onChange={set("password")} 
            style={styles.input} 
            onFocus={e => { e.target.style.borderColor = CRIMSON; e.target.style.background = "#fff"; }} 
            onBlur={e => { e.target.style.borderColor = "#e5e5e5"; e.target.style.background = "#fafafa"; }} 
          /> 
          <button style={styles.eyeBtn} onClick={() => setShowPass(v => !v)}> 
            {showPass ? <EyeOff size={15} /> : <Eye size={15} />} 
          </button> 
        </div>
        
        {form.password && (
          <div style={{ marginTop: 8 }}>
            <div style={{ width: "100%", height: 4, background: "#e5e5e5", borderRadius: 4, overflow: "hidden" }}>
              <div 
                style={{ 
                  height: "100%", 
                  width: strength.width, 
                  background: strength.color, 
                  transition: "all 0.3s ease-in-out" 
                }} 
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
              <span style={{ fontSize: 11, color: "#888", fontFamily: "'Georgia', serif" }}>
                Use 8+ chars, mix of letters & numbers
              </span>
              <span style={{ fontSize: 12, fontWeight: 600, color: strength.color, fontFamily: "'Georgia', serif" }}>
                {strength.label}
              </span>
            </div>
          </div>
        )}
      </div>

      <div style={styles.fieldGroup}> 
        <label style={styles.label}>Confirm Password</label> 
        <div style={styles.inputWrap}> 
          <span style={styles.inputIcon}><Lock size={16} /></span> 
          <input
            type={showConfirm ? "text" : "password"} 
            placeholder="Re-enter your password" 
            value={form.confirm} 
            onChange={set("confirm")} 
            style={{ 
              ...styles.input, 
              borderColor: form.confirm && !passwordsMatch ? "#ef4444" : "#e5e5e5" 
            }} 
            onFocus={e => { e.target.style.borderColor = CRIMSON; e.target.style.background = "#fff"; }} 
            onBlur={e => { e.target.style.borderColor = form.confirm && !passwordsMatch ? "#ef4444" : "#e5e5e5"; e.target.style.background = "#fafafa"; }} 
          /> 
          <button style={styles.eyeBtn} onClick={() => setShowConfirm(v => !v)}> 
            {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />} 
          </button> 
        </div>
        {form.confirm && !passwordsMatch && (
          <p style={{ fontSize: 11, color: "#ef4444", marginTop: 6, fontFamily: "'Georgia', serif" }}>
            Passwords do not match
          </p>
        )}
      </div>

      <div style={{ ...styles.checkRow, marginBottom: 16 }}> 
        <input
          type="checkbox" id="terms" checked={agreed} 
          onChange={e => setAgreed(e.target.checked)} 
          style={{ accentColor: CRIMSON, width: 14, height: 14, cursor: "pointer" }} 
        /> 
        <label htmlFor="terms" style={styles.checkLabel}> 
          I agree to the{" "} 
          <span style={styles.termsLink}>Terms of Service</span>{" "}and{" "} 
          <span style={styles.termsLink}>Privacy Policy</span> 
        </label> 
      </div> 

      <button
        style={{ 
          ...styles.submitBtn, 
          opacity: loading || strength.score < 2 || !passwordsMatch || !agreed ? 0.6 : 1 
        }} 
        onClick={handleSubmit} 
        onMouseEnter={e => { if (strength.score >= 2 && passwordsMatch && agreed) e.target.style.background = CRIMSON_DARK; }} 
        onMouseLeave={e => { if (strength.score >= 2 && passwordsMatch && agreed) e.target.style.background = CRIMSON; }} 
        disabled={strength.score < 2 || !passwordsMatch || !agreed || loading}
      >
        {loading ? "Creating account…" : <>Create Account <ArrowRight size={16} /></>} 
      </button> 
    </>
  );
}