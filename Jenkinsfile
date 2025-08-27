pipeline {
  agent any
  environment {
    DOCKERHUB_USER = 'mudabbir1187'
    IMAGE_NAME     = 'proj1-node-app1'
    IMAGE_TAG      = "v${env.BUILD_NUMBER}"
    LATEST_TAG     = 'latest'
    K8S_DIR        = 'k8s'
  }
  options { timestamps() }

  stages {
    stage('Checkout') {
      steps { checkout scm }
    }
    stage('Build Image') {
      steps {
        bat """
          docker build -t %DOCKERHUB_USER%/%IMAGE_NAME%:%IMAGE_TAG% .
          docker tag  %DOCKERHUB_USER%/%IMAGE_NAME%:%IMAGE_TAG% %DOCKERHUB_USER%/%IMAGE_NAME%:%LATEST_TAG%
        """
      }
    }
    stage('Login & Push') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
          bat """
            echo %PASS% | docker login -u %USER% --password-stdin
            docker push %DOCKERHUB_USER%/%IMAGE_NAME%:%IMAGE_TAG%
            docker push %DOCKERHUB_USER%/%IMAGE_NAME%:%LATEST_TAG%
          """
        }
      }
    }
    stage('Deploy to Kubernetes') {
      steps {
        bat """
          kubectl config use-context docker-desktop
          kubectl apply -f %K8S_DIR%/deployment.yaml
          kubectl apply -f %K8S_DIR%/service.yaml
        """
      }
    }
    stage('Verify') {
      steps {
        bat "kubectl get pods -o wide"
        bat "kubectl get svc proj1-node-app-svc -o wide"
      }
    }
  }
}
