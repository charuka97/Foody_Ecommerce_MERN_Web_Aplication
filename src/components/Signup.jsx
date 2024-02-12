import React, { useContext } from "react";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import Modal from "./Modal";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { signUpWithGmail, createUser, login } = useContext(AuthContext);

  //Redirecting to home page or specific page
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    createUser(email, password)
      .then((result) => {
        // Signed up
        const user = result.user;
        alert("Account Creation successfully!");
        //Navigate to home page
        document.getElementById("my_modal_5").close()
        navigate(from, { replace: true });
      })
      .catch((error) => {
        const errorMessage = error.message;
      });
  };

    //enable sign up with google
    const handleSignUp = () => {
      signUpWithGmail()
        .then((result) => {
          const user = result.user;
          alert("Login Successfully!");
          document.getElementById("my_modal_5").close()
          navigate(from, { replace: true });
        })
        .catch((error) => console.log(data));
    };

  return (
    <div className="max-w-[23rem] bg-white shadow w-full mx-auto flex items-center justify-center my-20 pb-8">
      <div className="modal-action mt-0 flex flex-col justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card-body"
          method="dialog"
        >
          <h3 className="font-bold text-lg text-center">Create An Account!</h3>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered"
              {...register("email")}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered"
              {...register("password")}
            />
          </div>
          {/* Error Text here */}

          {/* Login button */}
          <div className="form-control mt-6">
            <input
              type="submit"
              value="Sign Up"
              className="btn bg-green text-white"
            />
          </div>

          <p className="text-center my-2">
            Have an account?{" "}
            <button
              onClick={() => document.getElementById("my_modal_5").showModal()}
              className="underline text-red ml-1"
            >
              Login
            </button>
          </p>
          <Link
            to="/"
            onClick={() => document.getElementById("my_modal_5").close()}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </Link>
        </form>

        {/* Social sign in */}
        <div className="text-center space-x-3 mn-5">
          <button className="btn btn-circle hover:bg-green hover:text-white" onClick={handleSignUp}>
            <FaGoogle />
          </button>
          <button className="btn btn-circle hover:bg-green hover:text-white">
            <FaFacebookF />
          </button>
          <button className="btn btn-circle hover:bg-green hover:text-white">
            <FaGithub />
          </button>
        </div>
      </div>
      <Modal />
    </div>
  );
};

export default Signup;
