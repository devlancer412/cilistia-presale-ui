// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { isWhitelisted } from "./utils";

type Data = {
  isWhitelisted: boolean;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const address: string = req.query.address as string;

  res.status(200).json({
    isWhitelisted: isWhitelisted(address),
  });
}
