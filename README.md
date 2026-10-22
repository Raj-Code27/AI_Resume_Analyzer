# ResumeIQ — AI-Powered Resume Analyzer & ATS Optimizer

ResumeIQ is a full-stack web application that evaluates resumes, computes explainable ATS compatibility scores across 7 dimensions, discovers 5–10 ideal job roles, highlights keyword gaps, and improves resume bullet points with zero fabricated claims.

Built with **React**, **TypeScript**, **Vite**, **Tailwind CSS**, **Node.js**, **Express**, **MongoDB/Mongoose**, and **pdfkit**.

---

## 🎨 Design System: "Cosmic Aurora & Luminous Glassmorphism"

ResumeIQ features a dark, high-contrast **Cosmic Aurora** aesthetic with 3D tactile elevation and glassmorphism:

- **Canvas Background:** Deep obsidian (`#080B14`) overlaid with an architectural dot-matrix grid (`radial-gradient`) and floating ambient aurora flares (royal indigo, electric purple, and cyber cyan).
- **Glassmorphism Cards (`.card-3d`):** Frosted dark glass (`rgba(15, 23, 42, 0.8)` with `backdrop-filter: blur(20px)`), luminous borders (`rgba(255, 255, 255, 0.1)`), top bevel reflections, and interactive hover lift.
- **3D Perspective Hero Mockup (`.hero-mockup-3d`):** Perspective tilt container with multi-layered cast shadows.
- **3D Tactile Buttons (`.btn-3d`):** Beveled gradient push-down controls with radiant under-glow.

### Semantic Status Colors
- **Strong (85–100):** Text `#34D399`, Background `rgba(16, 185, 129, 0.16)`, Border `rgba(16, 185, 129, 0.4)`
- **Good (70–84):** Text `#818CF8`, Background `rgba(99, 102, 241, 0.16)`, Border `rgba(99, 102, 241, 0.4)`
- **Moderate (50–69):** Text `#FCD34D`, Background `rgba(245, 158, 11, 0.16)`, Border `rgba(245, 158, 11, 0.4)`
- **Needs Improvement (0–49):** Text `#FDA4AF`, Background `rgba(244, 63, 94, 0.16)`, Border `rgba(244, 63, 94, 0.4)`

---

## 🚀 Key Features

1. **Multi-Format Document Parsing:**
   - PDF extraction via `pdf-parse`
   - Microsoft Word extraction via `mammoth`
   - Scanned image & screenshot OCR fallback via `tesseract.js`
2. **7-Dimension Deterministic & Semantic ATS Scoring:**
   - Skills Relevance (25%)
   - Experience & Achievements (20%)
   - Project Relevance (15%)
   - Keywords & Terminology (15%)
   - Structure & Readability (10%)
   - Education & Certifications (10%)
   - Parsing Compatibility (5%)
3. **5–10 Job Role Matches:**
   - Evaluates suitability scores against standardized tech archetypes (Full-Stack, Backend, Frontend, DevOps, AI/ML, SDE, Data Analyst).
   - Generates skill gap bridge guidance and recommended next steps.
4. **Skills Verification:**
   - Distinguishes skills backed by work/project evidence from mere list mentions and missing target role prerequisites.
5. **AI Resume Optimizer ("Improve My Resume"):**
   - Side-by-side comparison UI with added (`--success-soft`) and removed (`--danger-soft`) text.
   - User approval/rejection/inline-editing controls.
   - Strict fact-preservation safeguard: never fabricates unearned degrees, jobs, dates, or fake statistics.
   - Live score recalculation upon accepting revisions.
6. **Downloadable ATS-Compliant PDF Resume:**
   - Single-column, linear hierarchy generated via `pdfkit` for maximum parsing accuracy.
7. **Resilient Architecture & Demo Mode:**
   - Connects to MongoDB Atlas / local MongoDB, with automatic in-memory fallback if the database daemon is offline.
   - Configurable AI service (Gemini, OpenAI, or local transparent Demo Mode).

---

## 🛠 Project Structure

```
AI Resume Analyzer/
├── frontend/                     # React + TypeScript + Vite + Tailwind CSS
│   ├── src/
│   │   ├── components/           # Navbar, ScoreGauge, ScoreBreakdown, OptimizerView, etc.
│   │   ├── services/             # Axios API client, mock analyzer, PDF generator
│   │   ├── data/                 # Sample resumes (Full-Stack, Frontend, AI/Data)
│   │   ├── types/                # Complete TypeScript data contracts
│   │   ├── index.css             # Lavender & Silks CSS variables
│   │   └── App.tsx               # Primary application coordinator
│   └── package.json
│
├── backend/                      # Node.js + Express ES Modules
│   ├── src/
│   │   ├── config/               # DB connection (with fallback), env, AI config
│   │   ├── controllers/          # Resume, Analysis, Optimization, History
│   │   ├── middleware/           # Upload (Multer), Error, Rate limiting, Validation
│   │   ├── models/               # Resume, Analysis, Optimization (Mongoose)
│   │   ├── routes/               # REST API endpoints
│   │   ├── services/             # ATS Scorer, Role Matcher, Parsers, Exporter
│   │   ├── utils/                # ApiError, asyncHandler, safe logger
│   │   ├── app.js                # Express app setup
│   │   └── server.js             # Server bootstrap
│   ├── tests/                    # Vitest unit & integration tests
│   └── package.json
│
├── docker-compose.yml            # MongoDB + Backend + Frontend containers
└── README.md
```

---

## ⚡ Quick Start

### Prerequisites
- Node.js v18+ (tested on Node v24)
- npm v9+

### 1. Install Dependencies
```bash
# In frontend/
cd frontend && npm install

# In backend/
cd ../backend && npm install
```

### 2. Start Development Servers

**Start Backend (Port 5001):**
```bash
cd backend
npm run dev
```

**Start Frontend (Port 5173):**
```bash
cd frontend
npm run dev
```

Open your browser to [http://localhost:5173](http://localhost:5173).

---

## 🧪 Running Automated Tests

ResumeIQ includes unit tests for the ATS scoring engine, job role matcher, health checks, and API routes that run without needing external AI credentials:

```bash
cd backend
npm test
```

Test Results:
- `tests/atsScorer.test.js`: 3 passed
- `tests/roleMatcher.test.js`: 2 passed
- `tests/health.test.js`: 3 passed
- **Total: 8 passed (0 failed)**

---

## 🔌 API Documentation

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check & database/AI status |
| `POST` | `/api/resumes/analyze` | Multipart upload (PDF, DOCX, PNG, JPG) or raw text scan |
| `GET` | `/api/analysis/:analysisId` | Retrieve full analysis results |
| `GET` | `/api/analysis/:analysisId/roles` | Retrieve recommended job roles |
| `POST` | `/api/analysis/:analysisId/optimize` | Generate fact-preserving resume improvements |
| `PATCH` | `/api/optimization/:optimizationId` | Save accepted/rejected revisions and recalculate score |
| `GET` | `/api/optimization/:optimizationId/download` | Download ATS-optimized PDF resume |
| `GET` | `/api/analysis/:analysisId/comparison` | Before & after score and category differences |
| `GET` | `/api/history` | Paginated previous scan records |

---

## 🐳 Docker Deployment

Run the entire stack (MongoDB, Node backend, and Nginx frontend) with Docker Compose:

```bash
docker-compose up --build
```
- Frontend: [http://localhost:8080](http://localhost:8080)
- Backend: [http://localhost:5001](http://localhost:5001)

---

## 📄 License
MIT
