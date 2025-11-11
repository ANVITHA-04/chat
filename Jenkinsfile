pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                // ✅ Use the correct branch name
                git branch: 'master', url: 'https://github.com/ANVITHA-04/chat.git'
            }
        }

        stage('Verify Files') {
            steps {
                // ✅ Optional: helps you confirm that Dockerfile exists in the workspace
                bat 'dir'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // ✅ Explicitly define context as current directory
                    dockerImage = docker.build("chat-app", ".")
                }
            }
        }

        stage('Run Container') {
            steps {
                script {
                    // ✅ Run container with port mapping
                    dockerImage.run('-p 3000:3000')
                }
            }
        }
    }
}
