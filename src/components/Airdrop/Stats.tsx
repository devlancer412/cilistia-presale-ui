import React from "react";

const AirdropStats = ({
  claimablePerDay,
  isOpen,
  humanReadableLastClaim,
  humanReadableOpeningTime,
  humanReadableClosingTime,
}: any) => {
  return (
    <div className="stats shadow flex max-sm:flex-col">
      <div className="stat place-items-center">
        <div className="stat-title text-cilistia">CIL Tokens</div>
        <div className="stat-value text-primary">{claimablePerDay}</div>
        <div className="stat-desc">per day</div>
      </div>

      <div className="stat place-items-center">
        <div className="stat-title">Status</div>
        {isOpen ? (
          <div className={`stat-value text-success`}>OPEN</div>
        ) : (
          <div className={`stat-value text-error`}>CLOSED</div>
        )}
        <div className="stat-desc">
          From {humanReadableOpeningTime} to {humanReadableClosingTime}
        </div>
      </div>

      <div className="stat place-items-center">
        <div className="stat-title">Last Claimed</div>
        <div className="stat-value text-primary">{humanReadableLastClaim}</div>
      </div>
    </div>
  );
};

export default AirdropStats;
