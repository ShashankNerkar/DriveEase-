import { Link } from "react-router-dom";
import { badges, curriculumModules } from "../../data/mockData";
import "./Profile.css";

// ── Derive initials ("Aryan Mehta" → "AM") ──────────────────
function getInitials(name) {
  if (!name) return "?";
  return name
    .trim()
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

// ── Readable license labels ──────────────────────────────────
const LICENSE_LABELS = {
  LMV:      "Light Motor Vehicle (Car)",
  MCWG:     "Motorcycle with Gear",
  MCWOG:    "Motorcycle without Gear",
  "LMV-TR": "Light Transport Vehicle",
};

// ── Derive stats from mockData course content ────────────────
function getCourseStats() {
  let totalSkills = 0;
  let completedSkills = 0;
  curriculumModules.forEach((mod) => {
    mod.skills.forEach((skill) => {
      totalSkills++;
      if (skill.status === "completed") completedSkills++;
    });
  });
  const earnedBadges = badges.filter((b) => b.earned).length;
  // Lesson counts are fixed in mockData until backend tracking exists
  return { totalSkills, completedSkills, earnedBadges, completedLessons: 6, totalLessons: 10 };
}

// ── Sub-component: info row on the ID card ───────────────────
function InfoRow({ icon, label, value }) {
  return (
    <div className="info-row">
      <span className="info-row__icon" aria-hidden="true">{icon}</span>
      <div className="info-row__body">
        <p className="info-row__label">{label}</p>
        <p className="info-row__value">{value}</p>
      </div>
    </div>
  );
}

/*
 * Props
 * ─────
 * studentData — object from App.jsx global state
 *   { fullName, city, mobile, licenseType }
 */
function Profile({ studentData }) {
  const { fullName, city, mobile, licenseType } = studentData;
  const initials    = getInitials(fullName);
  const licenseLabel = LICENSE_LABELS[licenseType] ?? licenseType;

  const {
    totalSkills, completedSkills, earnedBadges,
    completedLessons, totalLessons,
  } = getCourseStats();

  const lessonPercent = Math.round((completedLessons / totalLessons) * 100);

  // Enrollment date: today (since they just registered)
  const enrolledToday = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="profile-page">

      {/* ── Digital Identity Card ── */}
      <div className="id-card">

        {/* Dark header strip */}
        <div className="id-card__header">
          <div className="id-card__header-brand">
            <span>🚗</span>
            <span>DriveEase Student ID</span>
          </div>
          <span className="id-card__header-type">{licenseType}</span>
        </div>

        {/* Avatar + name */}
        <div className="id-card__identity">
          <div className="id-card__avatar">{initials}</div>
          <div className="id-card__identity-text">
            <h1 className="id-card__name">{fullName}</h1>
            <p className="id-card__enrolled">Enrolled: {enrolledToday}</p>
            <span className="id-card__license-pill">
              🪪 {licenseType} — {licenseLabel}
            </span>
          </div>
        </div>

        <div className="id-card__divider" />

        {/* Personal details grid — all from studentData */}
        <div className="id-card__details">
          <InfoRow icon="👤" label="Full Name"     value={fullName}  />
          <InfoRow icon="📱" label="Mobile Number" value={`+91 ${mobile}`} />
          <InfoRow icon="📍" label="City"          value={city}      />
          <InfoRow icon="🎓" label="License Class" value={`${licenseType} — ${licenseLabel}`} />
        </div>

        {/* Footer strip */}
        <div className="id-card__footer">
          <span className="id-card__footer-text">DriveEase Driving School · Est. 2015</span>
          <span className="id-card__footer-id">ID: STU-{mobile.slice(-4)}</span>
        </div>

      </div>

      {/* ── Progress summary ── */}
      <div className="profile-stats">
        <h2 className="profile-stats__title">Your Progress at a Glance</h2>

        <div className="profile-stats__grid">
          <div className="pstat-card">
            <p className="pstat-card__value">{completedLessons}/{totalLessons}</p>
            <p className="pstat-card__label">Lessons Done</p>
            <div className="pstat-card__bar-track">
              <div
                className="pstat-card__bar-fill pstat-card__bar-fill--blue"
                style={{ width: `${lessonPercent}%` }}
              />
            </div>
          </div>

          <div className="pstat-card">
            <p className="pstat-card__value">{completedSkills}/{totalSkills}</p>
            <p className="pstat-card__label">Skills Mastered</p>
            <div className="pstat-card__bar-track">
              <div
                className="pstat-card__bar-fill pstat-card__bar-fill--green"
                style={{ width: `${Math.round((completedSkills / totalSkills) * 100)}%` }}
              />
            </div>
          </div>

          <div className="pstat-card">
            <p className="pstat-card__value">{earnedBadges}/{badges.length}</p>
            <p className="pstat-card__label">Badges Earned</p>
            <div className="pstat-card__bar-track">
              <div
                className="pstat-card__bar-fill pstat-card__bar-fill--amber"
                style={{ width: `${Math.round((earnedBadges / badges.length) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        <div className="profile-actions">
          <Link to="/curriculum" className="profile-action-btn profile-action-btn--primary">
            📋 View Curriculum
          </Link>
          <Link to="/book-slot" className="profile-action-btn profile-action-btn--outline">
            📅 Book a Lesson
          </Link>
        </div>
      </div>

    </div>
  );
}

export default Profile;
