# Health E-commerce with RAG Chatbot (Bot Q&A + E-commerce)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub Stars](https://img.shields.io/github/stars/tri01012002/Bot-Q-and-A-combine-Ecommerce?style=social)](https://github.com/tri01012002/Bot-Q-and-A-combine-Ecommerce/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/tri01012002/Bot-Q-and-A-combine-Ecommerce?style=social)](https://github.com/tri01012002/Bot-Q-and-A-combine-Ecommerce/network/members)

## Overview

A **production-ready health e-commerce platform** integrated with an **AI-powered RAG Chatbot** for medical question-answering and intelligent product recommendations.

Users can:
- Ask health-related questions and receive accurate, context-grounded answers from reliable public medical documents (Ministry of Health Vietnam, WHO guidelines, etc.)
- Receive personalized suggestions for **OTC medicines** and **herbal products** based on the content of the conversation
- Browse products, add to cart, manage orders, and complete purchases through a modern e-commerce interface

### Core Inspirations
- **RAG pipeline & production deployment** adapted from:  
  [Deploying RAG on Kubernetes with Jenkins for Legal Document Retrieval](https://github.com/nguyenthai-duong/Deploying-RAG-on-Kubernetes-with-Jenkins-for-Legal-Document-Retrieval)
- **E-commerce frontend & core features** extended from your existing repo:  
  [tri01012002/E-commerce](https://github.com/tri01012002/E-commerce)

**Important Disclaimer**  
This project is for **educational and demonstration purposes only**.  
All medical information is sourced from public documents and **is not a substitute** for professional medical advice.  
Always consult a qualified healthcare provider for any health concerns.  
Product recommendations are limited to **OTC (over-the-counter)** and herbal products — **no prescription medicines** are included.

## Key Features

- RAG-powered medical Q&A chatbot with hallucination reduction via context retrieval
- Context-aware product recommendations (rule-based + TF-IDF similarity matching)
- Full e-commerce flow: product catalog, search, cart, user authentication (JWT), payment gateway (mock / VNPay-ready)
- Automated document ingestion pipeline for health PDFs
- Scalable Kubernetes deployment (GKE) with Helm
- CI/CD pipeline via Jenkins
- End-to-end observability (Prometheus, Grafana, Loki, Jaeger)

## Architecture Overview

1. **Ingestion Pipeline**  
   PDF upload to GCS → Cloud Function trigger → chunking (PyPDF2) → embedding → indexing to Weaviate

2. **Query & Recommendation Flow**  
   User message → FastAPI → embed query → retrieve context from Weaviate → LLM generation → keyword/context extraction → match products (PostgreSQL) → return answer + product suggestions

3. **E-commerce Flow**  
   React frontend ↔ API (products, cart, orders)

4. **Deployment & CI/CD**  
   Terraform → GKE cluster  
   Ansible → Jenkins provisioning  
   Git push → Jenkins builds Docker images → deploys Helm charts

## Tech Stack

| Layer                | Technologies                                                                 |
|----------------------|------------------------------------------------------------------------------|
| Frontend             | React.js, Tailwind CSS, JavaScript/TypeScript                                |
| Backend (API)        | FastAPI (Python), Node.js (extended from original e-commerce)                |
| RAG Framework        | LangChain, Hugging Face Transformers                                         |
| Embedding Model      | dangvantuan/vietnamese-embedding                                             |
| LLM                  | Vistral-7B-Chat (Vietnamese fine-tuned)                                      |
| Vector Database      | Weaviate                                                                     |
| Product Database     | PostgreSQL                                                                   |
| Recommendations      | Scikit-learn (TF-IDF), rule-based                                            |
| PDF Processing       | PyPDF2                                                                       |
| Containerization     | Docker                                                                       |
| Orchestration        | Kubernetes (GKE), Helm Charts                                                |
| CI/CD                | Jenkins (custom Docker image)                                                |
| Infrastructure       | Terraform, Ansible, GCP (GCS, Cloud Functions, Pub/Sub)                     |
| Observability        | Prometheus + Grafana, Loki (logs), Jaeger + OpenTelemetry (tracing)         |
| Load Testing         | Locust                                                                       |

## Quick Start (Local Development)

### Prerequisites
- Python 3.10+
- Node.js 18+
- Docker & Docker Compose
- Git

### Steps

1. Clone the repository
```bash
git clone https://github.com/tri01012002/Bot-Q-and-A-combine-Ecommerce.git
cd Bot-Q-and-A-combine-Ecommerce
```
2. Set up backend
```bash
python -m venv env
source env/bin/activate          # Windows: env\Scripts\activate
pip install -r requirements.txt
```
3. Set up frontend
```bash
cd frontend
npm install
```
4. Start databases
```bash
docker-compose up -d postgres weaviate
```
5. Run backend
```bash
Bashuvicorn app.main:app --reload
```
6. Run frontend
```bash
Bashcd frontend
npm start
```
- Open browser: http://localhost:3000

### Production Deployment

1. Infrastructure (GKE)
```bash
Bashcd terraform
terraform init
terraform apply
```

2. Jenkins CI/CD
- Provision Jenkins VM using Ansible
- Configure GitHub webhook
- Pipeline: git push → build & push Docker images → deploy Helm charts to GKE

3. Monitoring
Access Grafana dashboard to view metrics, logs, and distributed traces

### Lessons Learned
- Domain-specific Vietnamese embeddings are critical for accurate retrieval in medical/legal contexts
- CPU-only LLM inference requires prompt optimization and caching strategies
- Combining React frontend with Python AI backend works smoothly via well-defined REST APIs
- Full observability stack (Prometheus/Grafana/Loki/Jaeger) significantly speeds up debugging in production
- Load testing (Locust) confirmed stability under 100+ concurrent users

### Contributing
- Fork the repository
- Create your feature branch (git checkout -b feature/amazing-feature)
- Commit your changes (git commit -m 'Add some amazing feature')
- Push to the branch (git push origin feature/amazing-feature)
- Open a Pull Request

### License
MIT License — see the LICENSE file for details.

### Contact
Nguyen Minh Tri
- 📧 tringuyen.01012002@gmail.com
- 🐙 https://github.com/tri01012002


