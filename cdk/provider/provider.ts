import { GoogleProvider } from "@cdktf/provider-google/lib/provider";
import { TerraformStack } from "cdktf";
import { Construct } from "constructs";
import * as dotenv from "dotenv";

dotenv.config()

export class ProviderCloud1 extends TerraformStack {
    
    constructor(scope: Construct, id: string) {
        super(scope, id);

        new GoogleProvider(this, "Google", {
            project: process.env.PROJECT_NB,
            region: "us-central1",
        });
    }
}