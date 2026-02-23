import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const LOGO = "data:image/jpeg;base64,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";

const SUPABASE_URL = "https://neuqtxqgobqayljgrtgv.supabase.co";
const SUPABASE_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ldXF0eHFnb2JxYXlsamdydGd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1ODU0MzQsImV4cCI6MjA4NzE2MTQzNH0.jMRG0kk_UMhrRQOjD4-H8L-IZ4gbk1Bdm5kaWvNyEf4";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);

const ADMIN_CODE = "YHS@2025";

const SEED_ELECTIONS = [
  { id: "e1", title: "Head Boy", description: "Choose the Head Boy who will serve as the top male student leader.", status: "active", start_date: "2025-02-01", end_date: "2025-02-28" },
  { id: "e2", title: "Head Girl", description: "Choose the Head Girl who will lead with grace and represent the school.", status: "active", start_date: "2025-02-01", end_date: "2025-02-28" },
  { id: "e3", title: "Assistant Head Boy", description: "Elect the Assistant Head Boy to support the Head Boy.", status: "active", start_date: "2025-02-01", end_date: "2025-02-28" },
  { id: "e4", title: "Assistant Head Girl", description: "Elect the Assistant Head Girl to support the Head Girl.", status: "active", start_date: "2025-02-01", end_date: "2025-02-28" },
  { id: "e5", title: "Sport Prefect", description: "Vote for the student who will organize all sporting activities.", status: "active", start_date: "2025-02-01", end_date: "2025-02-28" },
  { id: "e6", title: "Chapel Prefect", description: "Elect the student who will lead chapel services.", status: "active", start_date: "2025-02-01", end_date: "2025-02-28" },
  { id: "e7", title: "Library Prefect", description: "Vote for the student who will maintain the school library.", status: "active", start_date: "2025-02-01", end_date: "2025-02-28" },
  { id: "e8", title: "Labour Prefect", description: "Elect the student who will coordinate school labour activities.", status: "active", start_date: "2025-02-01", end_date: "2025-02-28" },
  { id: "e9", title: "Health Prefect", description: "Vote for the student who will promote health awareness.", status: "active", start_date: "2025-02-01", end_date: "2025-02-28" },
  { id: "e10", title: "Dining Hall Prefect", description: "Elect the student who will maintain order in the dining hall.", status: "active", start_date: "2025-02-01", end_date: "2025-02-28" },
  { id: "e11", title: "Laboratory Prefect", description: "Vote for the student who will oversee the science laboratory.", status: "active", start_date: "2025-02-01", end_date: "2025-02-28" },
  { id: "e12", title: "Social Prefect", description: "Elect the student who will plan and manage school social events.", status: "active", start_date: "2025-02-01", end_date: "2025-02-28" },
];

const SEED_CANDIDATES = [
  { id: "c1", election_id: "e1", name: "Emmanuel Chukwu", bio: "Academic excellence with a heart for servant leadership.", emoji: "👑" },
  { id: "c2", election_id: "e1", name: "David Okonkwo", bio: "Disciplined, respectful, and committed to school values.", emoji: "🏆" },
  { id: "c3", election_id: "e1", name: "Joshua Adeyemi", bio: "Passionate about unity, excellence and representing students.", emoji: "⭐" },
  { id: "c4", election_id: "e2", name: "Chidinma Eze", bio: "A natural leader with a strong academic record.", emoji: "👸" },
  { id: "c5", election_id: "e2", name: "Esther Adeleke", bio: "Passionate about empowering fellow students.", emoji: "🌟" },
  { id: "c6", election_id: "e2", name: "Favour Nwosu", bio: "Dedicated to creating a positive school environment.", emoji: "🌺" },
  { id: "c7", election_id: "e3", name: "Michael Ibe", bio: "Responsible, hardworking and always ready to serve.", emoji: "🎖️" },
  { id: "c8", election_id: "e3", name: "Samuel Balogun", bio: "Known for calm leadership and dedication.", emoji: "💪" },
  { id: "c9", election_id: "e4", name: "Adaeze Okafor", bio: "Compassionate and organized, always putting students first.", emoji: "💎" },
  { id: "c10", election_id: "e4", name: "Ruth Olawale", bio: "Confident leader with a strong sense of duty.", emoji: "🌸" },
  { id: "c11", election_id: "e5", name: "Tunde Afolabi", bio: "Football captain with a passion for school sports.", emoji: "⚽" },
  { id: "c12", election_id: "e5", name: "Amara Diallo", bio: "Athletics champion promoting fitness and team spirit.", emoji: "🏃" },
  { id: "c13", election_id: "e5", name: "Kelechi Ibe", bio: "Committed to expanding school sports programs.", emoji: "🏅" },
  { id: "c14", election_id: "e6", name: "Daniel Obiora", bio: "Deeply spiritual and committed to meaningful worship.", emoji: "✝️" },
  { id: "c15", election_id: "e6", name: "Peace Ugwu", bio: "Passionate about prayer, faith and godly school culture.", emoji: "🙏" },
  { id: "c16", election_id: "e6", name: "Philip Osei", bio: "Dedicated to inspiring students through scripture.", emoji: "📖" },
  { id: "c17", election_id: "e7", name: "Adaora Nwachukwu", bio: "Book lover and advocate for an accessible library.", emoji: "📚" },
  { id: "c18", election_id: "e7", name: "Timilehin Ojo", bio: "Committed to encouraging reading habits.", emoji: "📖" },
  { id: "c19", election_id: "e8", name: "Chukwuemeka Eze", bio: "Hardworking and disciplined, committed to cleanliness.", emoji: "🧹" },
  { id: "c20", election_id: "e8", name: "Blessing Okafor", bio: "Passionate about environmental cleanliness.", emoji: "🌿" },
  { id: "c21", election_id: "e8", name: "Ifeanyi Dike", bio: "Energetic leader ensuring smooth labour activities.", emoji: "💪" },
  { id: "c22", election_id: "e9", name: "Ngozi Eze", bio: "Aspiring nurse dedicated to student health.", emoji: "🏥" },
  { id: "c23", election_id: "e9", name: "Aaron Mensah", bio: "Committed to promoting hygiene and healthy habits.", emoji: "💊" },
  { id: "c24", election_id: "e10", name: "Tobi Adegoke", bio: "Organized and fair, committed to an orderly dining hall.", emoji: "🍽️" },
  { id: "c25", election_id: "e10", name: "Sandra Nwosu", bio: "Passionate about food hygiene and student welfare.", emoji: "🥗" },
  { id: "c26", election_id: "e10", name: "Felix Okonkwo", bio: "Enthusiastic about improving dining standards.", emoji: "🍛" },
  { id: "c27", election_id: "e11", name: "Chisom Nweke", bio: "Science enthusiast committed to lab safety.", emoji: "🔬" },
  { id: "c28", election_id: "e11", name: "Victor Obi", bio: "Dedicated to maintaining a safe laboratory.", emoji: "⚗️" },
  { id: "c29", election_id: "e12", name: "Nkechi Osu", bio: "Creative event planner with great social skills.", emoji: "🎉" },
  { id: "c30", election_id: "e12", name: "Femi Balogun", bio: "Energetic and outgoing, always bringing people together.", emoji: "🎊" },
  { id: "c31", election_id: "e12", name: "Zara Musa", bio: "Innovative thinker passionate about memorable events.", emoji: "✨" },
];

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #f7f8fc;
    --surface: #ffffff;
    --surface-hover: #f0f2f8;
    --border: #e2e6f0;
    --border-bright: #c8d0e8;
    --red-school: #8b1a1a;
    --red-dim: rgba(139,26,26,0.1);
    --red-glow: rgba(139,26,26,0.25);
    --gold: #8b1a1a;
    --gold-dim: rgba(139,26,26,0.08);
    --gold-glow: rgba(139,26,26,0.2);
    --green: #16a34a;
    --green-dim: rgba(22,163,74,0.1);
    --red: #dc2626;
    --blue: #2563eb;
    --text: #1a1a2e;
    --text-dim: #4a5568;
    --text-faint: #a0aec0;
    --radius: 16px;
    --radius-sm: 10px;
    --shadow: 0 4px 24px rgba(0,0,0,0.08);
  }
  body { background: var(--bg); }
  .app { min-height: 100vh; background: var(--bg); color: var(--text); font-family: 'DM Sans', sans-serif; position: relative; overflow-x: hidden; display: flex; flex-direction: column; }
  .app::before { content: ''; position: fixed; top: -40%; left: -20%; width: 80%; height: 80%; background: radial-gradient(ellipse, rgba(139,26,26,0.04) 0%, transparent 70%); pointer-events: none; z-index: 0; }
  .app::after { content: ''; position: fixed; bottom: -30%; right: -20%; width: 70%; height: 70%; background: radial-gradient(ellipse, rgba(139,26,26,0.03) 0%, transparent 70%); pointer-events: none; z-index: 0; }

  /* HEADER */
  .header { position: sticky; top: 0; z-index: 100; background: rgba(247,248,252,0.95); backdrop-filter: blur(20px); border-bottom: 1px solid var(--border); padding: 0 32px; box-shadow: 0 2px 12px rgba(0,0,0,0.06); }
  .header-inner { max-width: 1200px; margin: 0 auto; height: 68px; display: flex; align-items: center; justify-content: space-between; }
  .logo { display: flex; align-items: center; gap: 12px; cursor: pointer; }
  .logo-crest { width: 44px; height: 44px; border-radius: 50%; overflow: hidden; flex-shrink: 0; border: 2px solid var(--border); box-shadow: 0 2px 8px var(--gold-glow); }
  .logo-crest img { width: 100%; height: 100%; object-fit: cover; }
  .logo-text { font-family: 'Playfair Display', serif; font-size: 15px; font-weight: 700; color: var(--text); line-height: 1.2; }
  .logo-sub { font-family: 'DM Mono', monospace; font-size: 9px; color: var(--gold); letter-spacing: 2px; text-transform: uppercase; display: block; }
  .nav { display: flex; gap: 4px; align-items: center; }
  .nav-btn { background: none; border: none; color: var(--text-dim); padding: 8px 14px; border-radius: 8px; cursor: pointer; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; transition: all 0.2s; }
  .nav-btn:hover { background: var(--red-dim); color: var(--gold); }
  .nav-btn-accent { background: var(--gold-dim); color: var(--gold); border: 1px solid rgba(139,26,26,0.2); }
  .nav-btn-accent:hover { background: rgba(139,26,26,0.15); color: var(--gold); }

  /* MAIN */
  .main { width: 100%; max-width: 800px; margin: 0 auto; padding: 48px 32px; position: relative; z-index: 1; flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; }

  /* WELCOME PAGE */
  .welcome-page { text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; }
  .school-crest-big { width: 140px; height: 140px; border-radius: 50%; overflow: hidden; margin: 0 auto 28px; border: 4px solid var(--gold); box-shadow: 0 0 40px var(--gold-glow), 0 8px 32px rgba(0,0,0,0.12); animation: crestGlow 3s ease-in-out infinite; }
  .school-crest-big img { width: 100%; height: 100%; object-fit: cover; }
  @keyframes crestGlow { 0%,100%{ box-shadow: 0 0 30px var(--gold-glow), 0 8px 32px rgba(0,0,0,0.12); } 50%{ box-shadow: 0 0 60px rgba(139,26,26,0.35), 0 8px 32px rgba(0,0,0,0.15); } }
  .school-name-big { font-family: 'Playfair Display', serif; font-size: clamp(28px, 5vw, 48px); font-weight: 900; color: var(--gold); margin-bottom: 8px; letter-spacing: -1px; }
  .school-tag { font-family: 'DM Mono', monospace; font-size: 12px; color: var(--text-dim); letter-spacing: 3px; text-transform: uppercase; margin-bottom: 16px; display: block; }
  .welcome-divider { width: 60px; height: 3px; background: linear-gradient(90deg, transparent, var(--gold), transparent); margin: 24px auto; border-radius: 2px; }
  .welcome-title { font-family: 'Playfair Display', serif; font-size: clamp(22px, 4vw, 36px); font-weight: 700; color: var(--text); margin-bottom: 16px; }
  .welcome-sub { font-size: 16px; color: var(--text-dim); max-width: 500px; margin: 0 auto 48px; line-height: 1.75; font-weight: 300; }

  /* VOTER LOGIN CARD */
  .voter-login-card { background: #fff; border: 1px solid var(--border); border-radius: 24px; padding: 40px; max-width: 440px; margin: 0 auto 48px; box-shadow: 0 8px 40px rgba(139,26,26,0.08); }
  .voter-login-title { font-family: 'Playfair Display', serif; font-size: 22px; color: var(--text); margin-bottom: 6px; font-weight: 700; }
  .voter-login-sub { font-size: 14px; color: var(--text-dim); margin-bottom: 28px; font-weight: 300; }
  .input-group { margin-bottom: 16px; }
  .input-label { font-size: 12px; color: var(--text-dim); font-family: 'DM Mono', monospace; letter-spacing: 0.5px; margin-bottom: 8px; display: block; }
  /* STATS */
  .stats-row { display: flex; justify-content: center; max-width: 600px; width: 100%; margin: 0 auto; background: #fff; border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; box-shadow: var(--shadow); }
  .stat { flex: 1; padding: 28px 20px; text-align: center; border-right: 1px solid var(--border); }
  .stat:last-child { border-right: none; }
  .stat-num { display: block; font-family: 'Playfair Display', serif; font-size: 48px; font-weight: 700; color: var(--gold); line-height: 1; margin-bottom: 6px; }
  .stat-label { font-size: 12px; color: var(--text-dim); font-family: 'DM Mono', monospace; letter-spacing: 1px; text-transform: uppercase; }
  /* SECTION */
  .section-header { margin-bottom: 32px; }
  .section-title { font-family: 'Playfair Display', serif; font-size: 32px; font-weight: 700; color: var(--text); margin-bottom: 8px; }
  .section-sub { font-size: 15px; color: var(--text-dim); font-weight: 300; }
  .voter-tag { display: inline-block; background: var(--gold-dim); color: var(--gold); padding: 2px 10px; border-radius: 6px; font-family: 'DM Mono', monospace; font-size: 13px; }
  /* ELECTION CARDS */
  .card-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px; }
  .election-card { background: #fff; border: 1px solid var(--border); border-radius: 20px; padding: 28px; cursor: pointer; transition: all 0.25s cubic-bezier(0.4,0,0.2,1); position: relative; overflow: hidden; box-shadow: var(--shadow); }
  .election-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, transparent, var(--gold), transparent); opacity: 0; transition: opacity 0.3s; }
  .election-card:hover { transform: translateY(-4px); border-color: rgba(139,26,26,0.3); box-shadow: 0 12px 40px rgba(139,26,26,0.12); }
  .election-card:hover::before { opacity: 1; }
  .election-card.voted { border-color: rgba(22,163,74,0.4); }
  .status-badge { display: inline-flex; align-items: center; gap: 6px; padding: 4px 12px; border-radius: 100px; font-size: 11px; font-family: 'DM Mono', monospace; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 16px; }
  .status-active { background: rgba(22,163,74,0.1); color: var(--green); border: 1px solid rgba(22,163,74,0.25); }
  .status-upcoming { background: rgba(37,99,235,0.08); color: var(--blue); border: 1px solid rgba(37,99,235,0.2); }
  .status-closed { background: rgba(0,0,0,0.04); color: var(--text-faint); border: 1px solid var(--border); }
  .election-card-title { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; color: var(--text); margin-bottom: 10px; line-height: 1.3; }
  .election-card-desc { font-size: 14px; color: var(--text-dim); line-height: 1.65; margin-bottom: 18px; font-weight: 300; }
  .election-card-meta { display: flex; gap: 16px; font-size: 12px; color: var(--text-faint); font-family: 'DM Mono', monospace; margin-bottom: 20px; }
  .voted-badge { background: rgba(22,163,74,0.1); border: 1px solid rgba(22,163,74,0.3); color: var(--green); padding: 10px 16px; border-radius: var(--radius-sm); text-align: center; font-size: 13px; font-family: 'DM Mono', monospace; }
  /* CANDIDATES */
  .candidate-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; margin-bottom: 32px; }
  .candidate-card { background: #fff; border: 2px solid var(--border); border-radius: 18px; padding: 28px 20px; cursor: pointer; transition: all 0.2s; text-align: center; position: relative; box-shadow: var(--shadow); }
  .candidate-card:hover { border-color: rgba(139,26,26,0.3); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(139,26,26,0.1); }
  .candidate-card.selected { border-color: var(--gold); background: var(--gold-dim); box-shadow: 0 0 20px var(--gold-glow); }
  .candidate-avatar { width: 64px; height: 64px; border-radius: 50%; background: linear-gradient(135deg, #f5e8e8, #eed4d4); display: flex; align-items: center; justify-content: center; font-size: 28px; margin: 0 auto 16px; border: 2px solid var(--border); }
  .candidate-card.selected .candidate-avatar { border-color: var(--gold); }
  .candidate-name { font-family: 'Playfair Display', serif; font-size: 17px; color: var(--text); margin-bottom: 8px; font-weight: 700; }
  .candidate-bio { font-size: 13px; color: var(--text-dim); line-height: 1.6; font-weight: 300; }
  .selected-check { position: absolute; top: 12px; right: 12px; width: 22px; height: 22px; background: var(--gold); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; color: #fff; font-weight: 900; }
  /* RESULTS */
  .result-card { background: #fff; border: 1px solid var(--border); border-radius: 20px; padding: 32px; margin-bottom: 20px; box-shadow: var(--shadow); }
  .result-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 28px; flex-wrap: wrap; gap: 12px; }
  .result-title { font-family: 'Playfair Display', serif; font-size: 22px; color: var(--text); margin-bottom: 6px; }
  .result-total { font-family: 'DM Mono', monospace; font-size: 28px; font-weight: 700; color: var(--gold); }
  .result-total-label { font-size: 12px; color: var(--text-faint); font-family: 'DM Mono', monospace; }
  .result-row { margin-bottom: 18px; }
  .result-name-row { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
  .result-rank { font-family: 'DM Mono', monospace; font-size: 12px; color: var(--text-faint); min-width: 20px; }
  .result-name { font-weight: 600; color: var(--text); flex: 1; font-size: 15px; }
  .winner-tag { font-size: 10px; background: var(--gold-dim); color: var(--gold); padding: 2px 8px; border-radius: 6px; font-family: 'DM Mono', monospace; }
  .result-pct { font-family: 'DM Mono', monospace; font-weight: 700; font-size: 14px; color: var(--gold); min-width: 40px; text-align: right; }
  .result-votes { font-family: 'DM Mono', monospace; font-size: 12px; color: var(--text-faint); min-width: 60px; text-align: right; }
  .bar-bg { background: #f0f0f0; border-radius: 4px; height: 7px; overflow: hidden; }
  .bar-fill { height: 100%; border-radius: 4px; background: #ddd; transition: width 1s cubic-bezier(0.4,0,0.2,1); }
  .bar-fill.leader { background: linear-gradient(90deg, #8b1a1a, #c0392b); box-shadow: 0 0 6px var(--gold-glow); }
  /* INPUTS & BUTTONS */
  input, textarea, select { background: #f9fafb; border: 1px solid var(--border); color: var(--text); padding: 12px 16px; border-radius: var(--radius-sm); font-size: 14px; font-family: 'DM Sans', sans-serif; outline: none; width: 100%; transition: border-color 0.2s; }
  input:focus, textarea:focus { border-color: var(--gold); box-shadow: 0 0 0 3px var(--gold-glow); background: #fff; }
  input::placeholder { color: var(--text-faint); }
  .btn-primary { background: linear-gradient(135deg, #8b1a1a, #c0392b); border: none; color: #fff; padding: 12px 24px; border-radius: var(--radius-sm); cursor: pointer; font-size: 14px; font-weight: 700; font-family: 'DM Sans', sans-serif; transition: all 0.2s; white-space: nowrap; }
  .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(139,26,26,0.35); }
  .btn-primary-lg { padding: 16px 32px; font-size: 16px; width: 100%; border-radius: var(--radius); }
  .btn-secondary { background: #fff; border: 1px solid var(--border); color: var(--text); padding: 12px 20px; border-radius: var(--radius-sm); cursor: pointer; font-size: 14px; font-family: 'DM Sans', sans-serif; transition: all 0.2s; }
  .btn-secondary:hover { background: #f5f5f5; border-color: rgba(139,26,26,0.3); }
  .btn-ghost { background: none; border: none; color: var(--text-dim); cursor: pointer; font-size: 14px; font-family: 'DM Mono', monospace; padding: 8px 0; margin-bottom: 24px; display: flex; align-items: center; gap: 6px; transition: color 0.2s; }
  .btn-ghost:hover { color: var(--gold); }
  /* AUTH */
  .auth-card { max-width: 420px; margin: 60px auto; background: #fff; border: 1px solid var(--border); border-radius: 24px; padding: 48px 40px; text-align: center; box-shadow: 0 8px 40px rgba(0,0,0,0.08); }
  .auth-icon { font-size: 52px; margin-bottom: 20px; display: block; }
  .auth-title { font-family: 'Playfair Display', serif; font-size: 28px; color: var(--text); margin-bottom: 8px; }
  .auth-sub { color: var(--text-dim); font-size: 15px; margin-bottom: 28px; font-weight: 300; line-height: 1.6; }
  .hint { color: var(--text-faint); font-size: 12px; font-family: 'DM Mono', monospace; margin: 12px 0; }
  .error-msg { color: var(--red); font-size: 13px; font-family: 'DM Mono', monospace; margin: 8px 0; }
  /* ADMIN */
  .admin-panel { background: #fff; border: 1px solid var(--border); border-radius: 20px; padding: 28px; margin-bottom: 28px; box-shadow: var(--shadow); }
  .admin-panel-title { font-family: 'Playfair Display', serif; font-size: 20px; color: var(--text); margin-bottom: 20px; }
  .admin-row { display: flex; justify-content: space-between; align-items: center; padding: 16px 0; border-bottom: 1px solid var(--border); gap: 12px; flex-wrap: wrap; }
  .admin-row:last-child { border-bottom: none; }
  .admin-meta { color: var(--text-faint); font-size: 12px; font-family: 'DM Mono', monospace; margin-top: 2px; }
  .toggle-btn { background: #fff; border: 1px solid var(--border); color: var(--text-dim); padding: 8px 18px; border-radius: 8px; cursor: pointer; font-size: 12px; font-family: 'DM Mono', monospace; transition: all 0.2s; white-space: nowrap; }
  .toggle-btn:hover { border-color: var(--gold); color: var(--gold); }
  .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px; }
  .form-actions { display: flex; gap: 12px; margin-top: 16px; justify-content: flex-end; }

  /* CONFIRM */
  .confirm-box { background: var(--gold-dim); border: 1px solid rgba(139,26,26,0.2); border-radius: 20px; padding: 28px; margin-bottom: 28px; text-align: center; }
  .confirm-box-emoji { font-size: 40px; margin-bottom: 12px; }
  .confirm-box-title { font-family: 'Playfair Display', serif; font-size: 20px; color: var(--text); margin-bottom: 6px; }
  .confirm-box-sub { font-size: 14px; color: var(--text-dim); }

  /* TOAST */
  .toast { position: fixed; bottom: 32px; left: 50%; transform: translateX(-50%); padding: 14px 24px; border-radius: 12px; font-size: 14px; font-family: 'DM Mono', monospace; z-index: 999; animation: toastIn 0.3s cubic-bezier(0.4,0,0.2,1); box-shadow: 0 8px 32px rgba(0,0,0,0.5); white-space: nowrap; }
  .toast-success { background: #f0fdf4; border: 1px solid rgba(22,163,74,0.3); color: var(--green); }
  .toast-error { background: #fef2f2; border: 1px solid rgba(220,38,38,0.3); color: var(--red); }
  @keyframes toastIn { from { opacity: 0; transform: translateX(-50%) translateY(12px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }

  /* FOOTER */
  .footer { text-align: center; padding: 28px; color: var(--text-faint); font-size: 12px; font-family: 'DM Mono', monospace; letter-spacing: 0.5px; border-top: 1px solid var(--border); position: relative; z-index: 1; background: #fff; }

  /* PAGE FADE */
  .page { animation: fadeUp 0.3s ease both; }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }

  .empty { color: var(--text-faint); font-style: italic; text-align: center; padding: 40px; }

  /* FEATURES ROW */
  .features-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; max-width: 600px; width: 100%; margin: 32px auto 0; }
  .feature-item { background: #fff; border: 1px solid var(--border); border-radius: var(--radius); padding: 28px 20px; text-align: center; box-shadow: var(--shadow); }
  .feature-icon { font-size: 36px; margin-bottom: 12px; display: block; }
  .feature-label { font-size: 15px; color: var(--text-dim); font-weight: 600; }

  @media (max-width: 640px) {
    .main { padding: 32px 20px; }
    .header { padding: 0 20px; }
    .form-grid { grid-template-columns: 1fr; }
    .auth-card { padding: 32px 24px; }
    .voter-login-card { padding: 28px 20px; }
    .features-row { grid-template-columns: 1fr 1fr; }
  }

`;

export default function App() {
  const [view, setView] = useState("welcome");
  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [voterId, setVoterId] = useState("");
  const [voterIdInput, setVoterIdInput] = useState("");
  const [voted, setVoted] = useState({});
  const [selectedElection, setSelectedElection] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [adminCode, setAdminCode] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminError, setAdminError] = useState("");
  const [toast, setToast] = useState(null);
  const [newElection, setNewElection] = useState({ title: "", description: "", start_date: "", end_date: "", candidates: ["", ""] });
  const [keyBuffer, setKeyBuffer] = useState("");

  useEffect(() => {
    const handleKey = (e) => {
      const newBuffer = (keyBuffer + e.key).slice(-20);
      setKeyBuffer(newBuffer);
      if (newBuffer.includes("yhsadmin2025")) {
        setView("adminLogin");
        setKeyBuffer("");
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [keyBuffer]);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Seed database on first load
  const seedDatabase = async () => {
    const { data: existing } = await supabase.from("elections").select("id").limit(1);
    if (existing && existing.length > 0) return;
    await supabase.from("elections").insert(SEED_ELECTIONS);
    await supabase.from("candidates").insert(SEED_CANDIDATES);
  };

  // Load elections with candidates and vote counts
  const loadElections = async () => {
    setLoading(true);
    await seedDatabase();
    const { data: elData } = await supabase.from("elections").select("*").order("id");
    const { data: cData } = await supabase.from("candidates").select("*").order("id");
    if (elData && cData) {
      const merged = elData.map(el => ({
        ...el,
        startDate: el.start_date,
        endDate: el.end_date,
        candidates: cData.filter(c => c.election_id === el.id)
      }));
      setElections(merged);
    }
    setLoading(false);
  };

  useEffect(() => { loadElections(); }, []);

  const activeElections = elections.filter(e => e.status === "active");
  const totalVotes = (el) => el.candidates ? el.candidates.reduce((s, c) => s + (c.votes || 0), 0) : 0;

  const handleVoterLogin = () => {
    if (voterIdInput.trim().length < 3) { showToast("Voter ID must be at least 3 characters.", "error"); return; }
    setVoterId(voterIdInput.trim());
    setView("vote");
    showToast("Welcome, " + voterIdInput.trim() + "!");
  };

  const handleSelectElection = (el) => {
    if (voted[el.id]) { showToast("You already voted in this election.", "error"); return; }
    setSelectedElection(el);
    setSelectedCandidate(null);
    setView("confirm");
  };

  const handleConfirmVote = async () => {
    if (!selectedCandidate) { showToast("Please select a candidate first.", "error"); return; }
    // Check if already voted in DB
    const { data: existingVote } = await supabase.from("votes").select("id").eq("voter_id", voterId).eq("election_id", selectedElection.id).single();
    if (existingVote) { showToast("You already voted in this election!", "error"); setVoted(p => ({...p, [selectedElection.id]: selectedCandidate})); setView("vote"); return; }
    // Record vote
    const { error: voteError } = await supabase.from("votes").insert({ voter_id: voterId, election_id: selectedElection.id, candidate_id: selectedCandidate });
    if (voteError) { showToast("Error recording vote. Try again.", "error"); return; }
    // Increment candidate votes
    const candidate = selectedElection.candidates.find(c => c.id === selectedCandidate);
    await supabase.from("candidates").update({ votes: (candidate.votes || 0) + 1 }).eq("id", selectedCandidate);
    setVoted(p => ({...p, [selectedElection.id]: selectedCandidate}));
    showToast("Your vote has been recorded! ✓");
    await loadElections();
    setView("vote");
  };

  const handleAdminLogin = () => {
    if (adminCode === ADMIN_CODE) { setIsAdmin(true); setView("admin"); setAdminError(""); showToast("Admin access granted."); }
    else { setAdminError("Invalid access code. Try admin123"); }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const next = currentStatus === "active" ? "closed" : currentStatus === "upcoming" ? "active" : "upcoming";
    await supabase.from("elections").update({ status: next }).eq("id", id);
    await loadElections();
  };

  const handleCreateElection = async () => {
    if (!newElection.title || !newElection.start_date || !newElection.end_date) { showToast("Fill all required fields.", "error"); return; }
    const candidateNames = newElection.candidates.filter(c => c.trim());
    if (candidateNames.length < 2) { showToast("At least 2 candidates required.", "error"); return; }
    const elId = "e_" + Date.now();
    await supabase.from("elections").insert({ id: elId, title: newElection.title, description: newElection.description, status: "upcoming", start_date: newElection.start_date, end_date: newElection.end_date });
    const candidates = candidateNames.map((name, i) => ({ id: elId + "_c" + i, election_id: elId, name, bio: "", emoji: "👤", votes: 0 }));
    await supabase.from("candidates").insert(candidates);
    setNewElection({ title: "", description: "", start_date: "", end_date: "", candidates: ["", ""] });
    showToast("Election created!");
    await loadElections();
  };

  const statusDot = (s) => s === "active" ? "●" : s === "upcoming" ? "◎" : "○";

  return (
    <>
      <style>{css}</style>
      <div className="app">
        {toast && <div className={"toast toast-" + toast.type}>{toast.msg}</div>}

        <header className="header">
          <div className="header-inner">
            <div className="logo" onClick={() => setView("welcome")}>
              <div className="logo-crest"><img src={LOGO} alt="YHS Logo" /></div>
              <span className="logo-text">Yeshua High School<span className="logo-sub">E-Voting Portal</span></span>
            </div>
            <nav className="nav">
              <button className="nav-btn" onClick={() => setView("welcome")}>Home</button>
              {voterId && <button className="nav-btn" onClick={() => setView("vote")}>My Ballot</button>}
              {isAdmin && <button className="nav-btn nav-btn-accent" onClick={() => setView("admin")}>Dashboard</button>}
            </nav>
          </div>
        </header>

        <main className="main">

          {view === "welcome" && (
            <div className="welcome-page page">
              <div className="school-crest-big"><img src={LOGO} alt="Yeshua High School Logo" /></div>
              <h1 className="school-name-big">Yeshua High School</h1>
              <span className="school-tag">Jesus Our Perfect Example</span>
              <div className="welcome-divider" />
              <h2 className="welcome-title">Yeshua High School Voting System</h2>
              <p className="welcome-sub">A secure and transparent platform for Yeshua High School students to participate in democratic elections. Your vote matters — cast it with confidence.</p>
              <div className="voter-login-card">
                <h3 className="voter-login-title">Login to Vote</h3>
                <p className="voter-login-sub">Enter your Student ID to access the ballot.</p>
                <div className="input-group">
                  <label className="input-label">STUDENT ID / VOTER ID</label>
                  <input placeholder="e.g. YHS-20491" value={voterIdInput} onChange={e => setVoterIdInput(e.target.value)} onKeyDown={e => e.key === "Enter" && handleVoterLogin()} />
                </div>
                <button className="btn-primary" style={{width:"100%",marginTop:4}} onClick={handleVoterLogin}>Login to Vote →</button>
              </div>
              <div className="stats-row">
                <div className="stat"><span className="stat-num">{elections.length}</span><span className="stat-label">Elections</span></div>
                <div className="stat"><span className="stat-num">{activeElections.length}</span><span className="stat-label">Active</span></div>
                <div className="stat"><span className="stat-num">{elections.reduce((s, e) => s + totalVotes(e), 0)}</span><span className="stat-label">Votes Cast</span></div>
              </div>
              <div className="features-row">
                <div className="feature-item"><span className="feature-icon">🔒</span><span className="feature-label">Secure Voting</span></div>
                <div className="feature-item"><span className="feature-icon">👁️</span><span className="feature-label">Transparent</span></div>
                <div className="feature-item"><span className="feature-icon">⚡</span><span className="feature-label">Live Results</span></div>
              </div>
            </div>
          )}

          {view === "vote" && (
            <div className="page">
              <div className="section-header">
                <h2 className="section-title">Active Elections</h2>
                <p className="section-sub">Voting as <span className="voter-tag">{voterId}</span></p>
              </div>
              {loading ? <p className="empty">Loading elections...</p> :
               activeElections.length === 0 ? <p className="empty">No active elections right now.</p> :
               <div className="card-grid">
                 {activeElections.map(el => (
                   <div key={el.id} className={"election-card" + (voted[el.id] ? " voted" : "")} onClick={() => handleSelectElection(el)}>
                     <span className={"status-badge status-" + el.status}>{statusDot(el.status)} {el.status}</span>
                     <h3 className="election-card-title">{el.title}</h3>
                     <p className="election-card-desc">{el.description}</p>
                     <div className="election-card-meta"><span>📅 {el.start_date}</span><span>→ {el.end_date}</span></div>
                     {voted[el.id] ? <div className="voted-badge">✓ VOTE RECORDED</div> : <button className="btn-primary" style={{width:"100%"}}>Cast Your Vote →</button>}
                   </div>
                 ))}
               </div>
              }
            </div>
          )}

          {view === "confirm" && selectedElection && (
            <div className="page">
              <button className="btn-ghost" onClick={() => setView("vote")}>← Back to Elections</button>
              <div className="section-header">
                <h2 className="section-title">{selectedElection.title}</h2>
                <p className="section-sub">{selectedElection.description}</p>
              </div>
              <div className="candidate-grid">
                {selectedElection.candidates.map(c => (
                  <div key={c.id} className={"candidate-card" + (selectedCandidate === c.id ? " selected" : "")} onClick={() => setSelectedCandidate(c.id)}>
                    {selectedCandidate === c.id && <div className="selected-check">✓</div>}
                    <div className="candidate-avatar">{c.emoji || "👤"}</div>
                    <p className="candidate-name">{c.name}</p>
                    <p className="candidate-bio">{c.bio}</p>
                  </div>
                ))}
              </div>
              {selectedCandidate && (
                <div className="confirm-box">
                  <div className="confirm-box-emoji">🗳️</div>
                  <p className="confirm-box-title">Voting for {selectedElection.candidates.find(c => c.id === selectedCandidate)?.name}</p>
                  <p className="confirm-box-sub">This action cannot be undone.</p>
                </div>
              )}
              <button className="btn-primary btn-primary-lg" onClick={handleConfirmVote}>Confirm Vote →</button>
            </div>
          )}



          {view === "adminLogin" && (
            <div className="page">
              <div className="auth-card">
                <span className="auth-icon">🔐</span>
                <h2 className="auth-title">Admin Access</h2>
                <p className="auth-sub">Enter your secure access code to manage elections.</p>
                <input type="password" placeholder="Access code" value={adminCode} onChange={e => setAdminCode(e.target.value)} onKeyDown={e => e.key === "Enter" && handleAdminLogin()} style={{marginBottom:"12px"}} />
                {adminError && <p className="error-msg">{adminError}</p>}
                <p className="hint">Default: admin123</p>
                <button className="btn-primary" style={{width:"100%",marginTop:"8px"}} onClick={handleAdminLogin}>Access Dashboard →</button>
              </div>
            </div>
          )}

          {view === "admin" && isAdmin && (
            <div className="page">
              <div className="section-header">
                <h2 className="section-title">Admin Dashboard</h2>
                <p className="section-sub">Manage Yeshua High School elections</p>
              </div>
              <div className="admin-panel">
                <h3 className="admin-panel-title">📊 Live Results</h3>
                {elections.map(el => {
                  const total = totalVotes(el);
                  const sorted = [...(el.candidates || [])].sort((a, b) => (b.votes||0) - (a.votes||0));
                  return (
                    <div key={el.id} style={{marginBottom:24,paddingBottom:24,borderBottom:"1px solid var(--border)"}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                        <strong style={{fontFamily:"Playfair Display,serif",fontSize:16}}>{el.title}</strong>
                        <span style={{fontFamily:"DM Mono,monospace",fontSize:13,color:"var(--gold)",fontWeight:700}}>{total} votes</span>
                      </div>
                      {sorted.map((c, i) => {
                        const pct = total ? Math.round(((c.votes||0) / total) * 100) : 0;
                        return (
                          <div key={c.id} style={{marginBottom:8}}>
                            <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:4}}>
                              <span style={{fontFamily:"DM Mono,monospace",fontSize:11,color:"var(--text-faint)",minWidth:20}}>#{i+1}</span>
                              <span style={{flex:1,fontSize:14,fontWeight:600}}>{c.name}</span>
                              {i===0 && total>0 && <span className="winner-tag">LEADING</span>}
                              <span style={{fontFamily:"DM Mono,monospace",fontSize:12,color:"var(--text-faint)"}}>{c.votes||0} votes</span>
                              <span style={{fontFamily:"DM Mono,monospace",fontSize:13,color:"var(--gold)",fontWeight:700,minWidth:40,textAlign:"right"}}>{pct}%</span>
                            </div>
                            <div className="bar-bg"><div className={"bar-fill"+(i===0?" leader":"")} style={{width:pct+"%"}} /></div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
              <div className="admin-panel">
                <h3 className="admin-panel-title">All Elections</h3>
                {elections.map(el => (
                  <div className="admin-row" key={el.id}>
                    <div style={{flex:1}}>
                      <div style={{fontWeight:600,color:"var(--text)",marginBottom:2}}>{el.title}</div>
                      <div className="admin-meta">{el.start_date} → {el.end_date} · {totalVotes(el)} votes</div>
                    </div>
                    <span className={"status-badge status-" + el.status}>{statusDot(el.status)} {el.status}</span>
                    <button className="toggle-btn" onClick={() => handleToggleStatus(el.id, el.status)}>
                      {el.status === "upcoming" ? "Activate →" : el.status === "active" ? "Close →" : "Reopen →"}
                    </button>
                  </div>
                ))}
              </div>
              <div className="admin-panel">
                <h3 className="admin-panel-title">Create New Election</h3>
                <input placeholder="Election title *" value={newElection.title} onChange={e => setNewElection(p=>({...p,title:e.target.value}))} style={{marginBottom:12}} />
                <input placeholder="Description" value={newElection.description} onChange={e => setNewElection(p=>({...p,description:e.target.value}))} style={{marginBottom:12}} />
                <div className="form-grid">
                  <input type="date" value={newElection.start_date} onChange={e => setNewElection(p=>({...p,start_date:e.target.value}))} />
                  <input type="date" value={newElection.end_date} onChange={e => setNewElection(p=>({...p,end_date:e.target.value}))} />
                </div>
                <p style={{fontSize:13,color:"var(--text-dim)",marginBottom:10,fontFamily:"DM Mono,monospace"}}>Candidates *</p>
                {newElection.candidates.map((c, i) => (
                  <input key={i} placeholder={"Candidate " + (i+1)} value={c} onChange={e => setNewElection(p=>({...p,candidates:p.candidates.map((x,j)=>j===i?e.target.value:x)}))} style={{marginBottom:8}} />
                ))}
                <div className="form-actions">
                  <button className="btn-secondary" onClick={() => setNewElection(p=>({...p,candidates:[...p.candidates,""]}))}>+ Add Candidate</button>
                  <button className="btn-primary" onClick={handleCreateElection}>Create Election →</button>
                </div>
              </div>
            </div>
          )}

        </main>
        <footer className="footer">✝ © 2025 YESHUA HIGH SCHOOL · E-VOTING PORTAL · EXCELLENCE · INTEGRITY · FAITH</footer>
      </div>
    </>
  );
}
