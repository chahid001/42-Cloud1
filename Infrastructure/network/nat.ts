import { ComputeRouter } from "@cdktf/provider-google/lib/compute-router";
import { ComputeRouterNat } from "@cdktf/provider-google/lib/compute-router-nat";
import { GoogleProvider } from "@cdktf/provider-google/lib/provider";
import { TerraformStack } from "cdktf";
import { Construct } from "constructs";

export class Cloud1RouterNat extends TerraformStack {

    constructor(scope: Construct, id: string, vpcName: string, subnets: string[], provider: GoogleProvider) {
        super(scope, id);


        new GoogleProvider(this, "Google-Provider", {
            project: provider.project,
            region: provider.region,
        });

        const Router = new ComputeRouter(this, "NatRouter", {
            name: "cloud-1-nat-router",
            network: vpcName,
            region: "us-central1"
        }); 

        new ComputeRouterNat(this, "NatGateway", {
            name: "cloud-1-nat-gateway",
            router: Router.name,
            region: "us-central1",
            natIpAllocateOption: "AUTO_ONLY",
            sourceSubnetworkIpRangesToNat: "LIST_OF_SUBNETWORKS",

            subnetwork: [
                {
                    name: subnets[1],
                    sourceIpRangesToNat: ["ALL_IP_RANGES"],
                },
                {
                    name: subnets[2],
                    sourceIpRangesToNat: ["ALL_IP_RANGES"],
                },
            ],
        });
    }

}