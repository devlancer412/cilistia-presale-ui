import { useEffect, useState } from "react";
import useMain from "@/hooks/useMain";
import { PresaleStatus } from "@/types";

const Timer = () => {
  const { status, remainingSeconds } = useMain();
  const [timeInfo, setTimeInfo] = useState("00:00:00:00");

  const title = () => {
    if (status === PresaleStatus.NOT_STARTED) return "Presale starts in";
    else if (status === PresaleStatus.OPEN) return "Presale closes in";
    else return "Presale closed";
  };

  useEffect(() => {
    if (status === PresaleStatus.CLOSED) {
      setTimeInfo("00:00:00:00");
    }
    let _remainingTime = remainingSeconds;
    const seconds = _remainingTime % 60;

    _remainingTime = Math.floor(_remainingTime / 60);

    const minutes = _remainingTime % 60;

    _remainingTime = Math.floor(_remainingTime / 60);

    const hours = _remainingTime % 24;

    const days = Math.floor(_remainingTime / 24);

    setTimeInfo(
      `${(days < 10 ? "0" : "") + days}:${(hours < 10 ? "0" : "") + hours}:${
        (minutes < 10 ? "0" : "") + minutes
      }:${(seconds < 10 ? "0" : "") + seconds}`
    );
  }, [remainingSeconds, status]);

  return (
    <div className="flex flex-col items-center m-5">
      <h1 className="text-4xl mb-4">{title()}</h1>
      <span className="text-3xl">{timeInfo}</span>
    </div>
  );
};

export default Timer;
