import ArticleLists from "./components/ArticleLists";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

export default function Home() {
  return (
    <div className="w-11/12 mx-auto">
      <Header />

      <div className="flex justify-between gap-10">
        <Sidebar />
        <ArticleLists />
      </div>
    </div>
  );
}
