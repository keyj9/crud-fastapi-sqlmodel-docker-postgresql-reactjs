import fastapi
from config.db import engine
from fastapi import status
from fastapi.exceptions import HTTPException
from models.user import User
from sqlmodel import select, Session

user = fastapi.APIRouter()
session = Session(bind=engine)


@user.get("/")
async def fetch_all_users():
    statement = select(User)
    results = session.exec(statement).all()
    return results


@user.post('/', response_model=User, status_code=status.HTTP_201_CREATED)
async def create_a_new_user(user: User):
    new_user = User(name=user.name, email=user.email, password=user.password)
    session.add(new_user)
    session.commit()

    return new_user


@user.get('/{user_id}', response_model=User)
async def get_a_user(user_id: int):
    statement = select(User).where(User.id == user_id)
    result = session.exec(statement).first()

    if result is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)

    return result


@user.put('/{user_id}')
async def edit_a_user(user_id: int, user: User):
    statement = select(User).where(User.id == user_id)
    result = session.exec(statement).first()

    result.name = user.name
    result.email = user.email
    result.password = user.password

    session.commit()
    return result


@user.delete('/{user_id}', status_code=status.HTTP_204_NO_CONTENT)
async def delete_a_user(user_id: int):
    statement = select(User).where(User.id == user_id)
    result = session.exec(statement).one_or_none()
    if result is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="resources not found")

    session.delete(result)
    return result
