import os

import pymongo
from bson import ObjectId
from dotenv import load_dotenv
from fastapi import APIRouter, Depends, HTTPException
from models.marcador import (Marcador, MarcadorList, MarcadorNew)
from pymongo import MongoClient

load_dotenv()
MONGO_URL = os.getenv("MONGO_URL")
    

marcadores_bp = APIRouter(prefix="/marcadores", tags=["marcardores"])

# Configuración de MongoDB
client = MongoClient(MONGO_URL)
db = client.ParcialWeb
marcadores = db.marcadores

@marcadores_bp.get("/")
def get_marcadores():
    try:
        marcadorData = marcadores.find()
        if marcadorData is None:
            raise HTTPException(status_code=404, detail="No se encontraron marcadores")
        marcadoresList = MarcadorList(marcadores=[Marcador(**marcador) for marcador in marcadorData])
        return marcadoresList

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al obtener los marcadores, {e}")

@marcadores_bp.get("/{id}")
def get_marcador(id: str):
    try:
        marcador = marcadores.find_one({"_id": ObjectId(id)})
        if marcador is None:
            raise HTTPException(status_code=404, detail="Marcador no encontrado")
        return Marcador(**marcador)

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al obtener el marcador, {e}")

@marcadores_bp.post("/")
def create_marcador(marcador: MarcadorNew):
    try:
        marcador_res = marcadores.insert_one(marcador.to_mongo_dict(exclude_none=True))
        raise HTTPException(status_code=201, detail=f"Marcador creado exitosamente con el id {marcador_res.inserted_id}")

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al crear el marcador, {e}")

