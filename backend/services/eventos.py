import os

import pymongo
from bson import ObjectId
from dotenv import load_dotenv
from fastapi import APIRouter, Depends, HTTPException
from models.evento import Evento, EventoList, EventoNew, EventoQuery

load_dotenv()
MONGO_URL = os.getenv("MONGO_URL")
MONGO_DB = os.getenv("MONGO_DB")

eventos_bp = APIRouter(prefix="/eventos", tags=["eventos"])

client = pymongo.MongoClient(MONGO_URL)
db = client.MONGO_DB
eventos = db.eventos

@eventos_bp.get("/")
def get_eventos(query: EventoQuery = Depends()):
    try:
        print(query)
        eventData = eventos.find(query.model_dump(exclude_none=True))
        if eventData is None:
            raise HTTPException(status_code=404, detail="No se encontraron eventos")
        eventosList = EventoList(eventos=[Evento(**evento) for evento in eventData])
        return eventosList

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al obtener los eventos, {e}")

@eventos_bp.get("/{id}")
def get_evento(id: str):
    try:
        evento = eventos.find_one({"_id": ObjectId(id)})
        if evento is None:
            raise HTTPException(status_code=404, detail="Evento no encontrado")
        return Evento(**evento)

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al obtener el evento, {e}")

@eventos_bp.post("/")
def create_evento(evento: EventoNew):
    try:
        evento_res = eventos.insert_one(evento.to_mongo_dict(exclude_none=True))
        raise HTTPException(status_code=201, detail=f"Evento creado exitosamente con el id {evento_res.inserted_id}")

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al crear el evento, {e}")
