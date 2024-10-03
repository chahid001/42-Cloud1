import { Construct } from "constructs";
import { App, TerraformStack } from "cdktf";
import { GoogleProvider } from "@cdktf/provider-google/lib/provider";
import * as dotenv from "dotenv";


dotenv.config()

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new GoogleProvider(this, "Google", {
      project: process.env.PROJECT_NB,
      region: "us-central1"
    })


  }
}

const app = new App();
new MyStack(app, "cdk");
app.synth();
