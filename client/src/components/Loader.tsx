import { memo } from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center ">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-blue-600 font-semibold">Loading...</span>
      </div>
    </div>
  );
};

export default memo(Loader);