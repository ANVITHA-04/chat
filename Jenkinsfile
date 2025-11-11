pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'master', url: 'https://github.com/ANVITHA-04/chat.git'
            }
        }

        stage('Verify Files') {
            steps {
                bat 'dir'
            }
        }

        stage('Cleanup Old Containers') {
            steps {
                script {
                    echo "Stopping and removing any existing chat-app container..."
                    bat 'docker stop chat-app || echo "No container to stop"'
                    bat 'docker rm chat-app || echo "No container to remove"'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    def dockerImage = docker.build("chat-app:${env.BUILD_NUMBER}", ".")
                }
            }
        }

        stage('Run Container') {
            steps {
                script {
                    echo "Running new chat-app container on port 3000..."
                    bat 'docker run -d -p 3000:3000 --name chat-app chat-app:${env.BUILD_NUMBER}'
                }
            }
        }
    }
}
