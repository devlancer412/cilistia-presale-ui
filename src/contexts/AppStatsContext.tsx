import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import gql from "graphql-tag";
import { getWhitelistStatus } from "@/utils/app";
import { client } from "@/utils/apolloClient";
import { toast } from "react-hot-toast";

export const AppStatsContext = createContext<AppStatsContextType | null>(null);

const AppStatsContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { address } = useAccount();
  const [presaleWhitelisted, setPresaleWhitelisted] = useState<boolean>(false);
  const [airdropWhitelisted, setAirdropWhitelisted] = useState<boolean>(false);
  const [totalHolderCount, setTotalHolderCount] = useState<number>();

  const refetch = async () => {
    try {
      const query = gql`
        {
          totalHolderCount: appVariable(id: "TotalHolders") {
            value
          }
        }
      `;

      const { data } = await client.query({ query: query });

      setTotalHolderCount(parseInt(data?.totalHolderCount?.value ?? "0"));
    } catch (err) {}
  };

  useEffect(() => {
    if (!address) {
      return;
    }

    getWhitelistStatus(address)
      .then((res) => {
        setPresaleWhitelisted(res.presale);
        setAirdropWhitelisted(res.airdrop);
      })
      .catch((err: any) => {
        console.log(err);
        toast.error("Fetch whitelist failed");
      });

    refetch();
  }, [address]);

  return (
    <AppStatsContext.Provider
      value={{
        presaleWhitelisted,
        airdropWhitelisted,
        totalHolderCount,
        refetch,
      }}
    >
      {children}
    </AppStatsContext.Provider>
  );
};

export default AppStatsContextProvider;
