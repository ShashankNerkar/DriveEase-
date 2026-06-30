import "./About.css";

// ── Static data ─────────────────────────────────────────────

const stats = [
  { value: "10+",   label: "Years of Experience",       icon: "🏛️" },
  { value: "15+",   label: "Certified Instructors",     icon: "👨‍🏫" },
  { value: "5,000+",label: "Happy Licensed Drivers",    icon: "🎉" },
  { value: "98%",   label: "RTO First-Attempt Pass Rate", icon: "✅" },
];

const team = [
  {
    avatar: "RK",
    name: "Rajesh Kumar",
    role: "Senior Instructor · 8 yrs",
    specialization: "City Driving & Beginners",
  },
  {
    avatar: "PS",
    name: "Priya Sharma",
    role: "Lead Instructor · 12 yrs",
    specialization: "Highway & Advanced Driving",
  },
  {
    avatar: "AV",
    name: "Amit Verma",
    role: "Instructor · 5 yrs",
    specialization: "Parking & Maneuvers",
  },
];

const testimonials = [
  {
    id: "t1",
    name: "Sneha Patil",
    city: "Pune",
    rating: 5,
    avatar: "SP",
    text: "I was a complete beginner with zero confidence behind the wheel. Rajesh sir's patience was extraordinary — he never made me feel rushed. After just 8 sessions, I cleared my RTO test on the first attempt. The slot flexibility was a game-changer for me since I work full-time.",
  },
  {
    id: "t2",
    name: "Karan Joshi",
    city: "Mumbai",
    rating: 5,
    avatar: "KJ",
    text: "What sets DriveEase apart is how seriously they take the theory side. The mock test section on their app prepared me for every curveball at the RTO. Priya ma'am walked me through highway merging with a calm authority I've rarely seen. Worth every rupee.",
  },
  {
    id: "t3",
    name: "Divya Nair",
    city: "Thane",
    rating: 5,
    avatar: "DN",
    text: "As a working mother, finding a driving school that works around my schedule felt impossible. DriveEase let me book early morning slots with zero hassle. Amit sir's step-by-step approach to parallel parking — something I dreaded — made it feel completely manageable. I passed my test in under 3 weeks.",
  },
  {
    id: "t4",
    name: "Rohit Deshmukh",
    city: "Nashik",
    rating: 5,
    avatar: "RD",
    text: "I had failed my driving test once before joining DriveEase, so I was quite anxious. The structured curriculum meant I could track exactly where I was improving. By the time I reached the highway driving module, I genuinely enjoyed driving. The 98% pass rate they advertise is not just a number — I lived it.",
  },
  {
    id: "t5",
    name: "Ananya Rao",
    city: "Mumbai",
    rating: 5,
    avatar: "AR",
    text: "The DriveEase app's dashboard kept me motivated throughout the course. Seeing badges unlock and skills move from 'locked' to 'completed' felt rewarding. More importantly, every instructor here treats students with genuine respect. I now drive daily in city traffic with complete confidence. Highly recommend to anyone nervous about learning.",
  },
];

// ── Sub-component: star rating display ──
function StarRating({ count }) {
  return (
    <div className="star-rating" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < count ? "star star--filled" : "star"} aria-hidden="true">
          ★
        </span>
      ))}
    </div>
  );
}

// ── Sub-component: testimonial card ──
function TestimonialCard({ testimonial }) {
  const { name, city, rating, avatar, text } = testimonial;
  return (
    <div className="testimonial-card">
      <div className="testimonial-card__quote-mark" aria-hidden="true">"</div>
      <p className="testimonial-card__text">{text}</p>
      <div className="testimonial-card__footer">
        <div className="testimonial-card__avatar">{avatar}</div>
        <div className="testimonial-card__author">
          <p className="testimonial-card__name">{name}</p>
          <p className="testimonial-card__city">📍 {city}</p>
        </div>
        <StarRating count={rating} />
      </div>
    </div>
  );
}

// ── Sub-component: team member card ──
function TeamCard({ member }) {
  const { avatar, name, role, specialization } = member;
  return (
    <div className="team-card">
      <div className="team-card__avatar">{avatar}</div>
      <p className="team-card__name">{name}</p>
      <p className="team-card__role">{role}</p>
      <span className="team-card__spec">{specialization}</span>
    </div>
  );
}

// ── Main About page ──
function About() {
  return (
    <div className="about-page">

      {/* ── Hero ── */}
      <section className="about-hero">
        <div className="about-hero__content">
          <span className="about-hero__eyebrow">🚗 Est. 2015 · Mumbai, India</span>
          <h1 className="about-hero__title">
            Driving Confidence,<br />
            <span className="about-hero__title-accent">One Lesson at a Time</span>
          </h1>
          <p className="about-hero__desc">
            DriveEase was founded with a single belief: learning to drive should feel
            empowering, not stressful. Over a decade, we've helped more than 5,000 students
            earn their licences with patient instructors, flexible scheduling, and a
            curriculum built around real Indian road conditions.
          </p>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <section className="about-stats">
        {stats.map((stat, i) => (
          <div key={i} className="stat-tile">
            <span className="stat-tile__icon" aria-hidden="true">{stat.icon}</span>
            <p className="stat-tile__value">{stat.value}</p>
            <p className="stat-tile__label">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* ── Our Story ── */}
      <section className="about-section">
        <div className="about-section__label">Our Story</div>
        <h2 className="about-section__title">A Decade of Trust on Indian Roads</h2>
        <div className="about-story">
          <p>
            DriveEase began in 2015 when founder <strong>Rajan Mehta</strong> — a former
            RTO examiner with 20 years of experience — noticed that most driving schools
            focused on passing tests rather than building genuine road competence. He set
            out to change that.
          </p>
          <p>
            Today, our team of 15+ certified instructors delivers structured, progressive
            lessons across city driving, highway navigation, and advanced maneuvers. Every
            instructor undergoes a rigorous 6-month training programme before taking their
            first student — because we believe the quality of teaching directly shapes road
            safety outcomes for everyone.
          </p>
          <p>
            Our curriculum is fully aligned with the Motor Vehicles Act 1988 and Central
            Motor Vehicles Rules 1989, and is regularly updated to reflect amendments. The
            DriveEase app makes it easy for students to track their progress, book flexible
            slots, and prepare for the RTO theory test — all in one place.
          </p>
        </div>
      </section>

      {/* ── Meet the Team ── */}
      <section className="about-section">
        <div className="about-section__label">The Team</div>
        <h2 className="about-section__title">Meet Your Instructors</h2>
        <div className="team-grid">
          {team.map((member, i) => (
            <TeamCard key={i} member={member} />
          ))}
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="about-section">
        <div className="about-section__label">Student Reviews</div>
        <h2 className="about-section__title">What Our Students Say</h2>
        <p className="about-section__subtitle">
          Real experiences from students who went from nervous beginners to confident,
          licensed drivers on Indian roads.
        </p>
        <div className="testimonial-grid">
          {testimonials.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>
      </section>

      {/* ── CTA strip ── */}
      <section className="about-cta">
        <div className="about-cta__content">
          <h2 className="about-cta__title">Ready to Start Your Journey?</h2>
          <p className="about-cta__desc">
            Join 5,000+ licensed drivers who trusted DriveEase to get them road-ready.
          </p>
        </div>
        <a href="/sign-up" className="about-cta__btn">
          Register Today →
        </a>
      </section>

    </div>
  );
}

export default About;
