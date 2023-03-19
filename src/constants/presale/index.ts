import { PRESALE_WHITELIST_RECORDS } from './whitelists';

const HARD_CAP = 50_000;
const PRESALE_ADDRESS_RECORDS: Record<number, `0x${string}`> = {
  42161: '0xc9EEE0ba55c3035EB0a7a687c8fAB0E6e283a9F7',
  1337: '0xc9EEE0ba55c3035EB0a7a687c8fAB0E6e283a9F7',
  5: '0xd43a55EC5B30b638623ea608a6532A7d5A58c320',
  1: '0xc9EEE0ba55c3035EB0a7a687c8fAB0E6e283a9F7',
};

export { HARD_CAP, PRESALE_WHITELIST_RECORDS, PRESALE_ADDRESS_RECORDS };