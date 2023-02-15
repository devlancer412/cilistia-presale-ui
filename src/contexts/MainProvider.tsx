import {
  createContext,
  FC,
  ReactNode,
  useEffect,
  useState,
  useRef,
} from "react";
import { PresaleStatus } from "@/types";
import { START_TIME, CLOSE_TIME } from "@/constants";

interface MainContextType {
  status: PresaleStatus;
  remainingSeconds: number;
}

export const MainContext = createContext<MainContextType>(
  {} as MainContextType
);

type Props = {
  children: ReactNode;
};

const MainProvider: FC<Props> = ({ children }) => {
  const [status, setStatus] = useState<PresaleStatus>(
    PresaleStatus.NOT_STARTED
  );
  const [remainingSeconds, setRemainingSeconds] = useState<number>(0);
  const timer = useRef<NodeJS.Timer | undefined>(undefined);
  // const [timer, setTimer] = useState<NodeJS.Timer | undefined>();

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
    <MainContext.Provider value={{ status, remainingSeconds }}>
      {children}
    </MainContext.Provider>
  );
};

export default MainProvider;
