import re
from enum import Enum
from typing import List, Optional

from pydantic import BaseModel, Field, field_validator
from pydantic_mongo import PydanticObjectId



class User(BaseModel):
    id: PydanticObjectId = Field(alias="_id")
    googleId: str
    email: str
    token: str
    timestamp: int
    caducidad: int

    @field_validator("email")
    def validate_email(cls, v):
        email_regex = re.compile(r"^[\w\.-]+@[\w\.-]+\.[a-zA-Z]{2,}$")
        if not email_regex.match(v):
            raise ValueError("Invalid email format")
        return v


# class UserUpdate(BaseModel):
#     name: Optional[str] = None
#     email: Optional[str] = None

#     @field_validator("email")
#     def validate_email(cls, v):
#         email_regex = re.compile(r"^[\w\.-]+@[\w\.-]+\.[a-zA-Z]{2,}$")
#         if not email_regex.match(v):
#             raise ValueError("Invalid email format")
#         return v


class UserNew(BaseModel):
    googleId: str
    email: str
    token: str
    timestamp: int
    caducidad: int

    @field_validator("email")
    def validate_email(cls, v):
        email_regex = re.compile(r"^[\w\.-]+@[\w\.-]+\.[a-zA-Z]{2,}$")
        if not email_regex.match(v):
            raise ValueError("Invalid email format")
        return v


class UserList(BaseModel):
    users: List[User]