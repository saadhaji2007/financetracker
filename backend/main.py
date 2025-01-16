from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
import os
from datetime import timedelta
import models
import schemas
import auth
from database import engine, SessionLocal

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Finance Tracker API")

# Configure CORS with environment variable
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3002")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to get database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Authentication endpoints
@app.post("/register", response_model=schemas.User)
def register_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = auth.get_user(db, email=user.email)
    if db_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )
    
    hashed_password = auth.get_password_hash(user.password)
    db_user = models.User(
        email=user.email,
        username=user.username,
        full_name=user.full_name,
        hashed_password=hashed_password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.post("/token", response_model=schemas.Token)
async def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    user = auth.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/users/me", response_model=schemas.User)
async def read_users_me(
    current_user: models.User = Depends(auth.get_current_active_user)
):
    return current_user

# Transaction endpoints
@app.post("/transactions/", response_model=schemas.Transaction)
def create_transaction(
    transaction: schemas.TransactionCreate,
    current_user: models.User = Depends(auth.get_current_active_user),
    db: Session = Depends(get_db)
):
    db_transaction = models.Transaction(**transaction.dict(), user_id=current_user.id)
    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)
    return db_transaction

@app.get("/transactions/", response_model=List[schemas.Transaction])
def get_transactions(
    skip: int = 0,
    limit: int = 100,
    current_user: models.User = Depends(auth.get_current_active_user),
    db: Session = Depends(get_db)
):
    transactions = db.query(models.Transaction).filter(
        models.Transaction.user_id == current_user.id
    ).offset(skip).limit(limit).all()
    return transactions

# Budget endpoints
@app.post("/budgets/", response_model=schemas.Budget)
def create_budget(
    budget: schemas.BudgetCreate,
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    db_budget = models.Budget(**budget.dict(), user_id=current_user.id)
    db.add(db_budget)
    db.commit()
    db.refresh(db_budget)
    return db_budget

@app.get("/budgets/", response_model=List[schemas.Budget])
def get_budgets(
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    return db.query(models.Budget).filter(
        models.Budget.user_id == current_user.id,
        models.Budget.is_active == True
    ).all()

@app.delete("/budgets/{budget_id}")
def delete_budget(
    budget_id: int,
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    budget = db.query(models.Budget).filter(
        models.Budget.id == budget_id,
        models.Budget.user_id == current_user.id
    ).first()
    if not budget:
        raise HTTPException(status_code=404, detail="Budget not found")
    budget.is_active = False
    db.commit()
    return {"message": "Budget deactivated successfully"}

# Savings Goals endpoints
@app.post("/savings-goals/", response_model=schemas.SavingsGoal)
def create_savings_goal(
    goal: schemas.SavingsGoalCreate,
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    db_goal = models.SavingsGoal(**goal.dict(), user_id=current_user.id)
    db.add(db_goal)
    db.commit()
    db.refresh(db_goal)
    return db_goal

@app.get("/savings-goals/", response_model=List[schemas.SavingsGoal])
def get_savings_goals(
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    return db.query(models.SavingsGoal).filter(
        models.SavingsGoal.user_id == current_user.id,
        models.SavingsGoal.is_active == True
    ).all()

@app.delete("/savings-goals/{goal_id}")
def delete_savings_goal(
    goal_id: int,
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    goal = db.query(models.SavingsGoal).filter(
        models.SavingsGoal.id == goal_id,
        models.SavingsGoal.user_id == current_user.id
    ).first()
    if not goal:
        raise HTTPException(status_code=404, detail="Savings goal not found")
    goal.is_active = False
    db.commit()
    return {"message": "Savings goal deactivated successfully"}

@app.get("/")
def read_root():
    return {"message": "Welcome to Finance Tracker API"}
