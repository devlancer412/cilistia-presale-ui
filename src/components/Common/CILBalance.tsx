import { useBalance, useAccount } from "wagmi";
import { CIL_TOKEN } from "@/constants";
import { fourDp } from "@/utils/math";

const CILBalance = () => {
  const { address } = useAccount();
  const { data, isError } = useBalance({
    address,
    token: CIL_TOKEN.address,
    suspense: true,
  });
  if (isError) {
    return <h1>Error</h1>;
  }
  return (
    <h1 className="text-1x font-bold mr-5">
      {data?.formatted && fourDp(data.formatted)}
      <span className="text-cilistia ml-1">{data?.symbol}</span>
    </h1>
  );
};

export default CILBalance;
