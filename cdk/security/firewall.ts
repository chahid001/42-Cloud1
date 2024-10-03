import { ComputeFirewall } from "@cdktf/provider-google/lib/compute-firewall";
import { TerraformStack } from "cdktf";
import { Construct } from "constructs";

export class Cloud1Firewall extends TerraformStack {

    constructor(scope: Construct, id: string, vpcName: string) {
        super(scope, id);

        new ComputeFirewall(this, "AllowSSH", {
            name: "jump-server-firewall",
            network: vpcName,

            allow: [{
                protocol: "tcp",
                ports: ["22"],
            }],

            sourceRanges: ["0.0.0.0/0"],
            targetTags: ["bastion"]
        });

        new ComputeFirewall(this, "InternalTraffic", {
            name: "Allow-Internal-Traffic",
            network: vpcName,

            allow: [{
                protocol: "tcp",
                ports: ["22", "3306", "9200", "5601"]
            }],

            sourceTags: ["bastion"],
            targetTags: ["database", "elk"]
        }); 

    }

} 