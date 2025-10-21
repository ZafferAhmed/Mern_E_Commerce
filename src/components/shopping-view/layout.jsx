import React from "react";
import { Outlet } from "react-router-dom";
import ShoppingViewHeader from "./header";
import ShoppingViewSidebar from "./sidebar";
import ShoppingViewFooter from "./footer";

const ShoppingViewLayout = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-white w-full border">
        <div className="border flex items-center justify-center">
          <ShoppingViewHeader />
        </div>

        <div className="flex flex-1 overflow-hidden w-full">
          {/* <div className="w-fit max-w-64 border-r overflow-auto flex justify-center">
            <ShoppingViewSidebar />
          </div> */}

          <main className="flex-1 bg-muted/40 p-4 md:p-6 overflow-auto flex">
            <Outlet />
          </main>
        </div>

        <h1 className="h-24 border rounded-lg flex items-center justify-center">
          <ShoppingViewFooter />
        </h1>
      </div>
    </>
  );
};

export default ShoppingViewLayout;
