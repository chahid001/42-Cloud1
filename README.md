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

- 🛠 **NodeJS/NPM** with **CDKTF** and **Typescript** installed.
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
vault kv put secret/app DB_PSW="your-db-password"
vault kv put secret/app WP_PSW="your-wordpress-password"
vault kv put secret/infrastructure PUBLIC_KEY="$(cat ~/.ssh/id_rsa.pub)"
```
**PS.:** The ENVs are mentioned in the Jenkinsfile, feel free to organize them as you want.

### Configure Jenkins Credentials
To enable your Jenkins agent to execute CDKTF commands and access the Vault environment variables, you need to add the following credentials to Jenkins:

- **Root Token**: This is the token generated during the Vault initialization. It allows Jenkins to authenticate and retrieve secrets from Vault.

- **GOOGLE_CREDENTIALS**: This JSON key file contains the necessary credentials for your GCP service account. It allows Jenkins to interact with GCP resources via the API.

To add these credentials:

1. Navigate to your Jenkins dashboard.
2. Go to **Manage Jenkins** > **Manage Credentials**.
3. Select the appropriate domain or add a new one.
4. Click on **Add Credentials**:
   - For **Root Token**: Choose **Secret text** and paste the Vault root token.
   - For **GOOGLE_CREDENTIALS**: Choose **Secret file** and upload the JSON key file.

Make sure that your Jenkins pipeline scripts reference these credentials properly to ensure seamless integration with Vault and GCP.


### Configure SSH config:
To simplify SSH access to private VMs (VM2 and VM3) via the public jump host (VM1), configure your `~/.ssh/config` file:
```bash
Host jump-host
  HostName <Jump Host Public IP>
  User cloud1
  IdentityFile ~/.ssh/cloud1-ssh

Host elk-host
  HostName 10.0.3.2
  User cloud1
  IdentityFile ~/.ssh/cloud1-ssh
  ProxyJump jump-host

Host db-host
  HostName 10.0.2.2
  User cloud1
  IdentityFile ~/.ssh/cloud1-ssh
  ProxyJump jump-host
```
This configuration sets up `jump-host` (VM1) as a bastion server, allowing you to access the private VMs (`elk-host` and `db-host`) via the jump host.
### Set up SSH Tunneling:
Access Kibana on VM3 or phpMyAdmin on VM2 through the jump host:
```bash
ssh -N -L 5601:localhost:5601 elk-host
ssh -N -L 8080:localhost:8080 db-host
```

🛠️ **Technologies Used**:

- ☁️ Google Cloud Platform (GCP), Amazon Cloud Development Kit (with TypeScript).
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

