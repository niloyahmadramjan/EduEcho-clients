import Lottie from "lottie-react";
import React, { use } from "react";
import { Link } from "react-router";
import loginAnimation from "../../assets/lotties/register.json";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";

const Login = () => {
  const { user, handleUserSignIn } = use(AuthContext);
  
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const pass = form.pass.value;
    handleUserSignIn(email, pass)
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "LogIn successfull !",
          showConfirmButton: false,
          timer: 2000,
        });
        form.reset();
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: error.message,
          showConfirmButton: false,
          timer: 2000,
        });
        form.reset();
      });
  };
  console.log(user);

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 w-full max-w-6xl">
        {/* Left Side - Login Form */}
        <div className="bg-base-100 rounded-2xl shadow-xl p-8 w-full">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-6">
            Welcome Back
          </h2>
          <p className="text-center mb-8 text-gray-500">
            Login to your account to continue
          </p>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="label font-semibold">Email</label>
              <input
                type="email"
                name="email"
                className="input input-bordered w-full"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4">
              <label className="label font-semibold">Password</label>
              <input
                type="password"
                name="pass"
                className="input input-bordered w-full"
                placeholder="Enter your password"
              />
            </div>
            <div className="text-right mb-4">
              <a className="link link-hover text-sm text-primary">
                Forgot password?
              </a>
            </div>
            <button className="btn btn-primary w-full">Login</button>
          </form>
          <p className="text-center text-sm mt-6">
            Don't have an account?
            <Link to="/register" className="link link-primary ml-1">
              Register
            </Link>
          </p>
        </div>

        {/* Right Side - Lottie Animation */}
        <div className="hidden lg:flex justify-center">
          <Lottie animationData={loginAnimation} loop={true}></Lottie>
        </div>
      </div>
    </div>
  );
};

export default Login;
