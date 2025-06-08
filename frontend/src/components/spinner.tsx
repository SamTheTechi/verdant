import React from "react";

const Spinner = () => {
  return (
    <div className="relative w-[50px] aspect-square grid place-items-center animate-spin border-4 border-transparent border-r-[#25b09b] rounded-full">
      <div className="absolute inset-0 m-[2px] border-4 border-transparent border-r-[#25b09b] rounded-full animate-spin-slow" />
      <div className="absolute inset-0 m-[8px] border-4 border-transparent border-r-[#25b09b] rounded-full animate-spin-slower" />
    </div>
  );
}

export default Spinner;
