import { App } from "cdktf";
import * as dotenv from "dotenv";
import { ProviderCloud1 } from "./provider/provider";
import { Cloud1Vpc } from "./network/vpc";
import { Cloud1Subnets } from "./network/subnets";
import { Cloud1Firewall } from "./security/firewall";
import { PublicIP } from "./network/public_ip";
import { Cloud1VMs } from "./compute/vm";

dotenv.config()


const app = new App();

new ProviderCloud1(app, "Cloud-1-Provider");

const vpc = new Cloud1Vpc(app, "Cloud-1-VPC");

const subnets = new Cloud1Subnets(app, "Cloud-1-Subnets", vpc.vpcName);

new Cloud1Firewall(app, "Cloud-1-Firewall", vpc.vpcName);

const IP_Add = new PublicIP(app, "Cloud-1-IP");

new Cloud1VMs(app, "Cloud-1-VMs", subnets.Subnets, vpc.vpcName, IP_Add.PublicIpAddress);


app.synth();
