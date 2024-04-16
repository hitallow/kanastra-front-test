import { ReactElement } from "react";
import { Outlet } from "react-router-dom";
import { Loading } from "../loading";
import { Navbar } from "../navbar";
import { useFileContext } from "./file";

function Layout(): ReactElement {
  const { state: {isLoading} } = useFileContext();
  return (
    <>
      <Navbar />
      <main className="p-6 flex flex-col gap-8">
        {isLoading && <Loading />}
        <Outlet />
      </main>
    </>
  );
}

export { Layout };
