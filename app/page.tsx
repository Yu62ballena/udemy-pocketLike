import ArticleLists from "./components/ArticleLists";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

export default function Home() {
  return (
    <>
      <Header />

      {/* flexをdivに設定 */}
      <div>
        <Sidebar />
        <ArticleLists />
      </div>
    </>
  );
}
