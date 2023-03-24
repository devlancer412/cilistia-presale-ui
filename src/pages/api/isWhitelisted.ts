// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import {
  isPresaleWhitelisted,
  isAirdropWhitelisted,
  AirdropType,
} from '@/utils/api';

type Data = {
  presale: boolean;
  ogAirdrop: boolean;
  trueOgAirdrop: boolean;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const address: `0x${string}` = req.query.address as `0x${string}`;

  res.status(200).json({
    presale: isPresaleWhitelisted(address),
    ogAirdrop: isAirdropWhitelisted(address, AirdropType.OG),
    trueOgAirdrop: isAirdropWhitelisted(address, AirdropType.TRUE_OG),
  });
}
