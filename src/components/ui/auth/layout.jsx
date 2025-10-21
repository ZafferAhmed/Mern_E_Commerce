import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-white w-full border">
        <header className="border h-16 md:h-20 lg:h-24 flex items-center justify-center sticky top-0 z-10 bg-white">
          <h1 className="text-xl md:text-2xl font-semibold">Auth Header</h1>
        </header>

        <div className="flex flex-1 flex-col lg:flex-row overflow-hidden w-full">
          <div className="hidden lg:flex lg:w-1/2 overflow-hidden bg-white items-center justify-center p-4">
            <img
              src="https://img.freepik.com/free-vector/isometric-laptop-with-shopping-cart-keypad_1262-16544.jpg"
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              alt="Website Illustration"
            />
          </div>

          <main className="flex-1 bg-gray-50 p-4 md:p-6 overflow-auto flex items-center justify-center">
            <Outlet />
          </main>
        </div>

        <footer className="h-16 md:h-20 lg:h-24 border-t flex items-center justify-center bg-white">
          <span className="text-lg md:text-xl font-medium">Auth Footer</span>
        </footer>
      </div>
    </>
  );
};

export default AuthLayout;
