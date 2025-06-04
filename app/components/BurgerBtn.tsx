import { FaBurger } from "react-icons/fa6";
import { Dispatch, SetStateAction } from "react";


interface BurgerBtnProps {
    isSidebarOpen: boolean;
    setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

function BurgerBtn({isSidebarOpen, setIsSidebarOpen}:BurgerBtnProps) {
  return (
    <div className="lg:hidden flex items-center">
      <button
        className="text-4xl"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <FaBurger />
      </button>
    </div>
  );
}

export default BurgerBtn;
