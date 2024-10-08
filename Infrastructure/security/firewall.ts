import { ComputeFirewall } from "@cdktf/provider-google/lib/compute-firewall";
import { GoogleProvider } from "@cdktf/provider-google/lib/provider";
import { TerraformStack } from "cdktf";
import { Construct } from "constructs";

export class Cloud1Firewall extends TerraformStack {

    constructor(scope: Construct, id: string, vpcName: string, provider: GoogleProvider) {
        super(scope, id);

        new GoogleProvider(this, "Google-Provider", {
            project: provider.project,
            region: provider.region,
        });

        new ComputeFirewall(this, "ExternalTraffic", {
            name: "jump-server-firewall",
            network: vpcName,

            allow: [{
                protocol: "tcp",
                ports: ["22", "443", "80"],
            }],

            sourceRanges: ["0.0.0.0/0"],
            targetTags: ["bastion"]
        });

        

        new ComputeFirewall(this, "InternalTraffic-1", {
            name: "allow-internal-traffic-1",
            network: vpcName,

            allow: [{
                protocol: "tcp",
                ports: ["22", "3306", "6379", "9200", "5601"]
            }],

            sourceTags: ["bastion"],
            targetTags: ["database", "elk"]
        }); 

        new ComputeFirewall(this, "InternalTraffic-2", {
            name: "allow-internal-traffic-2",
            network: vpcName,

            allow: [{
                protocol: "tcp",
                ports: ["9200", "5601"]
            }],

            sourceTags: ["database"],
            targetTags: ["elk"]
        }); 

    }

} 