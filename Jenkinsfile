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
        
        DB_PASSWORD = vault(path: 'secret/app', key: 'DB_PASSWORD')
        DB_ROOT_PASSWORD = vault(path: 'secret/app', key: 'DB_ROOT_PASSWORD') 
        DB_USER = vault(path: 'secret/app', key: 'DB_USER')
        WORDPRESS_ROOT_LOGIN = vault(path: 'secret/app', key: 'WORDPRESS_ROOT_LOGIN')      


        ANSIBLE_INVENTORY_PATH = "Ansible/Inventories/hosts.ini"
        NGINX_CONF_PATH = "src/website/nginx/config/nginx.conf"
        WORDPRESS_DOCKER = "src/website/docker-compose.yml"
    }

    stages {

        stage('Checkout') {
            steps {
                sh 'echo "====== SCM ======"'
                checkout scm
            }
        }

        stage('Install Infrastructure Dependencies') {
            steps {
                script {
                    sh 'echo "====== BUILD ======"'
                    dir('Infrastructure') {
                        sh 'npm i'
                    }
                }
            }
        }

        stage('Deploy GCP Infrastructure') {
            steps {
                script {
                    sh 'echo "=== GCP Resources Deployment ==="'
                    dir('Infrastructure') {
                        sh 'gcloud auth activate-service-account --key-file=${GCP_KEY}'
                        sh 'gcloud config set project ${PROJECT_ID}'
                        sh 'sudo -E cdktf apply "*" --auto-approve'
                        def publicIp = sh(script: 'gcloud compute instances describe "jump-server-vm" --zone="us-central1-b" --format="get(networkInterfaces[0].accessConfigs[0].natIP)" --project ${PROJECT_ID}', returnStdout: true).trim()
                        env.PUBLIC_IP = publicIp

                        echo "Public IP: ${env.PUBLIC_IP}"
                    }
                }
            }
        }

        stage('Update ENVs') {
            steps {
                script {
                    sh 'echo "====== Setting UP ENVs ======"'
                    sh "sed -i 's@PUBLICIP@${env.PUBLIC_IP}@g' ${NGINX_CONF_PATH}"
                    sh "sed -i 's@PUBLICIP@${env.PUBLIC_IP}@g' ${ANSIBLE_INVENTORY_PATH}"

                    sh "sed -i 's@EURL@${env.PUBLIC_IP}@g' ${WORDPRESS_DOCKER}"
                    sh "sed -i 's@WRL@${WORDPRESS_ROOT_LOGIN}@g' ${WORDPRESS_DOCKER}"
                    sh "sed -i 's@DRP@${DB_ROOT_PASSWORD}@g' ${WORDPRESS_DOCKER}"
                    sh "sed -i 's@EDU@${DB_USER}@g' ${WORDPRESS_DOCKER}"
                    sh "sed -i 's@EDP@${DB_PASSWORD}@g' ${WORDPRESS_DOCKER}"
                }
            }
        }


        stage('Deploy with Ansible') {
            steps {
                script {
                    sh 'echo "====== Deployment ======"'
                    dir ('Ansible') {
                        retry (3) {
                            sh "sudo ansible-playbook playbook.yml -i Inventories/hosts.ini --private-key ${PRIVATE_KEY_PATH}"                       
                        }

                    }
                }
            }
        }
    }


}