import { utils, Wallet } from "ethers";

const PRIVATE_KEY: string = process.env.NEXT_SIGNER_PRIVATEKEY ?? "";
const signer = new Wallet(PRIVATE_KEY);

export { signer };
