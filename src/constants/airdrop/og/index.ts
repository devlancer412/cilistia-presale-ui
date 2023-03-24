import { OG_AIRDROP_WHITELIST_RECORDS } from './whitelists';

const OG_AIRDROP_CONTRACT_ADDRESS_RECORDS: Record<number, `0x${string}`> = {
  42161: '0x9FfE58FF84aBd87164FA65c68a954dcd9BB493F6',
  1337: '0xc78729061c78bbf25f415890ba3cf59d9bdd5c37',
  5: '0x9FfE58FF84aBd87164FA65c68a954dcd9BB493F6',
  1: '0x4e95b3D57ef36c20271F31De1c0068e0253da22f',
};

const OG_CAMPAIGN_NUM_DAYS = 14;

export {
  OG_AIRDROP_CONTRACT_ADDRESS_RECORDS,
  OG_AIRDROP_WHITELIST_RECORDS,
  OG_CAMPAIGN_NUM_DAYS,
};