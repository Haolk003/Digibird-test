import "./App.css";
import Routers from "./routers";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <Routers />
        <Toaster position="top-center" />
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
