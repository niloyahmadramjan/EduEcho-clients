import React from "react";
import Lottie from "lottie-react";
import loadingAnimation from "../../assets/lotties/loadingBooks.json";

const LoadingAnimation = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="max-w-72">
        <Lottie animationData={loadingAnimation} loop={true} />
      </div>
    </div>
  );
};

export default LoadingAnimation;
