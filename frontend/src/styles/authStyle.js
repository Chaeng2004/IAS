export const CRIMSON = "#DC143C";
export const CRIMSON_DARK = "#A50E2D";
export const CRIMSON_LIGHT = "#FFF0F3";
export const CRIMSON_MID = "#F5C6CF";

export const styles = {
  root: { 
        minHeight: "100vh", 
        background: `#fff`, 
        display: "flex", 
        fontFamily: "'Georgia', serif", 
        margin: 0, 
        padding: 0 
    },
  leftPanel: { 
        width: "42%", 
        background: CRIMSON, 
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "center", 
        alignItems: "flex-start", 
        padding: "60px 52px", 
        position: "relative", 
        overflow: "hidden", 
        flexShrink: 0 
    },
  rightPanel: { 
        flex: 1, 
        background: "#fff", 
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "center", 
        alignItems: "center", 
        padding: "48px 40px", 
        overflowY: "auto" 
    },
  brandMark: { 
        display: "flex", 
        alignItems: "center", 
        gap: "10px", 
        marginBottom: "56px", 
        zIndex: 1 
    },
  brandIcon: { 
        width: 40, 
        height: 40, 
        borderRadius: "50%", 
        background: "rgba(255,255,255,0.2)", 
        border: "1.5px solid rgba(255,255,255,0.5)", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center" 
    },
  brandName: { 
        color: "#fff", 
        fontSize: 18, 
        fontWeight: 600, 
        letterSpacing: "0.04em", 
        fontFamily: "'Georgia', serif" 
    },
  headline: { 
        color: "#fff", 
        fontSize: 38, 
        fontWeight: 700, 
        lineHeight: 1.25, 
        marginBottom: 16, 
        zIndex: 1, 
        letterSpacing: "-0.01em" 
    },
  subheadline: { 
        color: "rgba(255,255,255,0.78)", 
        fontSize: 15, lineHeight: 1.7, 
        marginBottom: 44, 
        zIndex: 1, 
        maxWidth: 320 
    },
  featureItem: { 
        display: "flex", 
        alignItems: "center", 
        gap: 12, 
        marginBottom: 18, 
        zIndex: 1 
    },
  featureIcon: { 
        width: 32, 
        height: 32, 
        borderRadius: 8, 
        background: "rgba(255,255,255,0.15)", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        flexShrink: 0 
    },
  featureText: { 
        color: "rgba(255,255,255,0.88)", 
        fontSize: 14, 
        lineHeight: 1.5 
    },
  bgCircle1: { 
        position: "absolute", 
        width: 320, 
        height: 320, 
        borderRadius: "50%", 
        background: "rgba(255,255,255,0.06)", 
        top: -80, 
        right: -100, 
        pointerEvents: "none" 
    },
  bgCircle2: { 
        position: "absolute", 
        width: 200, 
        height: 200, 
        borderRadius: "50%", 
        background: "rgba(255,255,255,0.06)", 
        bottom: -60, 
        left: -60, 
        pointerEvents: "none" 
    },
  formCard: { 
        width: "100%", 
        maxWidth: 420 
    },
  tabRow: { 
        display: "flex", 
        gap: 0, 
        marginBottom: 36, 
        borderBottom: `2px solid #f0f0f0` 
    },
  tab: { 
        flex: 1, 
        paddingBottom: 14, 
        fontSize: 15, 
        fontWeight: 600, 
        letterSpacing: "0.02em", 
        cursor: "pointer", 
        border: "none", 
        background: "none", 
        color: "#aaa", 
        textAlign: "center", 
        transition: "color 0.2s", 
        fontFamily: "'Georgia', serif" 
    },
  tabActive: { 
        color: CRIMSON, 
        borderBottom: `2.5px solid ${CRIMSON}`,
        marginBottom: -2 
    },
  heading: { 
        fontSize: 26, 
        fontWeight: 700, 
        color: "#1a1a1a", 
        marginBottom: 6, 
        letterSpacing: "-0.01em", 
        fontFamily: "'Georgia', serif" 
    },
  subheading: { 
        fontSize: 14, 
        color: "#888", 
        marginBottom: 30, 
        lineHeight: 1.6 
    },
  fieldGroup: { 
        marginBottom: 18 
    },
  label: { 
        display: "block", 
        fontSize: 12, 
        fontWeight: 600, 
        color: "#555", 
        marginBottom: 7, 
        letterSpacing: "0.06em", 
        textTransform: "uppercase", 
        fontFamily: "'Georgia', serif" 
    },
  inputWrap: { 
        position: "relative", 
        display: "flex", 
        alignItems: "center" 
    },
  inputIcon: { 
        position: "absolute", 
        left: 14, color: "#bbb", 
        display: "flex", 
        alignItems: "center", 
        pointerEvents: "none", 
        zIndex: 1 
    },
  input: { 
        width: "100%", 
        padding: "12px 14px 12px 42px", 
        border: "1.5px solid #e5e5e5", 
        borderRadius: 10, 
        fontSize: 14, 
        color: "#1a1a1a", 
        background: "#fafafa", 
        outline: "none", 
        transition: "border 0.2s, background 0.2s", 
        boxSizing: "border-box", 
        fontFamily: "'Georgia', serif" 
    },
  eyeBtn: { 
        position: "absolute", 
        right: 12, 
        background: "none", 
        border: "none", 
        cursor: "pointer", 
        color: "#bbb", 
        display: "flex", 
        alignItems: "center", 
        padding: 4 
    },
  rowFields: { 
        display: "grid", 
        gridTemplateColumns: "1fr 1fr", 
        gap: 14, 
        marginBottom: 18 
    },
  submitBtn: { 
        width: "100%", 
        padding: "14px", 
        background: CRIMSON, 
        color: "#fff", 
        border: "none", 
        borderRadius: 10, 
        fontSize: 15, 
        fontWeight: 700, 
        cursor: "pointer", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        gap: 8, 
        letterSpacing: "0.04em", 
        transition: "background 0.2s, transform 0.1s", 
        marginTop: 8, 
        fontFamily: "'Georgia', serif" 
    },
  divider: { 
        display: "flex", 
        alignItems: "center", 
        gap: 12, 
        margin: "22px 0" 
    },
  dividerLine: { 
        flex: 1, 
        height: 1, 
        background: "#ebebeb" 
    },
  dividerText: { 
        fontSize: 12, 
        color: "#bbb", 
        letterSpacing: "0.05em", 
        fontFamily: "'Georgia', serif" 
    },
  forgotLink: { 
        fontSize: 13, 
        color: CRIMSON, 
        textDecoration: "none", 
        cursor: "pointer", 
        fontFamily: "'Georgia', serif", 
        background: "none", 
        border: "none", 
        padding: 0 
    },
  inlineRow: { 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        marginBottom: 18 
    },
  checkRow: { 
        display: "flex", 
        alignItems: "center", 
        gap: 8 
    },
  checkLabel: { 
        fontSize: 13, 
        color: "#666", 
        fontFamily: "'Georgia', serif" 
    },
  terms: { 
        marginBottom: 20, 
        fontSize: 13, 
        color: "#888", 
        lineHeight: 1.6, 
        fontFamily: "'Georgia', serif" 
    },
  termsLink: { 
        color: CRIMSON, 
        cursor: "pointer", 
        textDecoration: "underline", 
        fontFamily: "'Georgia', serif" 
    },
  successBox: { 
        textAlign: "center", 
        padding: "32px 0" 
    },
  successIcon: { 
        width: 64, 
        height: 64, 
        borderRadius: "50%", 
        background: CRIMSON_LIGHT, 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        margin: "0 auto 20px" 
    },
  successTitle: { 
        fontSize: 22, 
        fontWeight: 700, 
        color: "#1a1a1a", 
        marginBottom: 8, 
        fontFamily: "'Georgia', serif" 
    },
  successSub: { 
        fontSize: 14, 
        color: "#888", 
        marginBottom: 28, 
        lineHeight: 1.6, 
        fontFamily: "'Georgia', serif" 
    }
};