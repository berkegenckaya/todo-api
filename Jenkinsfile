pipeline {
  agent any

  environment {
    IMAGE = 'todo-api'
    TAG   = "${env.BUILD_NUMBER}"
  }

  stages {
    stage('Checkout') {
      steps { checkout scm }
    }

    stage('Build and Test') {
      steps { sh 'docker build -t $IMAGE:$TAG .' }
    }

    stage('Show Image') {
      steps { sh 'docker images $IMAGE' }
    }
  }

  post {
    success { echo 'Pipeline basarili' }
    failure { echo 'Pipeline kirildi' }
  }
}