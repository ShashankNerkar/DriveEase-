import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./SignUp.css";

// ── Validation ───────────────────────────────────────────────
function validateForm(fields) {
  const errors = {};

  if (!fields.fullName.trim()) {
    errors.fullName = "Full name is required.";
  } else if (fields.fullName.trim().length < 3) {
    errors.fullName = "Name must be at least 3 characters.";
  }

  if (!fields.city.trim()) {
    errors.city = "City is required.";
  }

  if (!fields.mobile.trim()) {
    errors.mobile = "Mobile number is required.";
  } else if (!/^[6-9]\d{9}$/.test(fields.mobile.trim())) {
    errors.mobile = "Enter a valid 10-digit Indian mobile number.";
  }

  if (!fields.licenseType) {
    errors.licenseType = "Please select a license type.";
  }

  if (!fields.password) {
    errors.password = "Password is required.";
  } else if (fields.password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }

  return errors;
}

/*
 * Props
 * ─────
 * onRegister(studentData) — callback from App.jsx that stores the
 *   student's data in global state. Called with the cleaned form
 *   fields just before navigating to the dashboard.
 */
function SignUp({ onRegister }) {
  const navigate = useNavigate();

  const [fields, setFields] = useState({
    fullName:    "",
    city:        "",
    mobile:      "",
    licenseType: "",
    password:    "",
  });

  const [errors, setErrors]             = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted]       = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    // Wipe the error for this field as the user corrects it
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validateForm(fields);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    /*
     * ── NOTE FOR DEVELOPERS ────────────────────────────────────────────
     * In production, replace this setTimeout with a real API call:
     *
     *   fetch("/api/register", {
     *     method: "POST",
     *     headers: { "Content-Type": "application/json" },
     *     body: JSON.stringify({
     *       fullName:    fields.fullName,
     *       city:        fields.city,
     *       mobile:      fields.mobile,
     *       licenseType: fields.licenseType,
     *       password:    fields.password,   // hashed server-side with bcrypt
     *     }),
     *   })
     *   .then(res => res.json())
     *   .then(data => {
     *     onRegister({ ...fields });        // update global state
     *     navigate("/dashboard");           // redirect to dashboard
     *   })
     *   .catch(() => setErrors({ form: "Registration failed. Please try again." }));
     *
     * Passwords must ALWAYS be hashed server-side. Never store plaintext.
     * ──────────────────────────────────────────────────────────────────
     */

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);

      // ── Update global student state in App.jsx ──
      // Password is excluded from the stored object on purpose.
      onRegister({
        fullName:    fields.fullName.trim(),
        city:        fields.city.trim(),
        mobile:      fields.mobile.trim(),
        licenseType: fields.licenseType,
      });

      // Brief success flash, then navigate to the dashboard
      setTimeout(() => navigate("/dashboard"), 1200);
    }, 1200);
  }

  return (
    <div className="signup-page">
      <div className="signup-card">

        {/* Brand */}
        <div className="signup-card__brand">
          <span className="signup-card__brand-icon">🚗</span>
          <span className="signup-card__brand-text">
            Drive<span className="signup-card__brand-accent">Ease</span>
          </span>
        </div>

        <h1 className="signup-card__title">Create Your Account</h1>
        <p className="signup-card__subtitle">
          Join thousands of students on their journey to getting licensed.
        </p>

        {/* Success flash */}
        {submitted && (
          <div className="signup-success" role="alert">
            <span>✅</span>
            <span>Registration successful! Taking you to your dashboard…</span>
          </div>
        )}

        {/* Form — hidden after successful submit */}
        {!submitted && (
          <form className="signup-form" onSubmit={handleSubmit} noValidate>

            {/* Full Name */}
            <div className="form-group">
              <label className="form-label" htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                className={`form-input ${errors.fullName ? "form-input--error" : ""}`}
                placeholder="e.g. Aryan Mehta"
                value={fields.fullName}
                onChange={handleChange}
                autoComplete="name"
              />
              {errors.fullName && (
                <p className="form-error" role="alert">{errors.fullName}</p>
              )}
            </div>

            {/* City */}
            <div className="form-group">
              <label className="form-label" htmlFor="city">City</label>
              <input
                id="city"
                name="city"
                type="text"
                className={`form-input ${errors.city ? "form-input--error" : ""}`}
                placeholder="e.g. Mumbai"
                value={fields.city}
                onChange={handleChange}
                autoComplete="address-level2"
              />
              {errors.city && (
                <p className="form-error" role="alert">{errors.city}</p>
              )}
            </div>

            {/* Mobile */}
            <div className="form-group">
              <label className="form-label" htmlFor="mobile">Mobile Number</label>
              <div className="form-input-prefix-wrap">
                <span className="form-input-prefix">+91</span>
                <input
                  id="mobile"
                  name="mobile"
                  type="tel"
                  className={`form-input form-input--prefixed ${errors.mobile ? "form-input--error" : ""}`}
                  placeholder="98765 43210"
                  value={fields.mobile}
                  onChange={handleChange}
                  maxLength={10}
                  autoComplete="tel"
                />
              </div>
              {errors.mobile && (
                <p className="form-error" role="alert">{errors.mobile}</p>
              )}
            </div>

            {/* License Type */}
            <div className="form-group">
              <label className="form-label" htmlFor="licenseType">License Type</label>
              <select
                id="licenseType"
                name="licenseType"
                className={`form-input form-select ${errors.licenseType ? "form-input--error" : ""}`}
                value={fields.licenseType}
                onChange={handleChange}
              >
                <option value="">— Select license type —</option>
                <option value="LMV">LMV — Light Motor Vehicle (Car)</option>
                <option value="MCWG">MCWG — Motorcycle with Gear</option>
                <option value="MCWOG">MCWOG — Motorcycle without Gear</option>
                <option value="LMV-TR">LMV-TR — Light Transport Vehicle</option>
              </select>
              {errors.licenseType && (
                <p className="form-error" role="alert">{errors.licenseType}</p>
              )}
            </div>

            {/* Password */}
            <div className="form-group">
              <label className="form-label" htmlFor="password">Create Password</label>
              <div className="form-input-eye-wrap">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className={`form-input form-input--eye ${errors.password ? "form-input--error" : ""}`}
                  placeholder="Min. 8 characters"
                  value={fields.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="form-eye-btn"
                  onClick={() => setShowPassword((p) => !p)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
              {errors.password && (
                <p className="form-error" role="alert">{errors.password}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className={`signup-btn ${isSubmitting ? "signup-btn--loading" : ""}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating your account…" : "Register & Get Started"}
            </button>

            <p className="signup-login-link">
              Already registered?{" "}
              <Link to="/dashboard" className="signup-link">Go to Dashboard</Link>
            </p>

          </form>
        )}

      </div>
    </div>
  );
}

export default SignUp;
