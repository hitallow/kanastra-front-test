import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import * as Components from "./components";
import { FileProvider } from "./components/ui/file";
import * as Pages from "./pages";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <FileProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Components.Layout />}>
            <Route path="" index element={<Pages.Welcome />} />
            <Route path="/imports" element={<Pages.ListFileImports />} />
            <Route path="/import-new-file" element={<Pages.ImportFile />} />
            <Route path="*" element={<Components.NoMatch />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </FileProvider>
  </React.StrictMode>
);
