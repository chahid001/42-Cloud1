import { Construct } from "constructs";
import { App, TerraformOutput, TerraformStack } from "cdktf";
import { provider } from "@cdktf/provider-google";
import { ComputeNetwork } from "@cdktf/provider-google/lib/compute-network";
import * as dotenv from "dotenv";
import { ComputeSubnetwork } from "@cdktf/provider-google/lib/compute-subnetwork";
import { ComputeFirewall } from "@cdktf/provider-google/lib/compute-firewall";
import { ComputeAddress } from "@cdktf/provider-google/lib/compute-address";
import { ComputeInstance } from "@cdktf/provider-google/lib/compute-instance";

dotenv.config()

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new provider.GoogleProvider(this, "Google", {
      project: process.env.PROJECT_NB,
      region: "us-central1"
    });

    const vpc = new ComputeNetwork(this, "VPC", {
      name: "cloud-1-vpc"
    });

    //Subnets
    const subnet_app = new ComputeSubnetwork(this, "Subnet-app", {
      name: "app-cloud-subnet",
      network: vpc.name,
      ipCidrRange: "10.0.1.0/24",
      region: "us-central1"
    });

    const subnet_db = new ComputeSubnetwork(this, "Subnet-DB", {
      name: "DataBase-cloud-subnet",
      network: vpc.name,
      ipCidrRange: "10.0.2.0/24",
      region: "us-central1"
    });



    new ComputeFirewall(this, "Firewall_app", {
      name: "app-cloud-firewall",
      network: vpc.name,

      allow: [{
        protocol: "tcp",
        ports: ["22"]
      }],

      sourceRanges: ["0.0.0.0/0"]

    });

    const PubIP = new ComputeAddress(this, "PubIP-cloud1", {
      name: "app-externe-add"
    }); 

    const vm_app = new ComputeInstance(this, "VM-App", {
      name: "vm-app-cloud1",
      machineType: "e2-small",
      zone: "us-central1-b",

      bootDisk: {
        initializeParams: {
          image: "ubuntu-os-cloud/ubuntu-2204-lts",
          size: 20,
        },
      },

      networkInterface: [{
        network: vpc.name,
        subnetwork: subnet_app.name,
        accessConfig: [{
          natIp: PubIP.address
        }]
      }],

      metadata: {
        "ssh-keys": `cloud1:${process.env.PUBLIC_KEY}`,
      },

      tags: ["vm-app", "vm1"]

    });


    new TerraformOutput(this, "PubIP_Output", {
      value: vm_app.networkInterface.get(0).accessConfig.get(0).natIp
    });

  }
}

const app = new App();
new MyStack(app, "cdk");
app.synth();
