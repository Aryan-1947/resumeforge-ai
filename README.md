# ResumeForge AI

> AI-powered resume optimization platform for the modern job market.

ResumeForge AI helps job seekers tailor their resumes to specific job descriptions, get precise ATS scores, receive AI-powered rewrites, identify missing skills, and generate tailored cover letters — all in under 30 seconds.

---

## Live Demo

- **Frontend:** [resumeforge-ai.vercel.app](https://resumeforge-ai.vercel.app)
- **Backend:** [resumeforge-ai.onrender.com](https://resumeforge-ai.onrender.com)

---

## What It Does

Most resumes get rejected by Applicant Tracking Systems (ATS) before a human ever reads them. ResumeForge AI solves this by:

1. **Parsing your resume** — extracts all skills, experience, and education automatically
2. **Analyzing the job description** — identifies required skills, responsibilities, and role context
3. **Scoring ATS compatibility** — gives you a weighted match score based on how well your resume fits the JD
4. **Rewriting your resume** — AI improves phrasing, action verbs, and ATS alignment without inventing fake experience
5. **Identifying skill gaps** — shows exactly which required skills are missing from your resume
6. **Generating a cover letter** — creates a tailored, professional cover letter based on your resume and the JD
7. **Saving your history** — every analysis is saved so you can track your progress over time

---

## Features

| Feature | Description |
|---|---|
| ATS Score Analysis | Weighted keyword matching with role-aware scoring |
| AI Resume Rewriting | LLaMA-powered rewrite with strict factual accuracy |
| Skill Gap Detection | Shows matched and missing skills side by side |
| Before vs After | Side-by-side comparison of original and optimized resume |
| Cover Letter Generation | Tailored cover letter based on your resume and JD |
| AI Suggestions | Role-specific actionable recommendations |
| Analysis History | All analyses saved and accessible anytime |
| PDF Downloads | Download optimized resume and cover letter as PDFs |
| Auth0 Authentication | Secure login with Google OAuth |
| Dark / Light Mode | Full theme support across all pages |

---

## Tech Stack

### Frontend
- **React 19** + **Vite** — fast, modern UI framework
- **Tailwind CSS v4** — utility-first styling
- **Framer Motion** — smooth animations
- **Auth0 React SDK** — authentication
- **Axios** — API communication
- **React Hot Toast** — notifications
- **jsPDF** — PDF generation
- **React Markdown** — markdown rendering
- **React Icons + Tabler Icons** — icon library

### Backend
- **FastAPI** — high-performance Python API framework
- **SQLAlchemy** — ORM for database management
- **PostgreSQL (Neon)** — production database
- **Auth0 JWT Verification** — secure token validation
- **Groq LLaMA 3.1 8B** — AI model for resume rewriting, cover letter, suggestions
- **LangChain + LangChain-Groq** — LLM orchestration
- **pdfplumber** — PDF text extraction
- **python-docx** — DOCX text extraction
- **spaCy** — NLP parsing and entity extraction
- **SlowAPI** — rate limiting
- **PyJWT** — JWT token verification

---

## Project Structure

```
resumeforge-ai/
│
├── frontend/                  # React + Vite frontend
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── Navbar.jsx
│   │   │   ├── UploadForm.jsx
│   │   │   ├── ResultDashboard.jsx
│   │   │   ├── ATSProgressBar.jsx
│   │   │   ├── SkillSection.jsx
│   │   │   ├── ResumePreview.jsx
│   │   │   ├── OriginalResumePreview.jsx
│   │   │   ├── CoverLetterSection.jsx
│   │   │   ├── SuggestionsSection.jsx
│   │   │   ├── DownloadButtons.jsx
│   │   │   ├── StatsCards.jsx
│   │   │   ├── CopyButton.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── ErrorMessage.jsx
│   │   │   ├── EmptyState.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/             # Page components
│   │   │   ├── Landing.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── History.jsx
│   │   │   └── AnalysisDetails.jsx
│   │   ├── services/
│   │   │   └── api.js         # Axios instance + auth token
│   │   └── styles/
│   │       └── index.css      # Global styles + CSS variables
│   ├── index.html
│   ├── vite.config.js
│   └── tailwind.config.js
│
└── backend/                   # FastAPI backend
    ├── agents/                # AI agents
    │   ├── llm_setup.py       # Groq LLaMA configuration
    │   ├── resume_rewriter_agent.py
    │   ├── cover_letter_agent.py
    │   ├── suggestion_agent.py
    │   └── comparison_engine.py
    ├── auth/                  # Authentication
    │   ├── security.py        # Auth0 JWT verification
    │   └── dependencies.py    # FastAPI auth dependencies
    ├── database/              # Database
    │   ├── database.py        # SQLAlchemy engine
    │   └── models.py          # User + ResumeAnalysis models
    ├── parsers/               # Document parsers
    │   ├── resume_parser.py   # PDF/DOCX text extraction
    │   ├── resume_nlp_parser.py # spaCy NLP parsing
    │   └── jd_parser.py       # Job description parsing
    ├── scoring/
    │   └── ats_score.py       # ATS scoring algorithm
    ├── schemas/
    │   └── auth_schema.py     # Pydantic schemas
    ├── utils/
    │   └── resume_formatter.py
    ├── main.py                # FastAPI app + all endpoints
    └── requirements.txt
```

---

## Getting Started

### Prerequisites

- Python 3.11+
- Node.js 18+
- A [Groq](https://console.groq.com) account (free API key)
- An [Auth0](https://auth0.com) account (free tier)

### 1. Clone the repository

```bash
git clone https://github.com/Aryan-1947/resumeforge-ai.git
cd resumeforge-ai
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Mac/Linux

# Install dependencies
pip install -r requirements.txt

# Download spaCy model
python -m spacy download en_core_web_sm

# Create .env file
```

Create `backend/.env`:
```env
GROQ_API_KEY=your_groq_api_key_here
SECRET_KEY=your_secret_key_here
DATABASE_URL=sqlite:///./resume_tailor.db
```

```bash
# Run backend
python -m uvicorn main:app --reload
```

Backend runs at `http://localhost:8000`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Run frontend
npm run dev
```

Frontend runs at `http://localhost:5173`

### 4. Auth0 Setup

1. Create an Auth0 account at [auth0.com](https://auth0.com)
2. Create a new **Single Page Application**
3. Set Allowed Callback URLs, Logout URLs, and Web Origins to `http://localhost:5173`
4. Create an **API** with identifier `https://resumeforge-api`
5. Update `src/main.jsx` with your Auth0 domain and client ID

---

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/` | Health check | No |
| GET | `/me` | Get current user | Yes |
| POST | `/analyze-resume/` | Full resume analysis pipeline | Yes |
| GET | `/my-analyses` | Get user's analysis history | Yes |
| GET | `/analysis/{id}` | Get specific analysis details | Yes |
| DELETE | `/analysis/{id}` | Delete an analysis | Yes |
| POST | `/validate-role/` | Validate role vs JD match | Yes |

---

## Environment Variables

### Backend `.env`
```env
GROQ_API_KEY=           # Groq API key for LLaMA model
SECRET_KEY=             # Random secret key
DATABASE_URL=           # PostgreSQL or SQLite connection string
```

### Frontend (Vercel Environment Variables)
```
VITE_AUTH0_DOMAIN=      # Your Auth0 domain
VITE_AUTH0_CLIENT_ID=   # Your Auth0 client ID
```

---

## Deployment

### Frontend → Vercel
1. Push code to GitHub
2. Connect repo to Vercel
3. Set root directory to `frontend`
4. Add environment variables
5. Deploy

### Backend → Render
1. Connect repo to Render
2. Set root directory to `backend`
3. Build command: `pip install -r requirements.txt`
4. Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Add environment variables

### Database → Neon (PostgreSQL)
1. Create a Neon project
2. Copy the connection string
3. Set as `DATABASE_URL` in Render environment variables

---

## Screenshots

### Landing Page
> Dark, grid-based hero with stats, how it works, and feature cards

### Upload & Analyze
> 50/50 split layout — resume upload on left, job description on right

### Results Dashboard
> Multi-column layout — before/after resumes, AI suggestions, cover letter on left | ATS score, skills, downloads on right

### History
> Table view of all past analyses with ATS scores and delete functionality

---

## Author

**Aryan Shekhawat**
- GitHub: [@Aryan-1947](https://github.com/Aryan-1947)
- LinkedIn: [aryan-shekhawat](https://linkedin.com/in/aryan-shekhawat-bb26902b8)
- Email: aryanshekhawat1947@gmail.com

---

## License

MIT License — feel free to use this project for learning or portfolio purposes.

---

> Built with React + FastAPI + Groq LLaMA + Auth0