import { ConnectButton } from "@rainbow-me/rainbowkit";

const Navbar = () => {
  return (
    <div className="flex w-full justify-between items-center h-16 px-5">
      <span>Cilistia</span>
      <ConnectButton />
    </div>
  );
};

export default Navbar;
