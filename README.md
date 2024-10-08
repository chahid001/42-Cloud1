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

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-repo/cloud-1-overkill.git
   cd cloud-1-overkill
