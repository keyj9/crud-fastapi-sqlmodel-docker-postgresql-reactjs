from sqlmodel import create_engine

conn_str = "postgresql://postgres:password@localhost:5432/sqlmodeldb"
engine = create_engine(conn_str, echo=True)
conn = engine.connect()
