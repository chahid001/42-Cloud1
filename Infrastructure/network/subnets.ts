import { ComputeSubnetwork } from "@cdktf/provider-google/lib/compute-subnetwork";
import { GoogleProvider } from "@cdktf/provider-google/lib/provider";
import { TerraformStack } from "cdktf";
import { Construct } from "constructs";

export class Cloud1Subnets extends TerraformStack {

    public Subnets: string[];

    constructor(scope: Construct, id: string, vpcName: string, provider: GoogleProvider) {
        super(scope, id);

        new GoogleProvider(this, "Google-Provider", {
            project: provider.project,
            region: provider.region,
        });

        const subnet_bastion = new ComputeSubnetwork(this, "JumpServer-Subnet", {
            name: "subnet-cloud-app",
            network: vpcName,
            ipCidrRange: "10.0.1.0/24",
            region: "us-central1"
        });

        const subnet_db = new ComputeSubnetwork(this, "Subnet-DB", {
            name: "subnet-cloud-database",
            network: vpcName,
            ipCidrRange: "10.0.2.0/24",
            region: "us-central1"
        });

        const subnet_elk = new ComputeSubnetwork(this, "Subnet-ELK", {
            name: "subnet-cloud-elk",
            network: vpcName,
            ipCidrRange: "10.0.3.0/24",
            region: "us-central1"
        });

        this.Subnets = [subnet_bastion.name, subnet_db.name, subnet_elk.name];
    }

}