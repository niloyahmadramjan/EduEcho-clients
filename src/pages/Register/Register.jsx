import Lottie from "lottie-react";
import { Link } from "react-router";
import registerAnimation from "../../assets/lotties/registration.json";
import Swal from "sweetalert2";
import axios from "axios";
import AuthUser from "../../services/Hook/AuthUser";
import { useState } from "react";

const Register = () => {
  const { handleUserCreate, setUser, handleUserUpdate, setLoading } =
    AuthUser();

  const [passwordChecker, setPasswordChecker] = useState();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const userName = form.name.value;
    const imageUrl = form.imgURL.value;
    const userEmail = form.email.value;
    const password = form.pass.value;

    const pwdUppercase = /[A-Z]/;
    const pwdLowercase = /[a-z]/;
    const pwdLength = /^.{6,}$/;

    setPasswordChecker(null);
    if (!pwdUppercase.test(password)) {
      setPasswordChecker("Password should be at least one uppercase letter.");
      return;
    }
    if (!pwdLowercase.test(password)) {
      setPasswordChecker("Password should be at least one lowercase letter.");
      return;
    }
    if (!pwdLength.test(password)) {
      setPasswordChecker("Password should be at least 6 characters long.");
      return;
    }

    handleUserCreate(userEmail, password)
      .then((data) => {
        handleUserUpdate(userName, imageUrl).then(() => {
          setUser(data.user);
          axios
            .post("https://eduecho-server.vercel.app/userinfo", {
              uid: data.user.uid,
              name: userName,
              email: userEmail,
              photo: imageUrl,
            })
            .then(() => {})
            .catch((error) => {
              Swal.fire({
                position: "center",
                icon: "error",
                title: error.message,
                showConfirmButton: false,
                timer: 2000,
              });
              setLoading(false);
            });

          Swal.fire({
            position: "center",
            icon: "success",
            title: "Registration successful!",
            showConfirmButton: false,
            timer: 2000,
          });
          form.reset();
        });
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: error.message,
          showConfirmButton: false,
          timer: 2500,
        });
        form.reset();
        setLoading(false);
      });
  };
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 w-full max-w-6xl">
        {/* Left Side - Register Form */}
        <div className="bg-base-100 rounded-2xl shadow-xl p-8 w-full">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-6">
            Create Account
          </h2>
          <p className="text-center mb-8 text-gray-500">
            Join us and build your career!
          </p>
          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label className="label font-semibold">Full Name</label>
              <input
                name="name"
                type="text"
                className="input input-bordered w-full"
                placeholder="Your name"
                required
              />
            </div>
            <div className="mb-4">
              <label className="label font-semibold">Photo URL</label>
              <input
                name="imgURL"
                type="url"
                className="input input-bordered w-full"
                placeholder="Your photo URL"
                required
              />
            </div>
            <div className="mb-4">
              <label className="label font-semibold">Email</label>
              <input
                type="email"
                name="email"
                className="input input-bordered w-full"
                placeholder="Your email"
                required
              />
            </div>
            <div className="mb-4">
              <label className="label font-semibold">Password</label>
              <input
                type="password"
                name="pass"
                className="input input-bordered w-full"
                placeholder="Password"
                required
              />
              {passwordChecker ? (
                <span className="text-red-400">{passwordChecker}</span>
              ) : (
                ""
              )}
            </div>
            {/* {errorMessage? <p className="text-red-400 text-sm">{errorMessage}</p> : ''} */}
            <button className="btn btn-primary w-full">Register</button>
          </form>
          <p className="text-center text-sm mt-6">
            Already have an account?
            <Link to="/login" className="link link-primary ml-1">
              Login
            </Link>
          </p>
        </div>

        {/* Right Side - Lottie or Image */}
        <div className="hidden lg:flex justify-center">
          {/* Replace with Lottie if you want */}
          {/* <Lottie animationData={registerAnimation} loop={true} /> */}
          <Lottie animationData={registerAnimation} loop={true}></Lottie>
        </div>
      </div>
    </div>
  );
};

export default Register;
