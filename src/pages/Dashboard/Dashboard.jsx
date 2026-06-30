import { upcomingLessons, badges } from "../../data/mockData";
import "./Dashboard.css";

// ── helper: format "2025-07-05" → "Saturday, 5 Jul 2025" ──
function formatDate(dateStr) {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// ── Derive avatar initials from a full name ("Aryan Mehta" → "AM") ──
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

// ── License type labels ──────────────────────────────────────
const LICENSE_LABELS = {
  LMV:      "Light Motor Vehicle (Car)",
  MCWG:     "Motorcycle with Gear",
  MCWOG:    "Motorcycle without Gear",
  "LMV-TR": "Light Transport Vehicle",
};

/*
 * Props
 * ─────
 * studentData — object from App.jsx global state
 *   { fullName, city, mobile, licenseType }
 *
 * Course progress (completedLessons / totalLessons) is fixed in
 * mockData until the real backend tracks per-student progress.
 */

// ── Sub-component: profile hero + progress bar ──
function ProfileSection({ studentData }) {
  const { fullName, licenseType } = studentData;
  const initials = getInitials(fullName);

  // These remain from mockData — progress is course-level, not per user
  const completedLessons = 6;
  const totalLessons     = 10;
  const progressPercent  = Math.round((completedLessons / totalLessons) * 100);
  const licenseLabel     = LICENSE_LABELS[licenseType] ?? licenseType;

  return (
    <section className="dashboard__profile">
      <div className="profile__avatar">{initials}</div>

      <div className="profile__info">
        <p className="profile__greeting">Welcome back,</p>
        <h1 className="profile__name">{fullName}</h1>
        <span className="profile__license-badge">
          🪪 {licenseType} — {licenseLabel}
        </span>
      </div>

      <div className="profile__progress-card">
        <div className="progress-card__header">
          <span className="progress-card__label">Lesson Progress</span>
          <span className="progress-card__count">
            {completedLessons}
            <span className="progress-card__total">/{totalLessons} completed</span>
          </span>
        </div>

        <div
          className="progress-bar__track"
          role="progressbar"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${progressPercent}% of lessons completed`}
        >
          <div
            className="progress-bar__fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <p className="progress-card__caption">{progressPercent}% of your course complete</p>
      </div>
    </section>
  );
}

// ── Sub-component: single upcoming lesson alert card ──
function LessonAlertCard({ lesson }) {
  const { topic, instructorName, date, time } = lesson;
  return (
    <div className="lesson-card">
      <div className="lesson-card__accent" aria-hidden="true" />
      <div className="lesson-card__body">
        <p className="lesson-card__topic">{topic}</p>
        <p className="lesson-card__instructor">👨‍🏫 {instructorName}</p>
        <div className="lesson-card__meta">
          <span className="lesson-card__date">📅 {formatDate(date)}</span>
          <span className="lesson-card__time">🕘 {time}</span>
        </div>
      </div>
      <span className="lesson-card__chip">Upcoming</span>
    </div>
  );
}

// ── Sub-component: single badge tile ──
function BadgeTile({ badge }) {
  const { icon, title, description, earned } = badge;
  return (
    <div className={`badge-tile ${earned ? "badge-tile--earned" : "badge-tile--locked"}`}>
      <div className="badge-tile__icon">{earned ? icon : "🔒"}</div>
      <p className="badge-tile__title">{title}</p>
      <p className="badge-tile__desc">{description}</p>
      {earned && <span className="badge-tile__earned-label">Earned</span>}
    </div>
  );
}

// ── Main Dashboard page ──
function Dashboard({ studentData }) {
  const earnedCount = badges.filter((b) => b.earned).length;

  return (
    <div className="dashboard">

      {/* Section 1: Profile hero — uses dynamic studentData */}
      <ProfileSection studentData={studentData} />

      {/* Section 2: Upcoming lessons — from mockData (course-level) */}
      <section className="dashboard__section">
        <div className="section__header">
          <h2 className="section__title">Upcoming Lessons</h2>
          <span className="section__badge">{upcomingLessons.length} scheduled</span>
        </div>

        {upcomingLessons.length === 0 ? (
          <p className="dashboard__empty">
            No upcoming lessons. Book a slot to get started!
          </p>
        ) : (
          <div className="lesson-list">
            {upcomingLessons.map((lesson) => (
              <LessonAlertCard key={lesson.id} lesson={lesson} />
            ))}
          </div>
        )}
      </section>

      {/* Section 3: Badges — from mockData */}
      <section className="dashboard__section">
        <div className="section__header">
          <h2 className="section__title">Your Badges</h2>
          <span className="section__badge">{earnedCount}/{badges.length} earned</span>
        </div>

        <div className="badge-grid">
          {badges.map((badge) => (
            <BadgeTile key={badge.id} badge={badge} />
          ))}
        </div>
      </section>

    </div>
  );
}

export default Dashboard;
