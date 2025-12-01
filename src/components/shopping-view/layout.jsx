import React from "react";
import { Outlet } from "react-router-dom";
import ShoppingViewHeader from "./header";
import ShoppingViewSidebar from "./sidebar";
import ShoppingViewFooter from "./footer";

const ShoppingViewLayout = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-white w-full">
        <header className="w-full border flex justify-center items-center">
          <ShoppingViewHeader />
        </header>

        <main className="flex-1 overflow-y-auto bg-muted/40 p-4 md:p-6">
          <Outlet />
        </main>

        <footer className="h-24 border rounded-lg flex items-center justify-center">
          <ShoppingViewFooter />
        </footer>
      </div>
    </>
  );
};

export default ShoppingViewLayout;
