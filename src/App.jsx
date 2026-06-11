import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Home", "About", "Skills", "Projects", "Contact"];

const SKILLS = [
  { name: "JavaScript", level: 75, icon: "⚡" },
  { name: "HTML / CSS", level: 90, icon: "🎨" },
  { name: "React", level: 60, icon: "⚛️" },
  { name: "Java", level: 70, icon: "☕" },
  { name: "C / C++", level: 65, icon: "⚙️" },
  { name: "SQL", level: 72, icon: "🗄️" },
  { name: "Kotlin", level: 50, icon: "📱" },
  { name: "Flutter", level: 45, icon: "🦋" },
];

const PROJECTS = [
  {
    title: "Weather App",
    desc: "Real-time weather data using OpenWeather API. Search any city and get current conditions.",
    tags: ["JavaScript", "API", "CSS"],
    emoji: "🌤️",
    color: "#3b82f6",
    link: "#",
  },
  {
    title: "Task Manager",
    desc: "Full-featured to-do app with drag & drop, categories, and local storage persistence.",
    tags: ["React", "CSS", "LocalStorage"],
    emoji: "✅",
    color: "#10b981",
    link: "#",
  },
  {
    title: "Portfolio Site",
    desc: "This portfolio — built from scratch with React, smooth animations, and dark mode design.",
    tags: ["React", "CSS", "Design"],
    emoji: "🚀",
    color: "#8b5cf6",
    link: "#",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function SkillBar({ name, level, icon, delay }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{ marginBottom: "1.4rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
        <span style={{ color: "#e2e8f0", fontFamily: "'Space Mono', monospace", fontSize: "0.9rem" }}>
          {icon} {name}
        </span>
        <span style={{ color: "#94a3b8", fontSize: "0.8rem", fontFamily: "'Space Mono', monospace" }}>
          {level}%
        </span>
      </div>
      <div style={{
        height: "6px", background: "#1e293b", borderRadius: "999px", overflow: "hidden"
      }}>
        <div style={{
          height: "100%",
          width: inView ? `${level}%` : "0%",
          background: "linear-gradient(90deg, #6366f1, #a78bfa)",
          borderRadius: "999px",
          transition: `width 1s ease ${delay}ms`,
          boxShadow: inView ? "0 0 12px #6366f188" : "none",
        }} />
      </div>
    </div>
  );
}

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#16213e" : "#0f172a",
        border: `1px solid ${hovered ? project.color + "88" : "#1e293b"}`,
        borderRadius: "16px",
        padding: "2rem",
        cursor: "pointer",
        transition: "all 0.3s ease",
        transform: inView ? (hovered ? "translateY(-6px)" : "translateY(0)") : "translateY(30px)",
        opacity: inView ? 1 : 0,
        transitionDelay: `${index * 120}ms`,
        boxShadow: hovered ? `0 20px 40px ${project.color}22` : "none",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{
        position: "absolute", top: 0, right: 0, width: "120px", height: "120px",
        background: `radial-gradient(circle at top right, ${project.color}22, transparent 70%)`,
        borderRadius: "0 16px 0 0",
      }} />
      <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{project.emoji}</div>
      <h3 style={{
        color: "#f1f5f9", fontFamily: "'Syne', sans-serif",
        fontSize: "1.25rem", marginBottom: "0.6rem", fontWeight: 700
      }}>
        {project.title}
      </h3>
      <p style={{ color: "#94a3b8", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "1.2rem" }}>
        {project.desc}
      </p>
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        {project.tags.map(tag => (
          <span key={tag} style={{
            background: project.color + "22",
            color: project.color,
            border: `1px solid ${project.color}44`,
            borderRadius: "999px",
            padding: "0.2rem 0.75rem",
            fontSize: "0.75rem",
            fontFamily: "'Space Mono', monospace",
          }}>{tag}</span>
        ))}
      </div>
      <div style={{
        marginTop: "1.4rem",
        color: project.color,
        fontSize: "0.85rem",
        fontFamily: "'Space Mono', monospace",
        opacity: hovered ? 1 : 0,
        transform: hovered ? "translateX(0)" : "translateX(-8px)",
        transition: "all 0.3s ease",
      }}>
        View on GitHub →
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState("Home");
  const [scrolled, setScrolled] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const roles = ["Software Engineer", "Frontend Developer", "Mobile Developer", "Problem Solver"];
  const roleIndex = useRef(0);
  const charIndex = useRef(0);
  const deleting = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentRole = roles[roleIndex.current];
      if (!deleting.current) {
        setTypedText(currentRole.slice(0, charIndex.current + 1));
        charIndex.current++;
        if (charIndex.current === currentRole.length) {
          deleting.current = true;
          clearInterval(interval);
          setTimeout(() => {
            const del = setInterval(() => {
              setTypedText(prev => {
                if (prev.length <= 1) {
                  clearInterval(del);
                  deleting.current = false;
                  roleIndex.current = (roleIndex.current + 1) % roles.length;
                  charIndex.current = 0;
                  return "";
                }
                return prev.slice(0, -1);
              });
            }, 50);
          }, 1200);
        }
      }
    }, 80);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    setActive(id);
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = () => {
    if (!formData.name || !formData.email || !formData.message) return;
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setFormData({ name: "", email: "", message: "" });
  };

  const [aboutRef, aboutInView] = useInView();
  const [skillsRef, skillsInView] = useInView();
  const [contactRef, contactInView] = useInView();

  const inputStyle = {
    width: "100%",
    background: "#0f172a",
    border: "1px solid #1e293b",
    borderRadius: "10px",
    padding: "0.85rem 1rem",
    color: "#e2e8f0",
    fontSize: "0.95rem",
    fontFamily: "'Space Mono', monospace",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Space+Mono:wght@400;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: #060b14; color: #e2e8f0; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #060b14; }
        ::-webkit-scrollbar-thumb { background: #6366f1; border-radius: 999px; }
        .nav-link:hover { color: #a78bfa !important; }
        .contact-input:focus { border-color: #6366f1 !important; box-shadow: 0 0 0 3px #6366f122; }
        .send-btn:hover { background: #7c3aed !important; transform: translateY(-2px); }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes grain {
          0%, 100% { transform: translate(0,0); }
          10% { transform: translate(-2%,-3%); }
          30% { transform: translate(2%,3%); }
          50% { transform: translate(-1%,2%); }
          70% { transform: translate(3%,-1%); }
          90% { transform: translate(-3%,1%); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 0.8; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Noise overlay */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
        opacity: 0.5,
        animation: "grain 8s steps(10) infinite",
      }} />

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "1rem 2rem",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        background: scrolled ? "rgba(6,11,20,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid #1e293b88" : "none",
        transition: "all 0.4s ease",
      }}>
        <div style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.3rem",
          color: "#a78bfa", letterSpacing: "-0.5px"
        }}>
          B<span style={{ color: "#6366f1" }}>.</span>
        </div>
        <div style={{ display: "flex", gap: "2rem" }}>
          {NAV_LINKS.map(link => (
            <button
              key={link}
              className="nav-link"
              onClick={() => scrollTo(link)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                color: active === link ? "#a78bfa" : "#64748b",
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.8rem",
                letterSpacing: "0.05em",
                transition: "color 0.2s",
                fontWeight: active === link ? 700 : 400,
              }}
            >
              {link}
            </button>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section id="home" style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        justifyContent: "center", flexDirection: "column", textAlign: "center",
        padding: "2rem", position: "relative", overflow: "hidden",
      }}>
        {/* Background glow blobs */}
        <div style={{
          position: "absolute", top: "20%", left: "10%",
          width: "400px", height: "400px",
          background: "radial-gradient(circle, #6366f133 0%, transparent 70%)",
          borderRadius: "50%", filter: "blur(60px)",
          animation: "float 6s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", bottom: "15%", right: "8%",
          width: "300px", height: "300px",
          background: "radial-gradient(circle, #8b5cf633 0%, transparent 70%)",
          borderRadius: "50%", filter: "blur(60px)",
          animation: "float 8s ease-in-out infinite reverse",
        }} />

        <div style={{
          position: "relative", zIndex: 1,
          animation: "fadeSlideUp 1s ease both",
        }}>
          {/* Avatar ring */}
          <div style={{ position: "relative", display: "inline-block", marginBottom: "2rem" }}>
            <div style={{
              position: "absolute", inset: "-8px", borderRadius: "50%",
              border: "2px solid #6366f144",
              animation: "pulse-ring 2.5s ease-out infinite",
            }} />
            <div style={{
              width: "100px", height: "100px", borderRadius: "50%",
              background: "linear-gradient(135deg, #6366f1, #a78bfa)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "2.5rem", fontFamily: "'Syne', sans-serif",
              color: "white", fontWeight: 800,
              boxShadow: "0 0 40px #6366f155",
            }}>
              Б
            </div>
          </div>

          <div style={{
            fontFamily: "'Space Mono', monospace", color: "#6366f1",
            fontSize: "0.85rem", marginBottom: "1rem", letterSpacing: "0.2em",
          }}>
            👋 Сайн байна уу
          </div>

          <h1 style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800,
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            lineHeight: 1.1, marginBottom: "1rem",
            background: "linear-gradient(135deg, #f1f5f9 0%, #94a3b8 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            letterSpacing: "-1px",
          }}>
            Батбаяр
          </h1>

          <div style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
            color: "#6366f1", marginBottom: "1.5rem",
            minHeight: "2rem",
          }}>
            {typedText}<span style={{
              display: "inline-block", width: "2px", height: "1.2em",
              background: "#a78bfa", marginLeft: "2px",
              animation: "pulse-ring 0.8s ease-in-out infinite",
              verticalAlign: "middle",
            }} />
          </div>

          <p style={{
            color: "#64748b", maxWidth: "480px", margin: "0 auto 2.5rem",
            lineHeight: 1.7, fontSize: "0.95rem",
          }}>
            МУИС-ийн 2025 оны Software Engineering төгсөгч. Web, Mobile, Frontend хөгжүүлэлтэнд сонирхолтой, хэрэглэгчдэд ээлтэй дизайн хийхийг эрхэмлэдэг. Одоогоор JavaScript, React-г гүнзгийрүүлэн судалж, бодит төслүүд дээр ажиллахыг хүсэж байна.
          </p>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => scrollTo("Projects")}
              style={{
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                color: "white", border: "none", borderRadius: "999px",
                padding: "0.85rem 2rem", fontFamily: "'Space Mono', monospace",
                fontSize: "0.85rem", cursor: "pointer",
                boxShadow: "0 0 30px #6366f144",
                transition: "all 0.3s ease",
              }}
            >
              Projects харах →
            </button>
            <button
              onClick={() => scrollTo("Contact")}
              style={{
                background: "transparent",
                color: "#a78bfa", border: "1px solid #6366f144", borderRadius: "999px",
                padding: "0.85rem 2rem", fontFamily: "'Space Mono', monospace",
                fontSize: "0.85rem", cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              Холбоо барих
            </button>
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{
          position: "absolute", bottom: "2rem",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem",
          color: "#334155", fontFamily: "'Space Mono', monospace", fontSize: "0.7rem",
          animation: "float 2s ease-in-out infinite",
        }}>
          <span>scroll</span>
          <span>↓</span>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "6rem 2rem", maxWidth: "900px", margin: "0 auto" }}>
        <div
          ref={aboutRef}
          style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center",
            opacity: aboutInView ? 1 : 0,
            transform: aboutInView ? "translateY(0)" : "translateY(40px)",
            transition: "all 0.8s ease",
          }}
        >
          <div>
            <div style={{
              fontFamily: "'Space Mono', monospace", color: "#6366f1",
              fontSize: "0.75rem", letterSpacing: "0.2em", marginBottom: "0.8rem"
            }}>
              01 / ABOUT ME
            </div>
            <h2 style={{
              fontFamily: "'Syne', sans-serif", fontWeight: 800,
              fontSize: "2.2rem", color: "#f1f5f9", marginBottom: "1.5rem",
              lineHeight: 1.2,
            }}>
              Намайн тухай
            </h2>
            <p style={{ color: "#94a3b8", lineHeight: 1.8, marginBottom: "1rem", fontSize: "0.95rem" }}>
              Би Монголын Үндэсний Их Сургуулийг 2025 онд Software Engineering-аар төгссөн. Web болон Mobile хөгжүүлэлтэнд хүсэл тэмүүлэлтэй бөгөөд цэвэр, хэрэглэгчдэд тохиромжтой бүтээгдэхүүн хийхийг зорьдог.
            </p>
            <p style={{ color: "#64748b", lineHeight: 1.8, fontSize: "0.9rem" }}>
              Одоо JavaScript, React-г гүнзгийрүүлэн судалж, LeetCode-р алгоритмын дасгал хийж байна. Ирэх зорилго — бодит төслүүд хийж, хамтарч ажиллах.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              { label: "Их сургууль", value: "МУИС — МХТС", icon: "🎓" },
              { label: "Мэргэжил", value: "Software Engineering", icon: "💻" },
              { label: "Байршил", value: "Улаанбаатар, Монгол", icon: "📍" },
              { label: "Хэл", value: "Монгол, Англи", icon: "🌐" },
            ].map(item => (
              <div key={item.label} style={{
                background: "#0f172a", border: "1px solid #1e293b",
                borderRadius: "12px", padding: "1rem 1.2rem",
                display: "flex", alignItems: "center", gap: "1rem",
              }}>
                <span style={{ fontSize: "1.3rem" }}>{item.icon}</span>
                <div>
                  <div style={{ color: "#475569", fontSize: "0.72rem", fontFamily: "'Space Mono', monospace" }}>{item.label}</div>
                  <div style={{ color: "#e2e8f0", fontSize: "0.9rem", fontWeight: 600 }}>{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ padding: "5rem 2rem", background: "#080d18" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <div ref={skillsRef} style={{
            opacity: skillsInView ? 1 : 0,
            transform: skillsInView ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.7s ease",
          }}>
            <div style={{
              fontFamily: "'Space Mono', monospace", color: "#6366f1",
              fontSize: "0.75rem", letterSpacing: "0.2em", marginBottom: "0.8rem", textAlign: "center"
            }}>
              02 / SKILLS
            </div>
            <h2 style={{
              fontFamily: "'Syne', sans-serif", fontWeight: 800,
              fontSize: "2.2rem", color: "#f1f5f9", marginBottom: "3rem",
              textAlign: "center",
            }}>
              Технологиуд
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 3rem" }}>
            {SKILLS.map((skill, i) => (
              <SkillBar key={skill.name} {...skill} delay={i * 100} />
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <div style={{
              fontFamily: "'Space Mono', monospace", color: "#6366f1",
              fontSize: "0.75rem", letterSpacing: "0.2em", marginBottom: "0.8rem"
            }}>
              03 / PROJECTS
            </div>
            <h2 style={{
              fontFamily: "'Syne', sans-serif", fontWeight: 800,
              fontSize: "2.2rem", color: "#f1f5f9",
            }}>
              Бүтээлүүд
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {PROJECTS.map((p, i) => (
              <ProjectCard key={p.title} project={p} index={i} />
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <a href="https://github.com/" target="_blank" rel="noreferrer" style={{
              fontFamily: "'Space Mono', monospace", color: "#6366f1",
              fontSize: "0.85rem", textDecoration: "none",
              borderBottom: "1px solid #6366f144", paddingBottom: "2px",
              transition: "color 0.2s",
            }}>
              GitHub дээр бүгдийг харах →
            </a>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "5rem 2rem", background: "#080d18" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto" }}>
          <div ref={contactRef} style={{
            opacity: contactInView ? 1 : 0,
            transform: contactInView ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.7s ease",
          }}>
            <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
              <div style={{
                fontFamily: "'Space Mono', monospace", color: "#6366f1",
                fontSize: "0.75rem", letterSpacing: "0.2em", marginBottom: "0.8rem"
              }}>
                04 / CONTACT
              </div>
              <h2 style={{
                fontFamily: "'Syne', sans-serif", fontWeight: 800,
                fontSize: "2.2rem", color: "#f1f5f9", marginBottom: "0.8rem",
              }}>
                Холбоо барих
              </h2>
              <p style={{ color: "#64748b", fontSize: "0.9rem" }}>
                Ажлын санал, асуулт, хамтын ажиллагааны тухай мессеж илгээгээрэй.
              </p>
            </div>

            {sent ? (
              <div style={{
                textAlign: "center", padding: "3rem",
                background: "#0f2a1a", border: "1px solid #10b98144",
                borderRadius: "16px", color: "#10b981",
                fontFamily: "'Space Mono', monospace",
              }}>
                ✅ Мессеж илгээгдлээ! Удахгүй хариулна.
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <input
                  className="contact-input"
                  placeholder="Нэр"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  style={inputStyle}
                />
                <input
                  className="contact-input"
                  placeholder="И-мэйл"
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  style={inputStyle}
                />
                <textarea
                  className="contact-input"
                  placeholder="Мессеж..."
                  rows={5}
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  style={{ ...inputStyle, resize: "vertical" }}
                />
                <button
                  className="send-btn"
                  onClick={handleSend}
                  style={{
                    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                    color: "white", border: "none", borderRadius: "999px",
                    padding: "1rem", fontFamily: "'Space Mono', monospace",
                    fontSize: "0.9rem", cursor: "pointer",
                    boxShadow: "0 0 30px #6366f133",
                    transition: "all 0.3s ease",
                  }}
                >
                  Илгээх →
                </button>
              </div>
            )}

            <div style={{
              display: "flex", justifyContent: "center", gap: "1.5rem",
              marginTop: "2.5rem",
            }}>
              {["GitHub", "LinkedIn", "Email"].map(s => (
                <a key={s} href="#" style={{
                  color: "#475569", fontFamily: "'Space Mono', monospace",
                  fontSize: "0.75rem", textDecoration: "none",
                  transition: "color 0.2s",
                }}
                  onMouseEnter={e => e.target.style.color = "#a78bfa"}
                  onMouseLeave={e => e.target.style.color = "#475569"}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        textAlign: "center", padding: "2rem",
        color: "#1e293b", fontFamily: "'Space Mono', monospace", fontSize: "0.75rem",
        borderTop: "1px solid #0f172a",
      }}>
        © 2025 Батбаяр · Built with React
      </footer>
    </>
  );
}
