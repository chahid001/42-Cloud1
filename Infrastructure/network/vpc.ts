import { ComputeNetwork } from "@cdktf/provider-google/lib/compute-network";
import { GoogleProvider } from "@cdktf/provider-google/lib/provider";
import { TerraformStack } from "cdktf";
import { Construct } from "constructs";

export class Cloud1Vpc extends TerraformStack {

    public vpcName: string;

    constructor(scope: Construct, id: string, provider: GoogleProvider) {
        super(scope, id);

        new GoogleProvider(this, "Google-Provider", {
            project: provider.project,
            region: provider.region,
        });

        const VPC = new ComputeNetwork(this, "VPC-Cloud", {
            name: "cloud-virtual-network",
            autoCreateSubnetworks: false,
        });
        
        this.vpcName = VPC.name;

    }

}