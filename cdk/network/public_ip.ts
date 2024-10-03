import { ComputeAddress } from "@cdktf/provider-google/lib/compute-address";
import { TerraformStack } from "cdktf";
import { Construct } from "constructs";

export class PublicIP extends TerraformStack {

    public PublicIpAddress: string;

    constructor(scope: Construct, id: string) {
        super(scope, id);

        const pub_ip = new ComputeAddress(this, "BationIP", {
            name: "jump-server-public-ip",
        });

        this.PublicIpAddress = pub_ip.address;
    }

}