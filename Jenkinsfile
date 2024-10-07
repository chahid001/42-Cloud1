pipeline {

    agent any

    environment {
        GCP_KEY = credentials('GCP_KEY')
        PROJECT_ID = credentials('PROJECT_ID')
        GOOGLE_CREDENTIALS = credentials('GOOGLE_CREDENTIALS')
        PROJECT_NB = vault(path: 'secret/infrastructure', key: 'PROJECT_NB')
        PUBLIC_KEY = vault(path: 'secret/infrastructure', key: 'PUBLIC_KEY') 
        PRIVATE_KEY_PATH = vault(path: 'secret/infrastructure', key: 'PRIVATE_KEY_PATH')
        PRIVATE_KEY = vault(path: 'secret/infrastructure', key: 'PRIVATE_KEY')
        
        ANSIBLE_INVENTORY_PATH = "Ansible/Inventories/hosts.ini"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        // stage('Auth with GCP') {
        //     steps {

        //     }
        // }

        stage('Install Infrastructure Dependencies') {
            steps {
                script {
                    dir('Infrastructure') {
                        sh 'npm i'
                    }
                }
            }
        }

        stage('Deploy GCP Infrastructure') {
            steps {
                script {
                    dir('Infrastructure') {
                        sh 'gcloud auth activate-service-account --key-file=${GCP_KEY}'
                        sh 'gcloud config set project ${PROJECT_ID}'
                        // sh 'sudo chown -R root:jenkins ${PRIVATE_KEY_PATH}'
                        sh 'sudo export GOOGLE_CREDENTIALS=${GOOGLE_CREDENTIALS}'
                        sh 'sudo -E cdktf apply "*" --auto-approve'
                        def publicIp = sh(script: 'terraform output -raw public_ip', returnStdout: true).trim()
                        env.PUBLIC_IP = publicIp

                        echo "Public IP: ${env.PUBLIC_IP}"
                    }
                }
            }
        }

        // stage('Update Ansible Inventory') {
        //     steps {
        //         script {
        //             sh "sed -i 's/PUBLICIP/${env.PUBLIC_IP}/g' ${ANSIBLE_INVENTORY_PATH}"
        //         }
        //     }
        // }

        // stage('')
    }


}