import { App, TerraformOutput } from "cdktf";
import * as dotenv from "dotenv";
import { Cloud1Vpc } from "./network/vpc";
import { Cloud1Subnets } from "./network/subnets";
import { Cloud1Firewall } from "./security/firewall";
import { PublicIP } from "./network/public_ip";
import { Cloud1VMs } from "./compute/vm";
import { GoogleProvider } from "@cdktf/provider-google/lib/provider";
import { Cloud1RouterNat } from "./network/nat";

dotenv.config()


const app = new App();

console.log("Hello/////");
console.log("//////");
console.log(process.env.PROJECT_NB);
console.log("//////");
console.log("Hello/////");

const googleProvider = new GoogleProvider(app, "Google-Cloud-Provider", {
  project: process.env.PROJECT_NB, 
  region: "us-central1"
});

const vpc = new Cloud1Vpc(app, "Cloud-1-VPC", googleProvider);

const subnets = new Cloud1Subnets(app, "Cloud-1-Subnets", vpc.vpcName, googleProvider);

new Cloud1Firewall(app, "Cloud-1-Firewall", vpc.vpcName, googleProvider);

const IP_Add = new PublicIP(app, "Cloud-1-IP", googleProvider);

new Cloud1RouterNat(app, "Cloud1-NAT", vpc.vpcName, subnets.Subnets, googleProvider);

new Cloud1VMs(app, "Cloud-1-VMs", vpc.vpcName, subnets.Subnets, IP_Add.PublicIpAddress, googleProvider);

new TerraformOutput(app, 'public_ip', {
  value: IP_Add.PublicIpAddress,  
  description: 'Public IP Address of the VM',
});

app.synth();
