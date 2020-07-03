pipeline {
  agent any
  environment {
    HOME = '.'
  }
  
  stages {
    stage('Initialize') {
      steps {
        sh '''
          echo "PATH = ${PATH}"
          node -v
          npm -v
        '''
      }
    }

    stage('Build') {
      steps {
        sh 'npm install'
        sh 'npm audit fix'
      }
    }

    stage('Test') {
      steps {
        sh 'npm run test'
      }
    }

//    stage('tests') {
//        withEnv(["JEST_JUNIT_OUTPUT=./jest-test-results.xml"]) {
//            sh 'npm test -- --ci --testResultsProcessor="jest-junit"'
//        }
//        junit 'jest-test-results.xml'
//    }
      
    stage('Code Quality') {
      steps {
        script {
          def scannerHome = tool 'SonarQube';
          withSonarQubeEnv("SonarQubeServer") {
            sh "${tool("SonarQube")}/bin/sonar-scanner"
            }
          }
        }
     }

    stage('Cleanup Old Docker Artifacts'){
      steps{
        sh 'docker image prune -f'
        sh 'docker volume prune -f'
        sh 'docker container prune -f'
      }
    }

    stage('Build Docker Image'){
      steps {
        script {
          docker.build('wcst-ui')
          }
      }
    }
    
    stage('Deploy Docker Image on AWS'){
      steps {
        script{
          docker.withRegistry('https://494587492891.dkr.ecr.us-east-1.amazonaws.com/wcst-ui', 'ecr:us-east-1:pchong-aws-credentials'){
            docker.image('wcst-ui').push('latest')
          }
        }
      }
    }
    
    stage('Remove unused docker image'){
      steps{
        sh "docker image prune -f"
      }
    }
  }
}
