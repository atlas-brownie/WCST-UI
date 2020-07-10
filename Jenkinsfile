pipeline {
    agent any
    environment {
        HOME = '.'
    }

    stages {
        stage('Notify Start') {
            steps {
                slackSend channel: '#dev-notifications',
                          message: 'Jenkins UI pipeline build started'
            }
        }

        stage('Initialize') {
            steps {
                sh '''
                echo "PATH = ${PATH}"
                echo "${GIT_COMMIT}"
                node -v
                npm -v

                sed -i "s,.*REACT_APP_BENEFITS_API_URL.*,REACT_APP_BENEFITS_API_URL=https://devsrv.mblsto2020.com," .env.production
                sed -i "s/.*REACT_APP_VERSION.*/REACT_APP_VERSION=${GIT_COMMIT}/" .env.production
                '''
            }
        }
        
        stage('Install Packages') {
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
        
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        
        stage('Upload') {
            steps {
                withAWS(region:'us-east-1',credentials:'pchong-aws-credentials') {
                    // Delete files from directory first.
                    s3Delete(bucket:"dev.mblsto2020.com", path:'/')
                    // Upload files from working directory 'dist' in your project workspace
                    s3Upload(bucket:"dev.mblsto2020.com", workingDir:'build/dev', includePathPattern:'**/*');
                }
            }
        }
    }

    post {
		    success {
            slackSend channel: '#dev-notifications',
                      message: 'Jenkins UI pipeline build completed'
        }
		
		    failure {
			      slackSend channel: '#dev-notifications',
					            message: 'Jenkins UI pipeline build failed'
		    }
    }
}
