import { ComputeNetwork } from "@cdktf/provider-google/lib/compute-network";
import { TerraformStack } from "cdktf";
import { Construct } from "constructs";

export class Cloud1Vpc extends TerraformStack {

    public vpcName: string;

    constructor(scope: Construct, id: string) {
        super(scope, id);

        const VPC = new ComputeNetwork(this, "VPC-Cloud", {
            name: "cloud-virtual-network",
            autoCreateSubnetworks: false,
        });
        
        this.vpcName = VPC.name;

    }

}