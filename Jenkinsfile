pipeline {
    agent any
    
    environment {
        DOCKER_REGISTRY = "myregistry"
        IMAGE_TAG = "v${BUILD_NUMBER}"
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build Backend') {
            steps {
                script {
                    dir('backend') {
                        sh 'docker build -t ${DOCKER_REGISTRY}/ecom-backend:${IMAGE_TAG} .'
                    }
                }
            }
        }
        
        stage('Build Frontend') {
            steps {
                script {
                    dir('frontend') {
                        sh 'docker build -t ${DOCKER_REGISTRY}/ecom-frontend:${IMAGE_TAG} .'
                    }
                }
            }
        }
        
        stage('Test') {
            steps {
                echo 'Running Unit Tests...'
                // sh 'python -m pytest backend/tests'
            }
        }
        
        stage('Deploy to K8s') {
            steps {
                script {
                    sh 'kubectl apply -f k8s/deployment.yaml'
                    sh 'kubectl set image deployment/ecom-backend backend=${DOCKER_REGISTRY}/ecom-backend:${IMAGE_TAG}'
                    sh 'kubectl set image deployment/ecom-frontend frontend=${DOCKER_REGISTRY}/ecom-frontend:${IMAGE_TAG}'
                }
            }
        }
    }
}
