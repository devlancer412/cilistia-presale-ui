import { Timer, PresaleInfo, Buy } from "@/components";

const Presale = () => {
  return (
    <div className="flex flex-row h-full items-center justify-center space-x-64">
      <div className="flex flex-col">
        <Timer />
        <Buy />
      </div>
      <div>
        <PresaleInfo />
      </div>
    </div>
  );
};

export default Presale;
