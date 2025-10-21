import React from "react";

const UnAuthPage = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-10">
        <div className="flex items-center justify-center w-screen">
          <div className="w-12 h-12 border-4 border-orange-500 rounded-lg duration-300 animate-spin flex items-center justify-center">
            <div className="w-6 h-6 border-4 border-green-400 rounded-lg duration-300 animate-spin flex items-center justify-center">
              <div className="w-3 h-3 bg-violet-600 rounded-lg animate-spin duration-300 "></div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-screen">
          <h1 className="text-wrap text-2xl text-blue-500 animate-bounce duration-1000">
            You don't have an access to view this page
          </h1>
        </div>
      </div>
    </>
  );
};

export default UnAuthPage;
