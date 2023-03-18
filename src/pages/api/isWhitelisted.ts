// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { isPresaleWhitelisted, isAirdropWhitelisted } from '@/utils/api';

type Data = {
  presale: boolean;
  airdrop: boolean;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const address: `0x${string}` = req.query.address as `0x${string}`;

  res.status(200).json({
    presale: isPresaleWhitelisted(address),
    airdrop: isAirdropWhitelisted(address),
  });
}
