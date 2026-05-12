import './button.css';

/**
 * Button – reusable button component
 *
 * Usage:
 *   <Button variant="primary" onClick={handleClick}>Click me</Button>
 *
 * Variants:
 *   "primary"   – blue, solid (default)
 *   "secondary" – orange, solid
 *   "outline"   – transparent, follows dark/light mode
 *
 * Props:
 *   variant   string – "primary" | "secondary" | "outline", default "primary"
 *   onClick   func   – click handler
 *   disabled  bool   – disables the button, default false
 *   type      string – "button" | "submit" | "reset", default "button"
 */

export default function Button({
  variant = 'primary',
  onClick,
  children,
  disabled = false,
  type = 'button',
  ...rest
}) {
  return (
    <button
      type={type}
      className={`btn btn--${variant}`}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}