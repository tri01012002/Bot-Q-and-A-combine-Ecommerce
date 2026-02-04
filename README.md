Health E-commerce with Chatbot AI Q&A
Goal Description
Build a Health E-commerce system integrated with a RAG-based (Retrieval-Augmented Generation) Chatbot. The system will provide answers to health-related questions based on reliable medical documents (Ministry of Health guidelines, etc.) and recommend relevant OTC products.

User Review Required
IMPORTANT
Legal Disclaimer: The application must clearly state that the AI advice is for reference only and not a substitute for professional medical advice. Product recommendations are limited to OTC and herbal products.

NOTE
Infrastructure: The plan mimics an existing RAG repo using Jenkins and Kubernetes. This is complex for a solo project but valuable for learning/portfolio. Enure sufficient local resources (RAM/CPU) for running LLMs and K8s locally.

Proposed Architecture
Backend (Python/FastAPI)
API Layer: FastAPI to serve endpoints for Chat (/chat) and E-commerce operations.
RAG Engine: LangChain to manage the pipeline (PDF -> Chunking -> Embedding -> Retrieval -> LLM).
Vector DB: Weaviate (running in Docker) to store document embeddings.
LLM: Vistral-7B-Chat (or similar quantization friendly model) for Vietnamese support.
Recommendation Engine: Scikit-learn or keyword matching to link chat context to products.
Frontend (React/Next.js)
UI: Based on user's existing E-commerce repo (React + Tailwind).
Chat Interface: A floating or dedicated chat component interacting with the FastAPI backend.
Data
PostgreSQL: Relational DB for Product catalog, Orders, Users.
Weaviate: Vector DB for medical document chunks.
DevOps
Docker: Containerization of all services.
Kubernetes: Orchestration (Minikube locally, GKE potentially).
Jenkins: CI/CD pipeline automation.

Detailed Phased Plan
Phase 1: Core RAG Setup
[NEW] backend/: Python project structure.
[NEW] data/: Directory for medical PDFs.
Setup Weaviate and verify connection.
Develop script to ingest PDFs and store vectors.
Test basic RAG retrieval in Jupyter Notebook.

Phase 2: E-commerce Integration
Clone/Copy existing frontend code to frontend/.
Setup PostgreSQL database and seed with sample OTC products.
Create FastAPI endpoints:
POST /api/chat: Handles user query -> RAG -> Product Rec -> Response.
GET /api/products: Standard e-commerce listing.
Connect Frontend to these endpoints.

Phase 3 & 4: Deployment & Scale
Create Dockerfile for Backend and Frontend.
Create docker-compose.yml for unified local dev.
Setup Helmet charts and Jenkins pipeline.
Verification Plan
Automated Tests
Unit tests for API endpoints (FastAPI TestClient).
RAG retrieval quality checks (manual evaluation set).
Manual Verification
Verify strictly non-hallucinated answers for medical queries.
Verify relevance of product recommendations (e.g., "headache" -> "pain reliever").

