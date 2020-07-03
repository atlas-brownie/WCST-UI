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

    stage('Upload'){
        dir('/var/lib/jenkins/workspace/WCST-UI-Dev'){
            pwd(); //Log current directory
            withAWS(region:'us-east-1',credentials:'pchong-aws-credentials') {
                 def identity=awsIdentity();//Log AWS credentials
                // Upload files from working directory 'dist' in your project workspace
                 s3Upload(
                     bucket:"dev.mblsto2020.com",
                     workingDir:'dist',
                     includePathPattern:'**/*'
               );
            }
        };
    }
  }
}
