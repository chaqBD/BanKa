<div align="center">

<img src="images/hero-banking-hall.jpg" alt="BanKa — a Nigerian banking hall" width="720">

# BanKa

**A Nigerian banking life-simulation game**

*Hit target. Survive MPR. Don't japa.*

![Status](https://img.shields.io/badge/status-active_development-0b6e4f)
![Version](https://img.shields.io/badge/version-v0.3-c99a2e)
![Banks](https://img.shields.io/badge/banks-26_fictional-0b6e4f)
![Events](https://img.shields.io/badge/events-60-0b6e4f)
![Career path](https://img.shields.io/badge/career_path-CSO_to_RM_to_BM-c99a2e)
![Stack](https://img.shields.io/badge/stack-HTML%20·%20CSS%20·%20JS-grey)

🎮 [**Play now**](https://chaqbd.github.io/BanKa/) · 📋 [Design plan](Naija_Banker_Design_Plan.pdf) · 🗂 [Structure](#-repository-structure) · 🗺 [Roadmap](#-roadmap)

</div>

---

## 🎯 Overview

BanKa turns the daily pressure of Nigerian banking into a browser game: targets, ultimatums,
network downtime, audits, owambes and the monthly performance review. You resume as a fresh
graduate Banking Officer at one of 26 fictional banks and try to climb to Assistant General
Manager without burning out, getting sacked, or getting suspended.

It runs entirely in the browser with no install and no build step — a shared link is the whole
onboarding, in the spirit of *Lagos Life*, the viral Nigerian browser life-sim that inspired it.

All banks, staff and figures in BanKa are entirely fictional. The game is affectionate satire —
it laughs *with* bankers, not at them, and names no real institution.

## 🏦 Features

| | |
|---|---|
| 🏢 **26 fictional banks** | Tier 1, Tier 2, Foreign, Boutique, Regional and Non-interest, each with its own target/pay multipliers, stress, compliance baseline and difficulty rating |
| 🪜 **One linear career path** | Customer Service Officer → Relationship Manager → Branch Manager, tied to seven grades from Executive Trainee to Assistant General Manager |
| 🗓 **A weekly task loop** | Three time slots a week — Morning, Afternoon, Evening — each a trade-off between target, stress, compliance and goodwill |
| 🎭 **60 event cards** | Branch life, Ethics, Social, Money and Bank-wide palava, each with 2–3 choices and real consequences |
| 👔 **Named NPCs with moods** | A randomly generated Branch Manager and Regional Director, each Strict, Fair, Volatile or Easygoing — mood scales how hard goodwill swings land and flavors MPR dialogue |
| 🖋 **Monthly Performance Review** | An A–D rating stamp (with animation and sound) decides promotion, a query letter, or the sack |
| 💾 **Local save** | Your career persists in the browser via `localStorage` — no account, no server |

## 🕹️ How to play

**Just open the link:** [chaqbd.github.io/BanKa](https://chaqbd.github.io/BanKa/)

Or run it locally — it's static files, so any local server works:

```bash
git clone https://github.com/chaqBD/BanKa.git
cd BanKa
python -m http.server 8000
# open http://localhost:8000
```

## 🗺 Roadmap

- [x] **v0.2** — Playable prototype: 3 desks, 26 banks, 25 events, MPR, promotions, local save
- [x] **v0.3** — Depth: named BM/Regional Director with moods, forced CSO → RM → BM career path, 60+ events, stamp animation and sound
- [ ] **v0.4** — Social: shareable MPR result card, daily challenge, bank-vs-bank leaderboard
- [ ] **v1.0** — Multiplayer: accounts, regional leaderboards, players as branch colleagues
- [ ] **Later** — Live world: seasonal events, creator tools for community-written events

See the [preliminary design plan](Naija_Banker_Design_Plan.pdf) for the full storytelling brief.

## 📁 Repository structure

```
BanKa/
├── index.html                   # app shell, all screens and modals
├── style.css                    # theme, layout, animations
├── js/
│   ├── banks.js                 # 26 fictional banks
│   ├── desks.js                 # CSO / RM / BM task definitions + career-path map
│   ├── names.js                 # NPC name pool, moods, Regional Director dialogue
│   ├── events.js                # 60 weekly event cards
│   ├── sound.js                 # synthesized Web Audio stamp/rating/promotion SFX
│   ├── game.js                  # state, scoring, promotion and save logic
│   └── ui.js                    # DOM rendering and event wiring
├── images/                      # artwork used by the UI and this README
└── Naija_Banker_Design_Plan.pdf # original storytelling brief
```

## 📬 Contact

Built by **Shakir Adeyemi** ([@chaqBD](https://github.com/chaqBD)).

