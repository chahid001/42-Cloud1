provider "google" {

    project = var.project-id
    region = "us-central1"

}

resource "google_compute_network" "VPC" {
    name = "cloud-1-vpc"
}

resource "google_compute_subnetwork" "subnet-vpc" {

    name = "app-vpc-subnet"
    network = google_compute_network.VPC.name
    ip_cidr_range = "10.0.1.0/24"
    region = "us-central1"
  
}

resource "google_compute_firewall" "firewall" {
  
    name = "cloud-1-firewall"
    network = google_compute_network.VPC.name

    allow {
        protocol = "tcp"
        ports = ["22"]
    }

    source_ranges = [ "0.0.0.0/0" ]
    
}

resource "google_compute_address" "Pub-IP" {

    name = "cloud-1-public-ip"
    region = "us-central1"
  
}

resource "google_compute_instance" "VM-app" {

    name = "app-virtual-machine"
    machine_type = "e2-small"
    zone = "us-central1-a"

    boot_disk {
      initialize_params {
        image = "ubuntu-os-cloud/ubuntu-2204-lts"  
        size = 20
      }
    }

    network_interface {
        
        network = google_compute_network.VPC.name
        subnetwork = google_compute_subnetwork.subnet-vpc.name
        
        access_config {
            nat_ip = google_compute_address.Pub-IP.address
        }
    }

    metadata = {
        ssh-keys = "cloud1:${file("~/.ssh/cloud-ssh.pub")}"
    }

    tags = [ "app-vm", "cloud-1-app" ]
    
}

output "vm_external_ip" {
        value = google_compute_instance.VM-app.network_interface[0].access_config[0].nat_ip
}