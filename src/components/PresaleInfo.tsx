import { useEffect, useState } from "react";
import { useProvider } from "wagmi";
import { HARD_CAP, CLI_PRICE } from "@/constants";
import { getRemainCil } from "@/utils";

const PresaleInfo = () => {
  const provider = useProvider();
  const [sold, setSold] = useState<number>(0);

  useEffect(() => {
    getRemainCil(provider).then((remain) => setSold(HARD_CAP - remain));
  }, [provider]);

  const hardCap = () => {
    return `$${HARD_CAP * CLI_PRICE}`;
  };

  const percentage = () => {
    return ((sold * 100) / HARD_CAP).toFixed(2);
  };

  return (
    <div className="flex flex-col w-full items-center space-y-2">
      <div className="w-full rounded-full">
        <div className="flex justify-between mb-1">
          <span className="text-base font-medium text-blue-700 dark:text-white"></span>
          <span className="text-sm font-medium text-blue-700 dark:text-white">
            Hard Cap: {hardCap()}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
            style={{ width: `${percentage()}%` }}
          >
            {percentage()}%
          </div>
        </div>
        <div className="flex justify-between mb-1">
          <span className="text-base font-medium text-blue-700 dark:text-white"></span>
          <span className="text-sm font-medium text-blue-700 dark:text-white">
            {sold} / {HARD_CAP} CIL
          </span>
        </div>
      </div>
    </div>
  );
};

export default PresaleInfo;
