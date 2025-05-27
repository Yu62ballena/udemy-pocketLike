
import Logo from "./Logo";
import InputForm from "./InputForm";
import UserIcon from "./UserIcon";
import { ArticleData } from "../actions/extract-url-data";


interface HeaderProps {
  addArticleData: (newArticle: ArticleData) => void;
}

function Header({addArticleData}: HeaderProps) {
  return (
    <>
      <header className="flex justify-between items-center h-16">
        <Logo />
        <InputForm addArticleData={addArticleData} />
        <UserIcon />
      </header>
      <hr className="mb-12"/>
    </>
  );
}

export default Header;
