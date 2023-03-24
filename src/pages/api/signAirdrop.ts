// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getAirdropSignature, AirdropType } from '@/utils/api';

type Data = {
  result: boolean;
  error?: string;
  signature?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { address, type } = req.query;

  const data = await getAirdropSignature(
    address as `0x${string}`,
    type as AirdropType
  );

  res.status(200).json(data);
}
