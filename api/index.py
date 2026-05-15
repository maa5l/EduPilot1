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
    # Import as alias to avoid name conflict with the exported 'app'
    from backend.app import app as fastapi_app
    app = fastapi_app
except Exception as e:
    print(f"Error importing FastAPI app: {e}")
    from fastapi import FastAPI
    app = FastAPI()
    @app.get("/api/health")
    def health():
        return {"status": "error", "message": str(e)}

# Export as handler too just in case
handler = app
