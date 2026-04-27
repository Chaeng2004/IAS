import { CheckCircle2 } from "lucide-react";
import { styles, CRIMSON, CRIMSON_DARK } from "../styles/authStyle";

export default function SuccessView({ type, onBack }) {
  return (
    <div style={styles.successBox}>
      <div style={styles.successIcon}>
        <CheckCircle2 size={32} color={CRIMSON} />
      </div>
      <h2 style={styles.successTitle}>
        {type === "login" ? "Signed in successfully!" : "Account created!"}
      </h2>
      <p style={styles.successSub}>
        {type === "login"
          ? "You're now logged into your account. Redirecting to your dashboard…"
          : "Your account has been created. Please check your email to verify your address."}
      </p>
      <button
        style={{ ...styles.submitBtn, maxWidth: 200, margin: "0 auto" }}
        onClick={onBack}
        onMouseEnter={e => { e.target.style.background = CRIMSON_DARK; }}
        onMouseLeave={e => { e.target.style.background = CRIMSON; }}
      >
        Back to Start
      </button>
    </div>
  );
}