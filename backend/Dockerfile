FROM python:3.10-slim

WORKDIR /app

# Install system dependencies (for building some python packages)
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy source code
COPY . .

# Expose port
EXPOSE 8000

# Run commands
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
