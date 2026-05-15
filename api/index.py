import sys
import os
from pathlib import Path

# Add project root to sys.path
root_path = Path(__file__).parent.parent
if str(root_path) not in sys.path:
    sys.path.append(str(root_path))

# Also add backend for nested imports inside backend/app.py
backend_path = str(root_path / "backend")
if backend_path not in sys.path:
    sys.path.append(backend_path)

try:
    # Use absolute import from the root
    from backend.app import app
    # Export for Vercel
    handler = app
except Exception as e:
    print(f"Error importing FastAPI app: {e}")
    from fastapi import FastAPI
    handler = FastAPI()
    @handler.get("/api/health")
    def health():
        return {"status": "error", "message": str(e)}
