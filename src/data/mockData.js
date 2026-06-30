// ============================================================
// mockData.js — Central data models for DriveEase
// Swap these out for real API calls later without touching UI
// ============================================================

// --- Student Profile ---
export const studentProfile = {
  id: "stu_001",
  name: "Aryan Mehta",
  email: "aryan.mehta@email.com",
  phone: "+91 98765 43210",
  enrolledDate: "2024-01-15",
  licenseType: "LMV", // Light Motor Vehicle
  totalLessons: 10,
  completedLessons: 6,
  avatar: "AM", // initials used for avatar placeholder
};

// --- Badges ---
// Awarded based on milestones
export const badges = [
  {
    id: "b1",
    title: "First Drive",
    description: "Completed your very first lesson",
    icon: "🚗",
    earned: true,
  },
  {
    id: "b2",
    title: "Smooth Operator",
    description: "Completed 5 lessons without incident",
    icon: "⭐",
    earned: true,
  },
  {
    id: "b3",
    title: "Halfway There",
    description: "Completed 50% of the curriculum",
    icon: "🏁",
    earned: true,
  },
  {
    id: "b4",
    title: "Highway Hero",
    description: "Complete the Highway Driving module",
    icon: "🛣️",
    earned: false,
  },
  {
    id: "b5",
    title: "Parking Pro",
    description: "Master Parallel & Reverse Parking",
    icon: "🅿️",
    earned: false,
  },
  {
    id: "b6",
    title: "License Ready",
    description: "Pass the Mock Test with 80%+",
    icon: "🏆",
    earned: false,
  },
];

// --- Instructors ---
export const instructors = [
  {
    id: "ins_001",
    name: "Rajesh Kumar",
    specialization: "City Driving & Beginners",
    rating: 4.8,
    experience: "8 years",
    avatar: "RK",
  },
  {
    id: "ins_002",
    name: "Priya Sharma",
    specialization: "Highway & Advanced Driving",
    rating: 4.9,
    experience: "12 years",
    avatar: "PS",
  },
  {
    id: "ins_003",
    name: "Amit Verma",
    specialization: "Parking & Maneuvers",
    rating: 4.7,
    experience: "5 years",
    avatar: "AV",
  },
];

// --- Available Time Slots ---
export const timeSlots = [
  { id: "ts_01", time: "07:00 AM", label: "Early Morning" },
  { id: "ts_02", time: "09:00 AM", label: "Morning" },
  { id: "ts_03", time: "11:00 AM", label: "Late Morning" },
  { id: "ts_04", time: "02:00 PM", label: "Afternoon" },
  { id: "ts_05", time: "04:00 PM", label: "Evening" },
  { id: "ts_06", time: "06:00 PM", label: "Late Evening" },
];

// --- Existing Bookings (pre-booked slots to show as unavailable) ---
export const existingBookings = [
  { instructorId: "ins_001", date: "2025-07-05", slotId: "ts_02" },
  { instructorId: "ins_001", date: "2025-07-05", slotId: "ts_04" },
  { instructorId: "ins_002", date: "2025-07-06", slotId: "ts_01" },
  { instructorId: "ins_003", date: "2025-07-07", slotId: "ts_05" },
];

// --- Upcoming Lessons (for Dashboard alerts) ---
export const upcomingLessons = [
  {
    id: "ul_01",
    instructorId: "ins_001",
    instructorName: "Rajesh Kumar",
    date: "2025-07-05",
    time: "09:00 AM",
    topic: "City Traffic Navigation",
  },
  {
    id: "ul_02",
    instructorId: "ins_002",
    instructorName: "Priya Sharma",
    date: "2025-07-10",
    time: "11:00 AM",
    topic: "Highway Entry & Exit",
  },
];

// --- Curriculum Skills ---
// status: "completed" | "in-progress" | "locked"
export const curriculumModules = [
  {
    id: "mod_01",
    category: "Basics",
    skills: [
      { id: "sk_01", name: "Vehicle Familiarization", status: "completed", description: "Dashboard controls, mirrors, seat adjustment" },
      { id: "sk_02", name: "Starting & Stopping", status: "completed", description: "Ignition, clutch, brake control" },
      { id: "sk_03", name: "Steering Control", status: "completed", description: "Turning, lane keeping, hand position" },
    ],
  },
  {
    id: "mod_02",
    category: "Urban Driving",
    skills: [
      { id: "sk_04", name: "Traffic Signal Rules", status: "completed", description: "Stop, go, yield — reading intersections" },
      { id: "sk_05", name: "Lane Changing", status: "completed", description: "Indicators, blind spot check, merging" },
      { id: "sk_06", name: "Roundabout Navigation", status: "in-progress", description: "Priority rules and safe entry/exit" },
    ],
  },
  {
    id: "mod_03",
    category: "Parking & Maneuvers",
    skills: [
      { id: "sk_07", name: "Parallel Parking", status: "in-progress", description: "Step-by-step reverse parallel parking" },
      { id: "sk_08", name: "Reverse Parking", status: "locked", description: "Bay parking in reverse" },
      { id: "sk_09", name: "3-Point Turn", status: "locked", description: "U-turn in limited space" },
    ],
  },
  {
    id: "mod_04",
    category: "Advanced Driving",
    skills: [
      { id: "sk_10", name: "Highway Driving", status: "locked", description: "High-speed lanes, overtaking, exits" },
      { id: "sk_11", name: "Night Driving", status: "locked", description: "Headlight use, visibility challenges" },
      { id: "sk_12", name: "Adverse Weather", status: "locked", description: "Rain, fog, slippery roads" },
    ],
  },
];

// --- Mock Test Questions ---
export const quizQuestions = [
  {
    id: "q01",
    question: "What does a solid yellow line in the center of the road mean?",
    options: [
      "You may pass if it is safe",
      "No overtaking from either direction",
      "Slow down and proceed",
      "Stop and wait",
    ],
    correct: 1,
    explanation: "A solid yellow center line means no vehicle from either side may cross to overtake.",
  },
  {
    id: "q02",
    question: "At an uncontrolled intersection, who has the right of way?",
    options: [
      "The vehicle on the left",
      "The vehicle on the right",
      "The faster vehicle",
      "The larger vehicle",
    ],
    correct: 1,
    explanation: "At an uncontrolled intersection, always give way to the vehicle approaching from your right.",
  },
  {
    id: "q03",
    question: "What is the maximum speed limit in a residential area unless otherwise posted?",
    options: ["30 km/h", "40 km/h", "50 km/h", "60 km/h"],
    correct: 1,
    explanation: "The default speed limit in residential/urban areas is 40 km/h as per Indian Motor Vehicle rules.",
  },
  {
    id: "q04",
    question: "A flashing red traffic light means:",
    options: [
      "Slow down and proceed",
      "Stop, then go when safe",
      "No entry",
      "Speed up to clear the intersection",
    ],
    correct: 1,
    explanation: "A flashing red light is treated the same as a STOP sign — stop completely, then proceed when safe.",
  },
  {
    id: "q05",
    question: "When should you use hazard lights?",
    options: [
      "When driving in rain",
      "When parked illegally",
      "When your vehicle is stationary and causing an obstruction",
      "When overtaking on the highway",
    ],
    correct: 2,
    explanation: "Hazard lights (all four indicators together) are used to warn others when your stationary vehicle is a hazard.",
  },
  {
    id: "q06",
    question: "What does this sign mean? ⛔",
    options: ["No parking", "No entry", "Stop", "No U-turn"],
    correct: 1,
    explanation: "The red circle with a horizontal bar (⛔) is the universal 'No Entry' sign.",
  },
  {
    id: "q07",
    question: "The safe following distance at 60 km/h is approximately:",
    options: ["1 second", "2 seconds", "3 seconds", "5 seconds"],
    correct: 1,
    explanation: "The 2-second rule is the minimum safe following distance. Increase to 4+ seconds in poor conditions.",
  },
  {
    id: "q08",
    question: "When must you NOT use your horn?",
    options: [
      "To warn a pedestrian",
      "Near a hospital or school between 10 PM and 6 AM",
      "When overtaking",
      "At a blind curve",
    ],
    correct: 1,
    explanation: "Using a horn near hospitals, schools, or courts — especially at night — is prohibited under traffic laws.",
  },
  {
    id: "q09",
    question: "A broken white line in the center of the road means:",
    options: [
      "No overtaking allowed",
      "Lane change permitted when safe",
      "Pedestrian crossing ahead",
      "Road narrows ahead",
    ],
    correct: 1,
    explanation: "A broken (dashed) white center line means you may cross it to overtake when it is safe to do so.",
  },
  {
    id: "q10",
    question: "What should you do immediately after a tyre blowout at highway speed?",
    options: [
      "Brake hard immediately",
      "Steer sharply to the side",
      "Hold the wheel firmly and ease off the accelerator gradually",
      "Accelerate to maintain control",
    ],
    correct: 2,
    explanation: "Sudden braking or steering can cause a rollover. Grip the wheel, ease off gas, and let the car slow naturally.",
  },
];
