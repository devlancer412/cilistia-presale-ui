// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getSignature } from "@/utils/api";

type Data = {
  result: boolean;
  error?: string;
  signature?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { address, amount, token } = req.query;

  const data = await getSignature(
    address as `0x${string}`,
    amount as string,
    token as string
  );
  res.status(200).json(data);
}
