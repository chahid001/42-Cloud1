# 🚀 GCP Cloud Infrastructure with Dockerized WordPress, MariaDB, ELK, Jenkins, and Vault

## 🌐 Project Overview

This project is a complete GCP cloud infrastructure for deploying a WordPress app, database services, logging stack, and CI/CD pipeline. It features a **VPC** with **3 VMs**, **Docker Compose** for deploying services, and security enhancements such as a **bastion host**, **NAT**, and **Vault** for managing secrets.

### 🏗️ Architecture Overview

- **VM1**: Public WordPress site with Nginx (Docker Compose).
- **VM2**: Private MariaDB, phpMyAdmin, and Redis (Docker Compose).
- **VM3**: Private ELK stack for logging with Metricbeat and Filebeat.
- **Jenkins**: CI/CD pipeline for infrastructure and app deployment.
- **Vault**: Secure storage for secrets (SSH keys, passwords, etc.).

### 🚀 Deployment Steps

1. Clone this repository.
2. Set up your GCP environment.
3. Configure Ansible for provisioning Docker and Docker Compose on the VMs.
4. Deploy the Docker Compose services on each VM.
5. Set up SSH tunneling for accessing phpMyAdmin and Kibana:
   ```bash
   ssh -N -L 5601:localhost:5601 elk-host
   ssh -N -L 8080:localhost:8080 db-host
