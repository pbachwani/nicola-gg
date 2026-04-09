import React from "react";

const Contact = () => {
  return (
    <main className="flex justify-center items-center bg-blue-200">
      {/* <div className="absolute h-[70vh] md:h-[60vh] w-full top-0 bg-blue-200">
        {" "}
        hello
      </div> */}
      <div className="absolute w-full bottom-0 bg-black">
        <div className="flex flex-col h-full w-full justify-end items-center p-4">
          <img
            src="/logo-files/PNG/white horizontal.png"
            alt=""
            className="w-full h-auto px-4"
          />
        </div>
      </div>
      {/* <div className="absolute h-svh w-full inset-0">
        <div className="flex w-full h-full justify-center items-center p-100">
          <img
            src="/logo-files/PNG/white logo mark.png"
            alt=""
            className="lg:w-auto lg:h-full w-full h-auto object-cover"
          />
        </div>
      </div> */}
    </main>
  );
};

export default Contact;
