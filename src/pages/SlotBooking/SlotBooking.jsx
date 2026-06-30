import { useState } from "react";
import {
  instructors,
  timeSlots,
  existingBookings,
  studentProfile,
} from "../../data/mockData";
import "./SlotBooking.css";

// ── helper: get today's date as "YYYY-MM-DD" for the date input min ──
function getTodayStr() {
  return new Date().toISOString().split("T")[0];
}

// ── helper: format "2025-07-05" → "Sat, 5 Jul 2025" ──
function formatDate(dateStr) {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// ── Sub-component: Instructor selector card ──
function InstructorCard({ instructor, selected, onSelect }) {
  const { avatar, name, specialization, rating, experience } = instructor;
  return (
    <button
      className={`instructor-card ${selected ? "instructor-card--selected" : ""}`}
      onClick={() => onSelect(instructor.id)}
      aria-pressed={selected}
    >
      <div className="instructor-card__avatar">{avatar}</div>
      <div className="instructor-card__info">
        <p className="instructor-card__name">{name}</p>
        <p className="instructor-card__spec">{specialization}</p>
        <div className="instructor-card__meta">
          <span className="instructor-card__rating">⭐ {rating}</span>
          <span className="instructor-card__exp">🕒 {experience}</span>
        </div>
      </div>
      {selected && <span className="instructor-card__check" aria-hidden="true">✓</span>}
    </button>
  );
}

// ── Sub-component: Single time slot button ──
function SlotButton({ slot, status, selected, onSelect }) {
  // status: "available" | "booked" | "selected"
  const isBooked = status === "booked";
  return (
    <button
      className={`slot-btn slot-btn--${isBooked ? "booked" : selected ? "selected" : "available"}`}
      onClick={() => !isBooked && onSelect(slot.id)}
      disabled={isBooked}
      aria-label={`${slot.time} — ${isBooked ? "unavailable" : "available"}`}
    >
      <span className="slot-btn__time">{slot.time}</span>
      <span className="slot-btn__label">
        {isBooked ? "Booked" : selected ? "Selected" : slot.label}
      </span>
    </button>
  );
}

// ── Sub-component: Booking confirmation banner ──
function ConfirmationBanner({ booking, onReset }) {
  const instructor = instructors.find((i) => i.id === booking.instructorId);
  return (
    <div className="confirmation-banner" role="alert">
      <div className="confirmation-banner__icon">🎉</div>
      <div className="confirmation-banner__body">
        <p className="confirmation-banner__title">Slot Booked Successfully!</p>
        <p className="confirmation-banner__detail">
          <strong>{formatDate(booking.date)}</strong> at <strong>{booking.time}</strong>
        </p>
        <p className="confirmation-banner__detail">
          with <strong>{instructor?.name}</strong>
        </p>
      </div>
      <button className="confirmation-banner__btn" onClick={onReset}>
        Book Another
      </button>
    </div>
  );
}

// ── Main SlotBooking page ──
function SlotBooking() {
  const [selectedInstructorId, setSelectedInstructorId] = useState(null);
  const [selectedDate, setSelectedDate]                 = useState("");
  const [selectedSlotId, setSelectedSlotId]             = useState(null);

  // All confirmed bookings (starts with existing mock data)
  const [allBookings, setAllBookings] = useState(existingBookings);

  // The most recent booking to show in the confirmation banner
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  // Derive which slots are already taken for the current instructor + date
  function isSlotBooked(slotId) {
    return allBookings.some(
      (b) =>
        b.instructorId === selectedInstructorId &&
        b.date === selectedDate &&
        b.slotId === slotId
    );
  }

  // Whether all three selections are made
  const canBook = selectedInstructorId && selectedDate && selectedSlotId;

  function handleBook() {
    if (!canBook) return;
    const slot = timeSlots.find((s) => s.id === selectedSlotId);
    const newBooking = {
      instructorId: selectedInstructorId,
      date: selectedDate,
      slotId: selectedSlotId,
      time: slot.time,
      studentId: studentProfile.id,
    };
    setAllBookings((prev) => [...prev, newBooking]);
    setConfirmedBooking(newBooking);
  }

  function handleReset() {
    setSelectedInstructorId(null);
    setSelectedDate("");
    setSelectedSlotId(null);
    setConfirmedBooking(null);
  }

  // When instructor or date changes, clear the selected slot
  function handleInstructorSelect(id) {
    setSelectedInstructorId(id);
    setSelectedSlotId(null);
  }

  function handleDateChange(e) {
    setSelectedDate(e.target.value);
    setSelectedSlotId(null);
  }

  return (
    <div className="slot-booking">
      {/* Page header */}
      <div className="slot-booking__header">
        <h1 className="slot-booking__title">Book a Driving Slot</h1>
        <p className="slot-booking__subtitle">
          Pick an instructor, choose a date, and select an open time slot.
        </p>
      </div>

      {/* Confirmation banner (shown after booking) */}
      {confirmedBooking && (
        <ConfirmationBanner booking={confirmedBooking} onReset={handleReset} />
      )}

      {/* Main form — hidden after booking to keep things clean */}
      {!confirmedBooking && (
        <div className="slot-booking__form">

          {/* ── Step 1: Choose Instructor ── */}
          <section className="booking-step">
            <div className="booking-step__label">
              <span className="booking-step__number">1</span>
              <h2 className="booking-step__title">Choose an Instructor</h2>
            </div>
            <div className="instructor-grid">
              {instructors.map((inst) => (
                <InstructorCard
                  key={inst.id}
                  instructor={inst}
                  selected={selectedInstructorId === inst.id}
                  onSelect={handleInstructorSelect}
                />
              ))}
            </div>
          </section>

          {/* ── Step 2: Choose Date ── */}
          <section className="booking-step">
            <div className="booking-step__label">
              <span className="booking-step__number">2</span>
              <h2 className="booking-step__title">Select a Date</h2>
            </div>
            <input
              type="date"
              className="date-input"
              value={selectedDate}
              min={getTodayStr()}
              onChange={handleDateChange}
              disabled={!selectedInstructorId}
              aria-label="Select lesson date"
            />
            {!selectedInstructorId && (
              <p className="booking-step__hint">Select an instructor first.</p>
            )}
          </section>

          {/* ── Step 3: Choose Time Slot ── */}
          <section className="booking-step">
            <div className="booking-step__label">
              <span className="booking-step__number">3</span>
              <h2 className="booking-step__title">Pick a Time Slot</h2>
            </div>

            {!selectedDate ? (
              <p className="booking-step__hint">Choose a date to see available slots.</p>
            ) : (
              <div className="slot-grid">
                {timeSlots.map((slot) => (
                  <SlotButton
                    key={slot.id}
                    slot={slot}
                    status={isSlotBooked(slot.id) ? "booked" : "available"}
                    selected={selectedSlotId === slot.id}
                    onSelect={setSelectedSlotId}
                  />
                ))}
              </div>
            )}
          </section>

          {/* ── Booking summary + confirm button ── */}
          <div className="booking-summary">
            <div className="booking-summary__details">
              {selectedInstructorId && (
                <span className="summary-chip">
                  👨‍🏫 {instructors.find((i) => i.id === selectedInstructorId)?.name}
                </span>
              )}
              {selectedDate && (
                <span className="summary-chip">📅 {formatDate(selectedDate)}</span>
              )}
              {selectedSlotId && (
                <span className="summary-chip">
                  🕘 {timeSlots.find((s) => s.id === selectedSlotId)?.time}
                </span>
              )}
            </div>
            <button
              className="booking-summary__btn"
              onClick={handleBook}
              disabled={!canBook}
            >
              Confirm Booking
            </button>
          </div>

        </div>
      )}
    </div>
  );
}

export default SlotBooking;
