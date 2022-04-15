try:
    from fastapi import FastAPI
    from sqlmodel import Session
    from fastapi.middleware.cors import CORSMiddleware
    from routes.user import user
    from config.db import engine
except Exception as e:
    print("some modules are missing".format(e))

session = Session(bind=engine)

app = FastAPI(debug=True)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_headers=["*"],
    allow_methods=["*"],
)
app.include_router(user)
