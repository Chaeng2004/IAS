import { styles, CRIMSON } from "../styles/authStyle";

export default function InputField({ label, icon, type = "text", placeholder, value, onChange, suffix }) {
  return (
    <div style={styles.fieldGroup}>
      <label style={styles.label}>{label}</label>
      <div style={styles.inputWrap}>
        <span style={styles.inputIcon}>{icon}</span>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={{ ...styles.input, outline: "none", transition: "all 0.2s" }} 
          onFocus={e => { e.target.style.borderColor = CRIMSON; e.target.style.background = "#fff"; }}
          onBlur={e => { e.target.style.borderColor = "#e5e5e5"; e.target.style.background = "transparent"; }}
        />
        {suffix}
      </div>
    </div>
  );
}