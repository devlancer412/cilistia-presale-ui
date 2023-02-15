import { useContext } from "react";
import { PresaleContext } from "@/contexts/PresaleProvider";

const usePresale = () => useContext(PresaleContext);

export default usePresale;
