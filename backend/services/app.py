import os

import uvicorn
# from archivos import archivos_bp
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# from mapas import mapas_bp
from usuarios import usuarios_router

load_dotenv()

app = FastAPI()

# Registrar los microservicios como Blueprints
# app.include_router(mapas_bp)
app.include_router(archivos_bp)
app.include_router(usuarios_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ejecutar la aplicación FastAPI
if __name__ == "__main__":
    puerto = os.getenv("PORT") or 8000
    if puerto:
        puerto = int(puerto)
        uvicorn.run("app:app", host="0.0.0.0", port=puerto, reload=True)
