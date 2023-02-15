import { Timer, PresaleInfo, Buy } from "@/components";

const Presale = () => {
  return (
    <div className="flex flex-row h-full items-center">
      <div className="flex flex-col flex-1">
        <Timer />
        <Buy />
      </div>
      <div className="flex-1">
        <PresaleInfo />
      </div>
    </div>
  );
};

export default Presale;
