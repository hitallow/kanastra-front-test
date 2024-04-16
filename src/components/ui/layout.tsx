import { ReactElement } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../navbar";

function Layout(): ReactElement {
  return (
    <>
      <Navbar />
      <main className="p-6 flex flex-col gap-8">
        <Outlet />
      </main>
    </>
  );
}

export { Layout };
