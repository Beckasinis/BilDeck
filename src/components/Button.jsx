import { useState } from "react";

/**
 * Button – reusable button component
 *
 * Usage:
 *   <Button variant="primary" onClick={handleClick}>Click me</Button>
 *
 * Variants:
 *   "primary"      – blue, solid (default)
 *   "secondary"    – orange, solid
 *   "outline"      – transparent, follows dark/light mode
 *   "outline_hero" – transparent, always light text (for dark hero sections)
 *
 * Props:
 *   variant   string   – one of the variants above, default "primary"
 *   onClick   func     – click handler
 *   disabled  bool     – disables the button, default false
 *   type      string   – "button" | "submit" | "reset", default "button"
 */

const buttonStyles = {
  base: {
    padding: "0.7rem 1.5rem",
    borderRadius: "6px",
    fontSize: "0.95rem",
    fontWeight: 600,
    cursor: "pointer",
    transition: "opacity 0.15s ease, transform 0.1s ease",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.4rem",
  },
  primary: {
    background: "var(--accent)",
    color: "var(--dark-text)",
    border: "none",
  },
  secondary: {
    background: "var(--accent2)",
    color: "var(--dark-text)",  // ✅ fixad
    border: "none",
  },
  outline: {
    background: "transparent",
    color: "var(--text)",
    border: "1.5px solid rgba(255, 255, 255, 0.6)",
  }
};

export default function Button({
  variant = "primary",
  onClick,
  children,
  disabled = false,
  type = "button",
  ...rest
}) {
  const [pressed, setPressed] = useState(false);

  const style = {
    ...buttonStyles.base,
    ...buttonStyles[variant],
    opacity: disabled ? 0.5 : pressed ? 0.85 : 1,
    transform: pressed ? "scale(0.97)" : "scale(1)",
    cursor: disabled ? "not-allowed" : "pointer",
  };

  return (
    <button
      type={type}
      style={style}
      onClick={disabled ? undefined : onClick}
      onMouseDown={() => !disabled && setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}
