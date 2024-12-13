from datetime import datetime
from typing import List, Optional

from models.baseMongo import MongoBase
from pydantic import BaseModel, Field, field_validator
from pydantic_mongo import PydanticObjectId


class Marcador(BaseModel, MongoBase):
    id: PydanticObjectId = Field(alias="_id")
    email : str
    lugar: str
    lat: str
    lon: str
    imagen: str

class MarcadorNew(BaseModel, MongoBase):
    email: str
    lugar: str
    lat: str
    lon: str
    imagen: str

class MarcadorList(BaseModel):
    marcadores: List[Marcador]
