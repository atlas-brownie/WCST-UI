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
        
//        stage('Install Packages') {
//            steps {
//                sh 'npm install'
//                sh 'npm audit fix'
//            }
//        }
        
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
        
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        
        stage('Upload') {
            steps {
                withAWS(region:'us-east-1',credentials:'pchong-aws-credentials') {
                    // Delete files from directory first.
                    s3Delete(bucket:"dev.mblsto2020.com", path:'**/*')
                    // Upload files from working directory 'dist' in your project workspace
                    s3Upload(bucket:"dev.mblsto2020.com", workingDir:'build', includePathPattern:'**/*');
                }
            }
        }
        
        stage('Slack') {
            steps {
                slackSend channel: '#dev-notifications',
                          message: 'Jenkins pipeline build completed'
            }
        }
    }
}
