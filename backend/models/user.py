from sqlmodel import SQLModel, Field, MetaData
from typing import Optional
from config.db import engine

meta = MetaData
conn = engine.connect()


class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    email: str
    password: str


SQLModel.metadata.create_all(engine)
