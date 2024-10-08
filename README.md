# 🚀 Cloud-1 But Overkill 🚀

**Welcome to my expanded version of the Cloud-1 project!** This repository contains the code and configurations for a cloud infrastructure deployed on **Google Cloud Platform (GCP)** using **Terraform**, **AWS CDK**, **Ansible**, and **Docker**.

---

## 📜 Project Overview

This project started as a simple 42 school assignment but evolved into a fully-fledged cloud infrastructure setup. Below is a summary of the components:

- 🏗️ **GCP VPC with 3 Subnets** – Segregating VMs for security and scalability.
- 🌍 **WordPress and Nginx** – Hosted on VM1 with Docker Compose.
- 🔐 **MariaDB, phpMyAdmin, Redis** – Running in a private subnet (VM2).
- 📊 **ELK Stack** – Elasticsearch and Kibana deployed on VM3 for logging and monitoring.
- 🛡️ **NAT & Router** – Providing internet access to private VMs for package installations without exposing them to the public internet.
- 🎩 **Bastion Host (Jump Server)** – Secure SSH tunneling from VM1 to access private VMs.
- 🔧 **Ansible** – For Docker installation and deployment automation.
- 🔒 **Vault** – Storing secrets such as SSH keys and database credentials.
- 🛠️ **Jenkins** – Automating infrastructure deployment using pipelines.

---

## 🖼️ Architecture Overview

<table>
  <tr>
    <td><img src="https://github.com/chahid001/42-Cloud01/blob/main/assets/archi.gif" alt="Architecture GIF" width="400"/></td>
    <td>

The architecture consists of:
1. **VM1 (Public Subnet):**
   - Hosts WordPress and Nginx.
   - Acts as a Bastion Host (Jump Server) for SSH tunneling.

2. **VM2 (Private Subnet 2):**
   - Hosts MariaDB, phpMyAdmin, and Redis.
   - Uses Docker Compose for service orchestration.

3. **VM3 (Private Subnet 3):**
   - Hosts the ELK Stack (Elasticsearch, Kibana).
   - Collects logs from Nginx and MariaDB containers via Metricbeat/Filebeat.

4. **NAT & Router:**
   - Provides internet access to private VMs without exposing them.

</td>
  </tr>
</table>

---

## 🚀 Deployment

Follow these steps to deploy the infrastructure:

### Prerequisites

- 🐍 **Python 3.x**
- ☁️ **GCP Account** with project setup.
- 🧰 **Terraform** installed.
- 🔑 **SSH Key Pair** (to securely access the VMs).

### Steps
# Set up Vault for secrets:
### First, initialize Vault:
```bash
vault operator init
```
### Unseal the Vault using the keys from the init process:
```bash
vault operator unseal <Unseal Key 1>
vault operator unseal <Unseal Key 2>
vault operator unseal <Unseal Key 3>
```
### Export the Vault address and token (replace with your values):
```bash
export VAULT_ADDR='http://127.0.0.1:8200'
export VAULT_TOKEN='<Your Vault Token>'
```
### Store secrets for SSH keys, database credentials, and more:
```bash
vault kv put secret/db_password value="your-db-password"
vault kv put secret/wordpress_db_password value="your-wordpress-db-password"
vault kv put secret/ssh_private_key value="$(cat ~/.ssh/id_rsa)"
```
### Provision the Infrastructure with Terraform:
```bash
terraform init
terraform apply
```
### Configure Ansible for Docker Setup:
Use Ansible to deploy Docker and Docker Compose on all VMs:
```bash
ansible-playbook -i inventory/hosts setup-docker.yml
```
### Deploy Applications using Docker Compose:
```bash
ansible-playbook -i inventory/hosts deploy-apps.yml
```
### Set up SSH Tunneling:
Access Kibana on VM3 or phpMyAdmin on VM2 through the jump host:
```bash
ssh -N -L 5601:localhost:5601 elk-host
ssh -N -L 8080:localhost:8080 db-host
```
🔐 **Vault Environment Variables**:
To properly configure Vault, the following environment variables need to be set:

- `VAULT_ADDR`: Address of your Vault server.
- `VAULT_TOKEN`: Access token for authenticating with Vault.
- `SSH_PRIVATE_KEY_PATH`: Path to your SSH private key.
- `DB_PASSWORD`: MariaDB root password.
- `WORDPRESS_DB_PASSWORD`: WordPress database password.

🛠️ **Technologies Used**:

- ☁️ Google Cloud Platform (GCP)
- 🌐 Terraform for infrastructure as code.
- 🔒 Vault for secret management.
- 🚀 Ansible for automation.
- 🐋 Docker & Docker Compose for containerization.
- 📦 MariaDB, Redis, phpMyAdmin for the database layer.
- 📊 ELK Stack for monitoring and logging.
- 🖥️ Jenkins for CI/CD pipelines.

📚 **Learn More**:
If you're interested in exploring more, check out my GitHub repository for the full codebase and detailed documentation.

💡 **Future Improvements**:

- 📈 Automate scaling for VM instances based on load.
- 🔧 Add automated testing to Jenkins pipelines.
- 🌐 Migrate services to Kubernetes for better orchestration.


1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-repo/cloud-1-overkill.git
   cd cloud-1-overkill
