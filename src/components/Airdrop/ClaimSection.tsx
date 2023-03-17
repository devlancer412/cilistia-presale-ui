import React from "react";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import ClaimButton from "@/components/Airdrop/ClaimButton";
import { contractConfig as airdropContractConfig } from "@/contracts/config/airdrop";

const ClaimSection = ({ signature, isOpen, isClaimed }: any) => {
  const { config: claimConfig, error: claimPrepError } =
    usePrepareContractWrite({
      ...airdropContractConfig,
      functionName: "claim",
      args: [
        {
          r: signature.r,
          s: signature.s,
          v: signature.v,
        },
      ],
    });

  const {
    data: sendClaimTxnData,
    isLoading: isSendingClaimTxn,
    isSuccess: isSendingClaimSuccess,
    error: sendClaimError,
    write: claim,
  } = useContractWrite(claimConfig);

  const {
    data: claimTxnData,
    isLoading: isWaitingForTxnToMine,
    isSuccess: isTxnMined,
    error: isTxnError,
  } = useWaitForTransaction({
    hash: sendClaimTxnData?.hash,
  });

  const onClaim = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    claim?.();
  };

  const isDisabled = isClaimed || !isOpen || !!claimPrepError;
  return (
    <ClaimButton
      isClaimed={isClaimed}
      isDisabled={isDisabled}
      onClickHandler={onClaim}
    />
  );
};

export default ClaimSection;
