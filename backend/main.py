from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Optional
import os
from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings
# from langchain.chains import RetrievalQA # Not utilizing chain yet in manual flow
from database import SessionLocal, Product

app = FastAPI(title="Health E-commerce Chatbot API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For dev only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# DB Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Pydantic Models for Response
class ProductOut(BaseModel):
    id: int
    name: str
    description: str
    price: float
    image_url: Optional[str] = None
    category: Optional[str] = None
    
    class Config:
        from_attributes = True

# Global variables
vector_db = None
embeddings = None
retriever = None

# Config
VECTOR_DB_PATH = "faiss_index"
EMBEDDING_MODEL_NAME = "dangvantuan/vietnamese-embedding"

class ChatRequest(BaseModel):
    message: str
    history: Optional[List[dict]] = []

class ProductRecommendation(BaseModel):
    id: int
    name: str
    reason: str

class ChatResponse(BaseModel):
    answer: str
    sources: List[str]
    recommendations: List[ProductRecommendation]

@app.on_event("startup")
async def startup_event():
    global vector_db, embeddings, retriever
    print("Loading RAG resources...")
    
    # Load Embeddings
    try:
        embeddings = HuggingFaceEmbeddings(model_name=EMBEDDING_MODEL_NAME)
        print("Embeddings loaded.")
        
        # Load Vector Store
        if os.path.exists(VECTOR_DB_PATH):
            vector_db = FAISS.load_local(VECTOR_DB_PATH, embeddings, allow_dangerous_deserialization=True)
            retriever = vector_db.as_retriever(search_kwargs={"k": 3})
            print("Vector store loaded.")
        else:
            print("WARNING: Vector store not found. Please run ingest.py first.")
            
    except Exception as e:
        print(f"Error loading resources: {e}")

@app.get("/")
def read_root():
    return {"status": "ok", "message": "Health Chatbot API is running"}

@app.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    if not retriever:
        raise HTTPException(status_code=503, detail="RAG system not initialized")
    
    query = request.message
    
    # 1. Retrieve Context
    docs = retriever.get_relevant_documents(query)
    context_text = "\n\n".join([d.page_content for d in docs])
    
    # 2. LLM Generation (Mock for now to prove pipeline)
    # Ideally: answer = llm.generate(prompt(query, context))
    # For Phase 1 Prototype: Return context + dummy advice
    
    answer = f"Based on our medical guidelines:\n\n{context_text[:500]}...\n\n(Disclaimer: Please consult a doctor.)"
    
    # 3. Product Recommendations (Simple Keyword Match)
    recommendations = []
    lower_query = query.lower()
    
    # Mock Product DB - Expanded
    keyword_map = {
        "headache": [
            {"id": 1, "name": "Herbal Tea", "reason": "Helps relax and reduce tension."},
            {"id": 2, "name": "Paracetamol", "reason": "OTC pain reliever for headaches."}
        ],
        "dau dau": [ # Vietnamese for headache
            {"id": 1, "name": "Tra Thao Moc", "reason": "Gium giam cang thang."},
            {"id": 2, "name": "Paracetamol", "reason": "Giam dau dau."}
        ],
        "fever": [
            {"id": 2, "name": "Paracetamol", "reason": "Reduces fever effectively."},
            {"id": 3, "name": "Cooling Patch", "reason": "Physical cooling aid."}
        ],
        "sot": [ # Vietnamese for fever
            {"id": 2, "name": "Paracetamol", "reason": "Ha sot hieu qua."},
            {"id": 3, "name": "Mieng dan ha sot", "reason": "Ho tro ha sot."}
        ],
        "stomach": [
            {"id": 4, "name": "Ginger Tea", "reason": "Soothes stomach upset."},
            {"id": 5, "name": "Antacid", "reason": "Relieves heartburn."}
        ],
        "dau bung": [
            {"id": 4, "name": "Tra Gung", "reason": "Lam am bung, giam dau."},
            {"id": 5, "name": "Thuoc da day", "reason": "Giam axit da day."}
        ],
        "flu": [
            {"id": 6, "name": "Vitamin C", "reason": "Boosts immune system."},
            {"id": 7, "name": "Cough Syrup", "reason": "Relieves cough."}
        ],
        "cum": [
             {"id": 6, "name": "Vitamin C", "reason": "Tang cuong mien dich."},
             {"id": 7, "name": "Siro ho", "reason": "Giam ho."}
        ]
    }
    
    for key, products in keyword_map.items():
        if key in lower_query:
            for p in products:
                # Avoid duplicates
                if not any(r.id == p['id'] for r in recommendations):
                    recommendations.append(ProductRecommendation(**p))

        
    return ChatResponse(
        answer=answer,
        sources=[d.metadata.get("source", "unknown") for d in docs],
        recommendations=recommendations
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

@app.get('/products', response_model=List[ProductOut])
def get_products(db: Session = Depends(get_db)):
    products = db.query(Product).all()
    return products
