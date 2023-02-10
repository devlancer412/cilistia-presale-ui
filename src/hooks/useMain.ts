import { useContext } from "react";
import { MainContext } from "@/contexts/MainProvider";

const useMain = () => useContext(MainContext);

export default useMain;
