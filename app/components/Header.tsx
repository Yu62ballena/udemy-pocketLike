import Logo from "./Logo";
import InputForm from "./InputForm";
import UserIcon from "./UserIcon";

function Header() {
  return (
    <>
      <header className="flex justify-between items-center h-16">
        <Logo />
        <InputForm />
        <UserIcon />
      </header>
      <hr className="mb-10" />
    </>
  );
}

export default Header;
