import { ComputeInstance } from "@cdktf/provider-google/lib/compute-instance";
import { TerraformStack } from "cdktf";
import { Construct } from "constructs";
import * as dotenv from "dotenv";

dotenv.config()

export class Cloud1VMs extends TerraformStack {

    constructor(scope: Construct, id: string, vpcName: string, Subnets: string, PublicIpAddress: string) {
        super(scope, id);

        // new ComputeInstance(this, "DataBase", {
        //     name: "database-vm",
        //     machineType: "e2-small",

        // });

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



    }

}