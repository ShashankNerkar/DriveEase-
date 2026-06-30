import { useState } from "react";
import { quizQuestions } from "../../data/mockData";
import "./MockTestCenter.css";

// ── Constants ──
const PASS_THRESHOLD = 0.8; // 80% to pass

// ── Helper: derive result label ──
function getResultMeta(score, total) {
  const pct = score / total;
  if (pct >= PASS_THRESHOLD) return { label: "Passed 🎉", className: "result--pass" };
  if (pct >= 0.5)             return { label: "Almost There 💪", className: "result--mid"  };
  return                             { label: "Keep Practising 📚", className: "result--fail" };
}

// ── Sub-component: Option button for a single question ──
function OptionButton({ index, text, status, onClick }) {
  // status: "default" | "correct" | "wrong" | "missed"
  return (
    <button
      className={`option-btn option-btn--${status}`}
      onClick={onClick}
      disabled={status !== "default"}
      aria-label={`Option ${index + 1}: ${text}`}
    >
      <span className="option-btn__letter">
        {String.fromCharCode(65 + index)} {/* A, B, C, D */}
      </span>
      <span className="option-btn__text">{text}</span>
      {status === "correct" && <span className="option-btn__icon" aria-hidden="true">✓</span>}
      {status === "wrong"   && <span className="option-btn__icon" aria-hidden="true">✗</span>}
    </button>
  );
}

// ── Sub-component: Explanation panel shown after answering ──
function Explanation({ text, wasCorrect }) {
  return (
    <div className={`explanation ${wasCorrect ? "explanation--correct" : "explanation--wrong"}`}>
      <span className="explanation__icon" aria-hidden="true">
        {wasCorrect ? "💡" : "📖"}
      </span>
      <p className="explanation__text">{text}</p>
    </div>
  );
}

// ── Sub-component: Final score screen ──
function ResultScreen({ score, total, answers, onRetry }) {
  const percent = Math.round((score / total) * 100);
  const { label, className } = getResultMeta(score, total);

  return (
    <div className="result-screen">
      {/* Score circle */}
      <div className={`result-screen__circle ${className}`}>
        <span className="result-screen__percent">{percent}%</span>
        <span className="result-screen__fraction">{score}/{total} correct</span>
      </div>

      <p className={`result-screen__label ${className}`}>{label}</p>
      <p className="result-screen__desc">
        {percent >= 80
          ? "Great job! You're ready for the RTO mock test."
          : "Review the explanations below and try again to improve your score."}
      </p>

      {/* Per-question review */}
      <div className="result-review">
        {quizQuestions.map((q, i) => {
          const chosen = answers[i];
          const correct = q.correct;
          const isRight = chosen === correct;
          return (
            <div
              key={q.id}
              className={`review-item ${isRight ? "review-item--correct" : "review-item--wrong"}`}
            >
              <div className="review-item__header">
                <span className="review-item__num">Q{i + 1}</span>
                <p className="review-item__question">{q.question}</p>
                <span className="review-item__icon">{isRight ? "✓" : "✗"}</span>
              </div>
              {!isRight && (
                <p className="review-item__answer">
                  Correct: <strong>{q.options[correct]}</strong>
                </p>
              )}
            </div>
          );
        })}
      </div>

      <button className="retry-btn" onClick={onRetry}>
        Retake Test
      </button>
    </div>
  );
}

// ── Main MockTestCenter page ──
function MockTestCenter() {
  // -1 = not started, 0–9 = question index, "done" = finished
  const [phase, setPhase] = useState("intro"); // "intro" | "quiz" | "done"

  const [currentIndex, setCurrentIndex]   = useState(0);
  const [selectedOption, setSelectedOption] = useState(null); // index of chosen option
  const [answers, setAnswers]             = useState([]); // array of chosen indices
  const [score, setScore]                 = useState(0);

  const question = quizQuestions[currentIndex];
  const isAnswered = selectedOption !== null;
  const isLastQuestion = currentIndex === quizQuestions.length - 1;

  function handleOptionClick(optionIndex) {
    if (isAnswered) return; // already answered
    setSelectedOption(optionIndex);
    if (optionIndex === question.correct) {
      setScore((prev) => prev + 1);
    }
  }

  function handleNext() {
    setAnswers((prev) => [...prev, selectedOption]);
    if (isLastQuestion) {
      setPhase("done");
    } else {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
    }
  }

  function handleRetry() {
    setPhase("intro");
    setCurrentIndex(0);
    setSelectedOption(null);
    setAnswers([]);
    setScore(0);
  }

  // Derive the display status for each option button
  function getOptionStatus(optionIndex) {
    if (!isAnswered) return "default";
    if (optionIndex === question.correct) return "correct";
    if (optionIndex === selectedOption)   return "wrong";
    return "default";
  }

  // ── Intro screen ──
  if (phase === "intro") {
    return (
      <div className="mock-test-center">
        <div className="intro-screen">
          <div className="intro-screen__icon">📝</div>
          <h1 className="intro-screen__title">RTO Mock Test</h1>
          <p className="intro-screen__desc">
            Test your knowledge of Indian traffic rules and road signs.
            Answer all 10 questions, then see your score with explanations.
          </p>
          <ul className="intro-screen__rules">
            <li>📋 10 multiple-choice questions</li>
            <li>✅ Immediate feedback after each answer</li>
            <li>🏆 Score 80% or above to pass</li>
            <li>📖 Explanations provided for every question</li>
          </ul>
          <button className="intro-screen__btn" onClick={() => setPhase("quiz")}>
            Start Test
          </button>
        </div>
      </div>
    );
  }

  // ── Results screen ──
  if (phase === "done") {
    return (
      <div className="mock-test-center">
        <ResultScreen
          score={score}
          total={quizQuestions.length}
          answers={answers}
          onRetry={handleRetry}
        />
      </div>
    );
  }

  // ── Quiz screen ──
  return (
    <div className="mock-test-center">

      {/* Progress header */}
      <div className="quiz-header">
        <div className="quiz-header__meta">
          <span className="quiz-header__label">Question</span>
          <span className="quiz-header__counter">
            {currentIndex + 1}
            <span className="quiz-header__total">/{quizQuestions.length}</span>
          </span>
        </div>

        {/* Progress dots */}
        <div className="quiz-dots" aria-label="Quiz progress">
          {quizQuestions.map((_, i) => (
            <span
              key={i}
              className={`quiz-dot ${
                i < currentIndex
                  ? "quiz-dot--done"
                  : i === currentIndex
                  ? "quiz-dot--current"
                  : ""
              }`}
              aria-hidden="true"
            />
          ))}
        </div>

        {/* Score tracker */}
        <span className="quiz-header__score">Score: {score}</span>
      </div>

      {/* Question card */}
      <div className="question-card">
        <p className="question-card__text">{question.question}</p>

        <div className="question-card__options">
          {question.options.map((opt, i) => (
            <OptionButton
              key={i}
              index={i}
              text={opt}
              status={getOptionStatus(i)}
              onClick={() => handleOptionClick(i)}
            />
          ))}
        </div>

        {/* Explanation — shown after answering */}
        {isAnswered && (
          <Explanation
            text={question.explanation}
            wasCorrect={selectedOption === question.correct}
          />
        )}

        {/* Next / Finish button */}
        {isAnswered && (
          <button className="next-btn" onClick={handleNext}>
            {isLastQuestion ? "See My Results →" : "Next Question →"}
          </button>
        )}
      </div>

    </div>
  );
}

export default MockTestCenter;
