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
                    echo "Building Docker image..."
                    docker.build("${IMAGE_NAME}:${env.BUILD_NUMBER}", ".")
                }
            }
        }

        stage('Cleanup Old Container') {
            steps {
                script {
                    echo "Stopping and removing old container (if exists)..."
                    bat """
                    docker stop ${CONTAINER_NAME} 2>nul || echo No running container found
                    docker rm ${CONTAINER_NAME} 2>nul || echo No container to remove
                    exit /b 0
                    """
                }
            }
        }

        stage('Run Updated Container') {
            steps {
                script {
                    echo "Running updated container on port ${PORT}..."
                    bat """
                    docker run -d -p ${PORT}:${PORT} --name ${CONTAINER_NAME} ${IMAGE_NAME}:${env.BUILD_NUMBER}
                    """
                }
            }
        }

        stage('Verify Deployment') {
            steps {
                script {
                    echo "Verifying container status..."
                    bat "docker ps"
                }
            }
        }
    }

    post {
        success {
            echo "✅ Chat App successfully built and running on port 8080!"
        }
        failure {
            echo "❌ Build or deployment failed. Please check logs."
        }
    }
}
