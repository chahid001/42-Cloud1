import { ComputeAddress } from "@cdktf/provider-google/lib/compute-address";
import { GoogleProvider } from "@cdktf/provider-google/lib/provider";
import { TerraformStack } from "cdktf";
import { Construct } from "constructs";

export class PublicIP extends TerraformStack {

    public PublicIpAddress: string;

    constructor(scope: Construct, id: string, provider: GoogleProvider) {
        super(scope, id);

        new GoogleProvider(this, "Google-Provider", {
            project: provider.project,
            region: provider.region,
        });

        const pub_ip = new ComputeAddress(this, "BationIP", {
            name: "jump-server-public-ip",
        });

        this.PublicIpAddress = pub_ip.address;
    }

}