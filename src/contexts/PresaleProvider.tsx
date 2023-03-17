import {
  createContext,
  FC,
  ReactNode,
  useEffect,
  useState,
  useRef,
} from "react";
import { providers } from "ethers";
import { PresaleStatus } from "@/types";
import {
  START_TIME,
  CLOSE_TIME,
  NETWORK,
  PROVIDER,
  HARD_CAP,
} from "@/constants";
import { getPresaleContract, getRemainCil } from "@/utils/app";

const provider = new providers.JsonRpcProvider(PROVIDER, NETWORK);

const presaleContract = getPresaleContract(provider);

interface PresaleContextType {
  status: PresaleStatus;
  remainingSeconds: number;
  sold: number;
}

export const PresaleContext = createContext<PresaleContextType>(
  {} as PresaleContextType
);

type Props = {
  children: ReactNode;
};

const PresaleProvider: FC<Props> = ({ children }) => {
  const [status, setStatus] = useState<PresaleStatus>(
    PresaleStatus.NOT_STARTED
  );
  const [remainingSeconds, setRemainingSeconds] = useState<number>(0);
  const [sold, setSold] = useState<number>(0);
  const timer = useRef<NodeJS.Timer | undefined>(undefined);

  useEffect(() => {
    provider.on(presaleContract.filters.Buy(null), () => {
      getRemainCil(provider).then((remain) => setSold(HARD_CAP - remain));
    });
  }, []);

  useEffect(() => {
    if (status !== PresaleStatus.NOT_STARTED) {
      getRemainCil(provider).then((remain) => setSold(HARD_CAP - remain));
    }
  }, [status]);

  useEffect(() => {
    const currentTime = Math.floor(Date.now() / 1000);

    if (currentTime < START_TIME) {
      setStatus(PresaleStatus.NOT_STARTED);
      setRemainingSeconds(START_TIME - currentTime);
      timer.current = setInterval(() => {
        checkStatus();
      }, 200);
    } else if (currentTime < CLOSE_TIME) {
      setStatus(PresaleStatus.OPEN);
      setRemainingSeconds(CLOSE_TIME - currentTime);
      timer.current = setInterval(() => {
        checkStatus();
      }, 200);
    } else {
      setStatus(PresaleStatus.CLOSED);
    }
  }, []);

  const checkStatus = () => {
    const currentTime = Math.floor(Date.now() / 1000);

    if (currentTime < START_TIME) {
      setStatus(PresaleStatus.NOT_STARTED);
      setRemainingSeconds(START_TIME - currentTime);
    } else if (currentTime < CLOSE_TIME) {
      setStatus(PresaleStatus.OPEN);
      setRemainingSeconds(CLOSE_TIME - currentTime);
    } else {
      setRemainingSeconds(0);
      if (timer.current) {
        clearInterval(timer.current);
        timer.current = undefined;
      }

      setStatus(PresaleStatus.CLOSED);
    }
  };

  return (
    <PresaleContext.Provider value={{ sold, status, remainingSeconds }}>
      {children}
    </PresaleContext.Provider>
  );
};

export default PresaleProvider;
