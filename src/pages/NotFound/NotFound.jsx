import React from "react";
import Lottie from "lottie-react";
import notFoundAnimation from "../../assets/lotties/notFound.json";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-3xl">
        <Lottie animationData={notFoundAnimation} loop={true} />
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-error">Lost in Knowledge?</h1>
      <p className="text-gray-500 mt-2 mb-6">
        The page you're looking for doesn't exist.
      </p>

      <Link to="/" className="btn btn-primary">
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
