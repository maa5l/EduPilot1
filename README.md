# 🚀 EduPilot – Blackboard Prototype

## Languages & Technologies Used

This project is built using:

- **Frontend**: React (Vite), TypeScript, Tailwind CSS, Lucide Icons
- **Backend**: Python 3.10+, FastAPI
- **Core Modules**: PDF Extractor, Logic Rule Engine
- **Database/Auth**: Supabase (Optional - supports demo mode without it)

---

## How to Run the Project Locally

1. Clone or download the project repository.

2. Make sure these main folders are in the project root:
   - `backend/` (Contains the Python FastAPI server and logic)
   - `frontend/` (Contains the React web application interface)

3. Follow these steps to run both parts:

### Part 1: Start the Backend Server
Open your terminal and run:
```bash
cd backend
python -m venv venv
source venv/bin/activate || .\venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
The backend API will be live at: http://127.0.0.1:8000

Part 2: Start the Frontend Interface
Open a new terminal window and run:

Bash
cd frontend
npm install
npm run dev
Open the local URL provided in your terminal (usually http://localhost:5173) in your browser.

Recommended Browsers
For the best pixel-perfect dashboard experience, use:

Google Chrome

Microsoft Edge

Safari

Important Note
The system is designed to process academic records dynamically. When testing, make sure to upload a valid transcript file (.pdf) so that the PDF Extractor and Rule Engine can analyze and generate your proactive academic path recommendations correctly.
