# Health E-commerce with RAG Chatbot

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub Stars](https://img.shields.io/github/stars/tri01012002/Health-Ecommerce-Chatbot)](https://github.com/tri01012002/Health-Ecommerce-Chatbot/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/tri01012002/Health-Ecommerce-Chatbot)](https://github.com/tri01012002/Health-Ecommerce-Chatbot/network/members)

## Overview

**Health E-commerce with RAG Chatbot** là một hệ thống thương mại điện tử sức khỏe **production-ready**, tích hợp **chatbot hỏi đáp y tế** sử dụng **Retrieval-Augmented Generation (RAG)** và **gợi ý sản phẩm cá nhân hóa**.

Người dùng có thể:
- Hỏi đáp về các vấn đề sức khỏe (triệu chứng, cách phòng ngừa, thông tin bệnh lý thông thường)
- Nhận câu trả lời chính xác dựa trên tài liệu y tế công khai (PDF từ Bộ Y tế Việt Nam, WHO, tài liệu hướng dẫn sức khỏe)
- Được gợi ý các sản phẩm **OTC (thuốc không kê đơn)** và **thảo dược** phù hợp với nội dung cuộc trò chuyện

Dự án được xây dựng dựa trên:
- Kiến trúc RAG production-grade từ repo gốc: [Deploying-RAG-on-Kubernetes-with-Jenkins-for-Legal-Document-Retrieval](https://github.com/nguyenthai-duong/Deploying-RAG-on-Kubernetes-with-Jenkins-for-Legal-Document-Retrieval)
- Phần e-commerce frontend và core từ repo của bạn: [E-commerce](https://github.com/tri01012002/E-commerce)

**Lưu ý quan trọng (Disclaimer)**  
Thông tin y tế chỉ mang **tính tham khảo**, được trích xuất từ các nguồn công khai đáng tin cậy. Ứng dụng **không thay thế** tư vấn của bác sĩ hoặc nhân viên y tế chuyên nghiệp. Chỉ gợi ý các sản phẩm **OTC và thảo dược**, không liên quan đến thuốc kê đơn. Người dùng chịu trách nhiệm khi sử dụng thông tin từ hệ thống.

## Key Features

- **Chatbot hỏi đáp y tế (RAG)**: Trả lời dựa trên tài liệu thực tế, giảm thiểu hallucination
- **Gợi ý sản phẩm thông minh**: Dựa trên nội dung trò chuyện (rule-based + TF-IDF similarity)
- **Thương mại điện tử hoàn chỉnh**:
  - Duyệt sản phẩm, tìm kiếm, lọc theo danh mục
  - Giỏ hàng, thanh toán (mock hoặc tích hợp VNPay)
  - Đăng nhập / đăng ký người dùng
- **Tự động ingest tài liệu**: Upload PDF → tự động xử lý, embedding, indexing vào Weaviate
- **Triển khai production-grade**:
  - Kubernetes (GKE) + Helm charts
  - CI/CD tự động với Jenkins
  - Monitoring & Observability đầy đủ (Prometheus, Grafana, Loki, Jaeger)
- **Tối ưu tiếng Việt**: Sử dụng embedding và LLM chuyên biệt cho tiếng Việt

## Architecture
User → React Frontend (E-commerce + Chat UI)
↓
FastAPI Backend (/chat, /products, /cart)
↓
RAG Pipeline:

Embed query (vietnamese-embedding)
Retrieve context (Weaviate)
Generate answer (Vistral-7B-Chat)
Extract keywords → Recommend products (PostgreSQL)
↓
Observability: Prometheus / Grafana / Loki / Jaeger
Deployment: Docker → Kubernetes (GKE) ← Jenkins CI/CD
Data Ingestion: GCS → Cloud Functions → Pub/Sub → Embedding → Weaviate
## Tech Stack

| Phần                  | Công nghệ chính                                                                 |
|-----------------------|---------------------------------------------------------------------------------|
| **Frontend**          | React.js, Tailwind CSS, JavaScript/TypeScript                                   |
| **Backend API**       | FastAPI (Python)                                                                |
| **RAG Pipeline**      | LangChain, HuggingFace Transformers                                             |
| **Embedding**         | dangvantuan/vietnamese-embedding                                                |
| **LLM**               | Vistral-7B-Chat (local inference)                                               |
| **Vector Database**   | Weaviate                                                                        |
| **Product Database**  | PostgreSQL                                                                      |
| **Recommendations**   | Scikit-learn (TF-IDF), rule-based                                               |
| **Ingestion**         | PyPDF2, Google Cloud Storage, Cloud Functions, Pub/Sub                         |
| **Deployment**        | Docker, Kubernetes (GKE), Helm Charts, NGINX Ingress                            |
| **CI/CD**             | Jenkins (custom image), GitHub webhook                                          |
| **IaC**               | Terraform (GKE cluster), Ansible (Jenkins VM)                                   |
| **Observability**     | Prometheus + Grafana, Loki (logs), Jaeger + OpenTelemetry (tracing)            |
| **Testing**           | Locust (load test), Jupyter notebooks                                           |

## Getting Started

### Prerequisites
- Python 3.10+
- Node.js 18+
- Docker & Docker Compose
- Minikube (cho test local) hoặc GCP account (free tier)
- Git clone repo E-commerce của bạn để tích hợp frontend

### Local Development

1. **Clone repository**
   ```bash
   git clone https://github.com/tri01012002/Health-Ecommerce-Chatbot.git
   cd Health-Ecommerce-Chatbot
Backend setup
python -m venv env
source env/bin/activate    # Windows: env\Scripts\activate
pip install -r requirements.txt
Frontend setup
cd frontend
npm install
Start databases
docker-compose up -d postgres weaviate
Run backend
uvicorn app.main:app --reload
Run frontend
cd frontend
npm start
Mở trình duyệt tại: http://localhost:3000

Production Deployment (GCP)
Cấu hình GCP credentials
Tạo infra:
cd terraform
terraform init
terraform apply
Provision Jenkins VM (Ansible)
Push code → Jenkins tự build & deploy Helm charts lên GKE
Upload PDF y tế lên GCS bucket để tự động ingest
Contributing
Fork repository
Tạo branch: git checkout -b feature/amazing-feature
Commit thay đổi: git commit -m 'Add amazing feature'
Push branch: git push origin feature/amazing-feature
Mở Pull Request
Lessons Learned
Sử dụng mô hình embedding/LLM tiếng Việt giúp tăng đáng kể chất lượng trả lời trong lĩnh vực y tế
Chạy LLM local trên CPU vẫn khả thi nhưng cần tối ưu prompt và chunk size
Tích hợp e-commerce + RAG đòi hỏi thiết kế API rõ ràng giữa frontend và AI backend
Monitoring và tracing rất quan trọng khi triển khai RAG production
License
Distributed under the MIT License. See LICENSE for more information.

Contact
Nguyen Minh Tri
Email: tringuyen.01012002@gmail.com
GitHub: @tri01012002
