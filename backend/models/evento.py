from datetime import datetime
from typing import List, Optional

from models.baseMongo import MongoBase
from pydantic import BaseModel, Field, field_validator
from pydantic_mongo import PydanticObjectId


class Evento(BaseModel, MongoBase):
    id: PydanticObjectId = Field(alias="_id")
    nombre: str
    timestamp: datetime
    lugar: str
    lat: str
    lon: str
    organizador: str
    imagen: str

class EventoNew(BaseModel, MongoBase):
    nombre: str
    timestamp: datetime
    lugar: str
    lat: str
    lon: str
    organizador: str
    imagen: str

class EventoUpdate(BaseModel, MongoBase):
    nombre: Optional[str] = None
    timestamp: Optional[datetime] = None
    lugar: Optional[str] = None
    lat: Optional[str] = None
    lon: Optional[str] = None
    organizador: Optional[str] = None
    imagen: Optional[str] = None

class EventoQuery(BaseModel):
    nombre: Optional[str] = None
    timestamp: Optional[datetime] = None
    lugar: Optional[str] = None
    lat: Optional[str] = None
    lon: Optional[str] = None
    organizador: Optional[str] = None
    imagen: Optional[str] = None

    @field_validator("nombre")
    def regex_nombre(cls, v):
        if v is not None:
            return {"$regex": v, "$options": "i"}
        return v

    @field_validator("lugar")
    def regex_lugar(cls, v):
        if v is not None:
            return {"$regex": v, "$options": "i"}
        return v

class EventoList(BaseModel):
    eventos: List[Evento]
