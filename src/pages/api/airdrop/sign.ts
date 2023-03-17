// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { generateSignature } from "@/utils/airdrop";
import { Signature } from "ethers";

type Data = {
  result: boolean;
  error?: string;
  signature?: Signature;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { address } = req.query;

  const data: Data = await generateSignature(address as `0x${string}`);
  res.status(200).json(data);
}
