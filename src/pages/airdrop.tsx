import { BigNumber } from "ethers";
import React, { useState, useEffect } from "react";
import { useContractReads, useAccount } from "wagmi";
import dynamic from "next/dynamic";
import { getSignature, getWhitelistStatus } from "@/services/airdrop";
import { useQuery } from "@tanstack/react-query";
import { SignatureRes } from "@/types";
// import AirdropCountdown from "@/components/Airdrop/Countdown";
import ClaimSection from "@/components/Airdrop/ClaimSection";
import { CAMPAIGN_NUM_DAYS } from "@/constants/airdrop";
import { contractConfig as airdropContractConfig } from "@/contracts/config/airdrop";

const AirdropStats = dynamic(import("@/components/Airdrop/Stats"), {
  ssr: false,
});
import { formatNumberSring } from "@/utils/math";
import { toHumanReadableDate, isUnixTsToday } from "@/utils/time";

type MassagedMultiCallData = {
  balance: string;
  ogNumber: number;
  isOpen: boolean;
  lastClaimedTime: number;
  openingTime: number;
  closingTime: number;
  claimablePerDay: string;
};

const AirdropPage = () => {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const { address } = useAccount();
  const {
    isLoading: isGetWhiteListStatusLoading,
    isError: isGetWhiteListStatusError,
    data: isWhitelisted,
    error: getWhiteListStatusError,
  } = useQuery({
    queryKey: ["isWhitelistedForAirdrop"],
    queryFn: async () => {
      if (address) {
        const result: boolean = (await getWhitelistStatus(address)) as boolean;

        return result;
      }
    },
  });

  const {
    isLoading: isGetSignatureForAirdropClaimLoading,
    isError: isGetSignatureForAirdropClaimError,
    data: airdropClaimSignatureRes,
    error: airdropClaimSignatureError,
  } = useQuery({
    queryKey: ["signatureForAirdropClaim"],
    queryFn: async () => {
      if (address) {
        const result: SignatureRes = (await getSignature(
          address
        )) as SignatureRes;

        return result;
      }
    },
  });

  const { data: massagedValues } = useContractReads({
    contracts: [
      {
        ...airdropContractConfig,
        functionName: "balance",
      },
      {
        ...airdropContractConfig,
        functionName: "ogNumber",
      },
      {
        ...airdropContractConfig,
        functionName: "isOpen",
      },
      {
        ...airdropContractConfig,
        functionName: "lastClaimedTime",
        args: [address],
      },
      {
        ...airdropContractConfig,
        functionName: "openingTime",
      },
      {
        ...airdropContractConfig,
        functionName: "closingTime",
      },
      {
        ...airdropContractConfig,
        functionName: "totalClaimableAmountPerWallet",
      },
    ],
    suspense: true,
    select: (rawData): MassagedMultiCallData | undefined => {
      const isMultiCallFailed = rawData.indexOf(null) > -1;
      if (!isMultiCallFailed) {
        const rawBalance = rawData[0] as BigNumber;
        const rawOGNumber = rawData[1] as number;
        const rawIsOpen = rawData[2] as boolean;
        const rawLastClaimedTime = rawData[3] as BigNumber;
        const rawOpeningTime = rawData[4] as number;
        const rawClosingTime = rawData[5] as number;
        const rawTotalClaimableAmountPerWallet = rawData[6] as BigNumber;

        return {
          balance: rawBalance.toString(),
          ogNumber: rawOGNumber,
          isOpen: rawIsOpen,
          lastClaimedTime: rawLastClaimedTime?.toNumber(),
          openingTime: rawOpeningTime,
          closingTime: rawClosingTime,
          claimablePerDay: rawTotalClaimableAmountPerWallet
            .div(CAMPAIGN_NUM_DAYS)
            .toString(),
        };
      }
    },
  });

  if (!hasMounted) return null;

  if (massagedValues) {
    const {
      balance,
      ogNumber,
      isOpen,
      lastClaimedTime,
      openingTime,
      closingTime,
      claimablePerDay,
    } = massagedValues as MassagedMultiCallData;

    const humanReadableCILBalance = formatNumberSring(balance, 1e18);
    const humanReadableOpeningTime = toHumanReadableDate(openingTime);
    const humanReadableClosingTime = toHumanReadableDate(closingTime);
    const humanReadableLastClaim =
      lastClaimedTime && toHumanReadableDate(lastClaimedTime);
    const humanReadableClaimablePerDay = formatNumberSring(
      claimablePerDay,
      1e18
    );
    const isClaimed = lastClaimedTime && isUnixTsToday(lastClaimedTime);

    return (
      <div className="flex flex-col max-sm:w-4/5 max-w-xl m-auto">
        {/* <AirdropCountdown /> */}
        <AirdropStats
          isOpen={isOpen}
          ogNumber={ogNumber}
          humanReadableOpeningTime={humanReadableOpeningTime}
          humanReadableClosingTime={humanReadableClosingTime}
          claimablePerDay={humanReadableClaimablePerDay}
          humanReadableLastClaim={humanReadableLastClaim}
        />
        {!!airdropClaimSignatureRes?.signature && (
          <ClaimSection
            isClaimed={isClaimed}
            isOpen={isOpen}
            signature={airdropClaimSignatureRes.signature}
          />
        )}
        {airdropClaimSignatureRes?.error && (
          <p className="text-sm text-error ml-3">
            {airdropClaimSignatureRes?.error}
          </p>
        )}
      </div>
    );
  }
  return <div>Loading...</div>;
};

export default AirdropPage;
