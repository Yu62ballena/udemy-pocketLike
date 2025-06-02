import Logo from "./Logo";
import InputFormGroup from "./InputFormGroup";
import UserIcon from "./UserIcon";

function Header() {
  return (
    <>
      <header className="flex justify-between items-center h-16">
        <Logo />
        <InputFormGroup />
        <UserIcon />
      </header>
      <hr className="mb-10" />
    </>
  );
}

export default Header;
