import { ComputeInstance } from "@cdktf/provider-google/lib/compute-instance";
import { GoogleProvider } from "@cdktf/provider-google/lib/provider";
import { resource } from '@cdktf/provider-null'
import { NullProvider } from "@cdktf/provider-null/lib/provider";
import { TerraformStack } from "cdktf";
import { Construct } from "constructs";
import * as dotenv from "dotenv";

dotenv.config();

export class Cloud1VMs extends TerraformStack {
    constructor(scope: Construct, id: string, vpcName: string, 
                Subnets: string[], PublicIpAddress: string, provider: GoogleProvider) {
        super(scope, id);

        new GoogleProvider(this, "Google-Provider", {
            project: provider.project,
            region: provider.region,
        });
        new NullProvider(this, "Null-Provider");

        // Jump Server with Public IP
        new ComputeInstance(this, "JumpServer", {
            name: "jump-server-vm",
            machineType: "e2-small",
            zone: "us-central1-b",

            bootDisk: {
                initializeParams: {
                    image: "ubuntu-os-cloud/ubuntu-2204-lts",
                    size: 20,
                },
            },

            networkInterface: [{
                network: vpcName,
                subnetwork: Subnets[0],
                accessConfig: [{
                    natIp: PublicIpAddress,
                }],
            }],

            metadata: {
                "ssh-keys": `cloud1:${process.env.PUBLIC_KEY}`,
            },

            tags: ["bastion"],

            
        });
        
        new resource.Resource(this, "copy-private-key", {
            provisioners: [{
                    type: "file",
                    source: process.env.PRIVATE_KEY_PATH,
                    destination: "/home/cloud1/.ssh/id_rsa",
                    connection: {
                        type: "ssh",
                        host: PublicIpAddress,
                        user: "cloud1",
                        privateKey: process.env.PRIVATE_KEY,
                        agent: "false",
                    }
                },

                {
                    type: "remote-exec",
                    inline: [
                        "chmod 600 /home/cloud1/.ssh/id_rsa"
                    ],
                    connection: {
                        type: "ssh",
                        host: PublicIpAddress,
                        user: "cloud1",
                        privateKey: process.env.PRIVATE_KEY,
                        agent: "false",
                    }
                }
            ]
        });
        

        // Database instance
        new ComputeInstance(this, "DataBase", {
            name: "database-vm",
            machineType: "e2-small",
            zone: "us-central1-b",
            bootDisk: {
                initializeParams: {
                    image: "ubuntu-os-cloud/ubuntu-2204-lts",
                    size: 10,
                },
            },
            networkInterface: [{
                network: vpcName,
                subnetwork: Subnets[1],
            }],
            metadata: {
                "ssh-keys": `cloud1:${process.env.PUBLIC_KEY}`,
            },
            tags: ["database"],
        });

        // ELK instance
        new ComputeInstance(this, "ELK", {
            name: "elk-vm",
            machineType: "e2-small",
            zone: "us-central1-b",
            bootDisk: {
                initializeParams: {
                    image: "ubuntu-os-cloud/ubuntu-2204-lts",
                    size: 10,
                },
            },
            networkInterface: [{
                network: vpcName,
                subnetwork: Subnets[2],
            }],
            metadata: {
                "ssh-keys": `cloud1:${process.env.PUBLIC_KEY}`,
            },
            tags: ["elk"],
        });
    }
}
