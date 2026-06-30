import { useState } from "react";
import { curriculumModules, studentProfile } from "../../data/mockData";
import "./CurriculumTracker.css";

// ── Status config — drives icon and class names ──
const STATUS_CONFIG = {
  completed:   { icon: "✅", label: "Completed",   className: "skill--completed"   },
  "in-progress": { icon: "🔄", label: "In Progress", className: "skill--in-progress" },
  locked:      { icon: "🔒", label: "Locked",      className: "skill--locked"       },
};

// ── helper: count completed skills in all modules ──
function getTotalStats() {
  let total = 0;
  let completed = 0;
  let inProgress = 0;
  curriculumModules.forEach((mod) => {
    mod.skills.forEach((skill) => {
      total++;
      if (skill.status === "completed") completed++;
      if (skill.status === "in-progress") inProgress++;
    });
  });
  return { total, completed, inProgress };
}

// ── Sub-component: single skill row ──
function SkillRow({ skill }) {
  const { name, description, status } = skill;
  const config = STATUS_CONFIG[status];

  return (
    <li className={`skill ${config.className}`}>
      <span className="skill__icon" aria-hidden="true">{config.icon}</span>
      <div className="skill__body">
        <p className="skill__name">{name}</p>
        <p className="skill__desc">{description}</p>
      </div>
      <span className={`skill__badge skill__badge--${status}`}>{config.label}</span>
    </li>
  );
}

// ── Sub-component: collapsible module card ──
function ModuleCard({ module }) {
  const [expanded, setExpanded] = useState(true);
  const { category, skills } = module;

  const completedCount = skills.filter((s) => s.status === "completed").length;
  const totalCount = skills.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  // Determine overall module status for the accent bar
  const allDone = completedCount === totalCount;
  const noneLocked = skills.some((s) => s.status !== "locked");

  return (
    <div className={`module-card ${allDone ? "module-card--done" : ""}`}>
      {/* Card header — click to expand/collapse */}
      <button
        className="module-card__header"
        onClick={() => setExpanded((prev) => !prev)}
        aria-expanded={expanded}
        aria-controls={`module-skills-${module.id}`}
      >
        <div className="module-card__header-left">
          <span className="module-card__category">{category}</span>
          <span className="module-card__count">
            {completedCount}/{totalCount} skills
          </span>
        </div>
        <div className="module-card__header-right">
          {/* Mini progress bar */}
          <div className="module-mini-bar" aria-hidden="true">
            <div
              className="module-mini-bar__fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="module-card__percent">{progressPercent}%</span>
          <span className={`module-card__chevron ${expanded ? "module-card__chevron--up" : ""}`}>
            ▾
          </span>
        </div>
      </button>

      {/* Skills list */}
      {expanded && (
        <ul
          className="module-card__skills"
          id={`module-skills-${module.id}`}
        >
          {skills.map((skill) => (
            <SkillRow key={skill.id} skill={skill} />
          ))}
        </ul>
      )}
    </div>
  );
}

// ── Main CurriculumTracker page ──
function CurriculumTracker() {
  const { total, completed, inProgress } = getTotalStats();
  const overallPercent = Math.round((completed / total) * 100);

  return (
    <div className="curriculum-tracker">

      {/* ── Page header ── */}
      <div className="curriculum-tracker__header">
        <div className="curriculum-tracker__header-text">
          <h1 className="curriculum-tracker__title">Curriculum & Progress</h1>
          <p className="curriculum-tracker__subtitle">
            Track every driving skill from basics to advanced maneuvers.
          </p>
        </div>
      </div>

      {/* ── Overall stats row ── */}
      <div className="stats-row">
        <div className="stat-card">
          <p className="stat-card__value">{completed}</p>
          <p className="stat-card__label">Completed</p>
        </div>
        <div className="stat-card stat-card--inprogress">
          <p className="stat-card__value">{inProgress}</p>
          <p className="stat-card__label">In Progress</p>
        </div>
        <div className="stat-card stat-card--locked">
          <p className="stat-card__value">{total - completed - inProgress}</p>
          <p className="stat-card__label">Locked</p>
        </div>
        <div className="stat-card stat-card--overall">
          <p className="stat-card__value">{overallPercent}%</p>
          <p className="stat-card__label">Overall</p>
        </div>
      </div>

      {/* ── Overall progress bar ── */}
      <div className="overall-progress">
        <div className="overall-progress__header">
          <span className="overall-progress__label">
            {studentProfile.name}'s Curriculum Progress
          </span>
          <span className="overall-progress__count">{completed}/{total} skills mastered</span>
        </div>
        <div
          className="overall-progress__track"
          role="progressbar"
          aria-valuenow={overallPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Overall curriculum progress: ${overallPercent}%`}
        >
          <div
            className="overall-progress__fill"
            style={{ width: `${overallPercent}%` }}
          />
        </div>
      </div>

      {/* ── Module cards ── */}
      <div className="modules-list">
        {curriculumModules.map((mod) => (
          <ModuleCard key={mod.id} module={mod} />
        ))}
      </div>

    </div>
  );
}

export default CurriculumTracker;
