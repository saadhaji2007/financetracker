from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional
from models import TransactionType

class UserBase(BaseModel):
    email: EmailStr
    username: str
    full_name: Optional[str] = None

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

class TransactionBase(BaseModel):
    amount: float
    type: TransactionType
    category: str
    description: str

class TransactionCreate(TransactionBase):
    pass

class Transaction(TransactionBase):
    id: int
    date: datetime
    user_id: int

    class Config:
        from_attributes = True

class BudgetBase(BaseModel):
    category: str
    amount: float
    period: str

class BudgetCreate(BudgetBase):
    pass

class Budget(BudgetBase):
    id: int
    user_id: int
    is_active: bool
    created_at: datetime
    spent: float

    class Config:
        from_attributes = True

class SavingsGoalBase(BaseModel):
    name: str
    target_amount: float
    deadline: datetime

class SavingsGoalCreate(SavingsGoalBase):
    pass

class SavingsGoal(SavingsGoalBase):
    id: int
    current_amount: float
    user_id: int
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True
