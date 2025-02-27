import React from "react";
import OutletData from "./routes/routes";
import { Toaster } from 'react-hot-toast'
const App = () => {
  return (
    <div className="bg-[#F2F4F7] lg:w-full lg:h-screen h-[80%]">
      <>
        <OutletData/>
        <Toaster/>
      </>
    </div>
  );
};

export default App;
