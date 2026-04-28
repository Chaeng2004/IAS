import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import InputField from "../shared/InputField";
import { styles, CRIMSON, CRIMSON_DARK } from "../styles/authStyle";
import { supabase } from "../supabase"; // Import Supabase

export default function Login({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!email || !password) return;
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message); 
    } else {
      onSuccess(); // Supabase automatically handles the secure token storage!
    }
  }

  return (
    <>
      <h2 style={styles.heading}>Welcome back</h2>
      <p style={styles.subheading}>Sign in to your account to continue.</p>

      <InputField label="Email Address" icon={<Mail size={16} />} type="email" placeholder="you@gmail.com" value={email} onChange={e => setEmail(e.target.value)} />

      <div style={styles.fieldGroup}>
        <div style={styles.inlineRow}>
          <label style={{ ...styles.label, marginBottom: 0 }}>Password</label>
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

      <button
        style={{ ...styles.submitBtn, marginTop: 22, opacity: loading ? 0.8 : 1 }} onClick={handleSubmit}
        onMouseEnter={e => { e.target.style.background = CRIMSON_DARK; }} onMouseLeave={e => { e.target.style.background = CRIMSON; }}
      >
        {loading ? "Signing in…" : <>Sign In <ArrowRight size={16} /></>}
      </button>
    </>
  );
}