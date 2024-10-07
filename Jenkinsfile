pipeline {

    agent any

    environment {
        PROJECT_NB = vault(path: 'secret/infrastructure', key: 'PROJECT_NUMBER')
        PUBLIC_KEY = vault(path: 'secret/infrastructure', key: 'PUBLIC_KEY') 
        PRIVATE_KEY_PATH = vault(path: 'secret/infrastructure', key: 'PRIVATE_KEY_PATH')
        PRIVATE_KEY = vault(path: 'secret/infrastructure', key: 'PRIVATE_KEY')
        
        ANSIBLE_INVENTORY_PATH = "Ansible/Inventories/hosts.ini"
    }
    
    stages {

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
                        sh 'cdktf deploy "*" --auto-approve'
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