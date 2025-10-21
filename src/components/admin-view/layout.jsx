/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminViewSidebar from "./sidebar";
import AdminViewHeader from "./header";
import AdminViewFooter from "./footer";

const AdminViewLayout = (user) => {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <>
      <div className="flex flex-col min-h-screen bg-white w-full border">
        <div className="border flex items-center justify-center">
          <AdminViewHeader setOpen={setOpenSidebar} />
        </div>

        <div className="flex flex-1 overflow-hidden w-full">
          <div className="w-fit max-w-64 border-r overflow-auto flex justify-center">
            <AdminViewSidebar open={openSidebar} setOpen={setOpenSidebar} />
          </div>
          <main className="flex-1 bg-muted/40 p-4 md:p-6 overflow-auto flex">
            <Outlet />
          </main>
        </div>

        <h1 className="h-24 border rounded-lg flex items-center justify-center">
          <AdminViewFooter />
        </h1>
      </div>
    </>
  );
};

export default AdminViewLayout;
