import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Emojinator from "./Emojinator";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Emojinator />
  </StrictMode>
);
