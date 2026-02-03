from sqlalchemy import create_engine, Column, Integer, String, Float, Text
from sqlalchemy.orm import DeclarativeBase, sessionmaker

SQL_ALCHEMY_DATABASE_URL = "sqlite:///./ecom.db"
# For PostgreSQL: "postgresql://user:password@localhost/dbname"

engine = create_engine(
    SQL_ALCHEMY_DATABASE_URL, 
    connect_args={"check_same_thread": False} # Only for SQLite
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

class Base(DeclarativeBase):
    pass

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(Text)
    price = Column(Float)
    image_url = Column(String)
    category = Column(String, index=True) # e.g., "OTC", "Herbal", "Supplement"

def init_db():
    Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
