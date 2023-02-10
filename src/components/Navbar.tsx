import { Web3Button } from "@web3modal/react";

const Navbar = () => {
  return (
    <div className="flex w-full justify-between items-center h-16 px-5">
      <span>Cilistia</span>
      <Web3Button />
    </div>
  );
};

export default Navbar;
