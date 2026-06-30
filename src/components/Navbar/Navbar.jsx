import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

// ── Desktop links ─────────────────────────────────────────────
const NAV_LINKS = [
  { to: "/dashboard",  label: "Dashboard",  end: true },
  { to: "/book-slot",  label: "Book a Slot"            },
  { to: "/curriculum", label: "Curriculum"              },
  { to: "/mock-test",  label: "Mock Test"               },
  { to: "/about",      label: "About"                   },
];

// ── Mobile drawer links ───────────────────────────────────────
const DRAWER_LINKS = [
  { to: "/dashboard",  label: "🏠 Dashboard",          end: true },
  { to: "/book-slot",  label: "📅 Book a Slot"                   },
  { to: "/curriculum", label: "📋 Curriculum"                     },
  { to: "/mock-test",  label: "📝 Mock Test"                      },
  { to: "/about",      label: "ℹ️  About"                         },
  { to: "/profile",    label: "👤 My Profile"                     },
  { to: "/sign-up",    label: "✏️  Register / Sign Up"            },
];

/*
 * Props
 * ─────
 * studentData — null (not registered) | { fullName, city, mobile, licenseType }
 * initials    — "AM" derived in App.jsx; shown in avatar circle
 */
function Navbar({ studentData, initials }) {
  const [menuOpen,     setMenuOpen]     = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const closeMenu     = () => setMenuOpen(false);
  const closeDropdown = () => setDropdownOpen(false);

  // Close dropdown when clicking outside its container
  useEffect(() => {
    function onClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        closeDropdown();
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function handleDrawerLink() {
    closeMenu();
    closeDropdown();
  }

  // Displayed name — full name if registered, fallback otherwise
  const displayName  = studentData?.fullName ?? "Guest";
  const displayEmail = studentData
    ? `${studentData.licenseType} · ${studentData.city}`
    : "Not registered";

  return (
    <nav className="navbar">

      {/* ── Brand ── */}
      <NavLink
        to={studentData ? "/dashboard" : "/sign-up"}
        className="navbar__brand"
        onClick={closeMenu}
      >
        <span className="navbar__brand-icon">🚗</span>
        <span className="navbar__brand-text">
          Drive<span className="navbar__brand-accent">Ease</span>
        </span>
      </NavLink>

      {/* ── Desktop nav links ── */}
      <ul className="navbar__links" role="list">
        {NAV_LINKS.map(({ to, label, end }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                isActive ? "navbar__link navbar__link--active" : "navbar__link"
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* ── Right controls: avatar + hamburger ── */}
      <div className="navbar__controls">

        {/* Avatar dropdown */}
        <div className="navbar__avatar-wrap" ref={dropdownRef}>
          <button
            className="navbar__avatar"
            onClick={() => setDropdownOpen((p) => !p)}
            aria-haspopup="menu"
            aria-expanded={dropdownOpen}
            aria-label={`Account menu for ${displayName}`}
            title={displayName}
          >
            {initials ?? "?"}
          </button>

          {dropdownOpen && (
            <div className="navbar__dropdown" role="menu" aria-label="Account menu">

              {/* Identity header */}
              <div className="navbar__dropdown-header">
                <div className="navbar__dropdown-avatar" aria-hidden="true">
                  {initials ?? "?"}
                </div>
                <div>
                  <p className="navbar__dropdown-name">{displayName}</p>
                  <p className="navbar__dropdown-email">{displayEmail}</p>
                </div>
              </div>

              <div className="navbar__dropdown-divider" role="separator" />

              {/* My Profile — only useful once registered */}
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive
                    ? "navbar__dropdown-item navbar__dropdown-item--active"
                    : "navbar__dropdown-item"
                }
                onClick={closeDropdown}
                role="menuitem"
              >
                <span className="navbar__dropdown-item-icon">👤</span>
                My Profile
              </NavLink>

              <NavLink
                to="/sign-up"
                className={({ isActive }) =>
                  isActive
                    ? "navbar__dropdown-item navbar__dropdown-item--active"
                    : "navbar__dropdown-item"
                }
                onClick={closeDropdown}
                role="menuitem"
              >
                <span className="navbar__dropdown-item-icon">✏️</span>
                Register / Sign Up
              </NavLink>

              <div className="navbar__dropdown-divider" role="separator" />

              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? "navbar__dropdown-item navbar__dropdown-item--active"
                    : "navbar__dropdown-item"
                }
                onClick={closeDropdown}
                role="menuitem"
              >
                <span className="navbar__dropdown-item-icon">ℹ️</span>
                About DriveEase
              </NavLink>

            </div>
          )}
        </div>

        {/* Hamburger button */}
        <button
          className={`navbar__hamburger ${menuOpen ? "navbar__hamburger--open" : ""}`}
          onClick={() => setMenuOpen((p) => !p)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-drawer"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>

      </div>

      {/* ── Mobile drawer ── */}
      <div
        id="mobile-drawer"
        className={`navbar__drawer ${menuOpen ? "navbar__drawer--open" : ""}`}
        aria-hidden={!menuOpen}
      >
        {/* Student mini-profile at top of drawer */}
        <div className="navbar__drawer-profile">
          <div className="navbar__drawer-avatar" aria-hidden="true">
            {initials ?? "?"}
          </div>
          <div>
            <p className="navbar__drawer-student-name">{displayName}</p>
            <p className="navbar__drawer-student-meta">
              {studentData
                ? `${studentData.licenseType} · ${studentData.city}`
                : "Complete registration to get started"}
            </p>
          </div>
        </div>

        <div className="navbar__drawer-divider" />

        <ul className="navbar__drawer-links" role="list">
          {DRAWER_LINKS.map(({ to, label, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                  isActive
                    ? "navbar__drawer-link navbar__drawer-link--active"
                    : "navbar__drawer-link"
                }
                onClick={handleDrawerLink}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Overlay behind open drawer */}
      {menuOpen && (
        <div
          className="navbar__overlay"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

    </nav>
  );
}

export default Navbar;
