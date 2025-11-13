pipeline {
    agent any

    environment {
        IMAGE_NAME = "chat-app"
        CONTAINER_NAME = "chat-app"
        PORT = "8080"
    }

    stages {

        stage('Clone Repository') {
            steps {
                git branch: 'master', url: 'https://github.com/ANVITHA-04/chat.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    echo "🛠 Building Docker image..."
                    docker.build("${IMAGE_NAME}:${env.BUILD_NUMBER}", ".")
                }
            }
        }

        stage('Cleanup Old Container') {
            steps {
                script {
                    echo "🧹 Cleaning old container..."
                    bat """
                    docker stop ${CONTAINER_NAME} 2>nul || echo No running container
                    docker rm ${CONTAINER_NAME} 2>nul || echo No old container
                    exit 0
                    """
                }
            }
        }

        stage('Run Updated Container') {
            steps {
                script {
                    echo "🚀 Running container on port ${PORT}..."
                    bat """
                    docker run -d -p ${PORT}:${PORT} --name ${CONTAINER_NAME} ${IMAGE_NAME}:${env.BUILD_NUMBER}
                    """
                }
            }
        }

        stage('Verify Deployment') {
            steps {
                script {
                    bat "docker ps"
                }
            }
        }
    }

    post {
        success {
            echo "✅ Chat App deployed successfully on http://localhost:8080 🚀"
        }
        failure {
            echo "❌ Deployment failed. Check Jenkins logs."
        }
    }
}
