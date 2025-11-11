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
                    // ✅ Wrap commands to ignore errors safely in Windows
                    bat '''
                    @echo off
                    echo Checking for existing chat-app container...
                    docker stop chat-app 2>nul || echo No container to stop
                    docker rm chat-app 2>nul || echo No container to remove
                    exit /b 0
                    '''
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
                    bat "docker run -d -p 8080:3000 --name chat-app chat-app:${env.BUILD_NUMBER}"

                }
            }
        }
    }
}
