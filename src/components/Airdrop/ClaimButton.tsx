import React from "react";

const ClaimButton = ({ onClickHandler, isDisabled, isClaimed }: any) => {
  return (
    <button
      onClick={onClickHandler}
      className={`btn ${isDisabled ? "" : "btn-primary"} btn-md`}
    >
      {isClaimed ? "Claimed" : " Claim Airdrop"}
    </button>
  );
};

export default ClaimButton;
