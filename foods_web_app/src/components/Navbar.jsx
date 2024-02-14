import React, { useState, useEffect, useContext } from "react";
import logo from "/images/logo.png";
import { FaRegUser } from "react-icons/fa";
import Modal from "./Modal";
import { AuthContext } from "../contexts/AuthProvider";
import Profile from "./Profile";
import { Link } from "react-router-dom";
import useCart from "../hooks/useCart";

const Navbar = () => {
  // Handle Scroll function
  const [isSticky, setSticky] = useState(false);
  const { user } = useContext(AuthContext);
  const [cart, refetch] = useCart();

  console.log('aaaaaaaaaaaaaaaaaaaa : ', cart);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const NavItems = (
    <>
      <li>
        <a className="text-green" href="/">
          Home
        </a>
      </li>
      <li>
        <details>
          <summary>Menu</summary>
          <ul className="p-2">
            <li>
              <a href="/menu">All</a>
            </li>
            <li>
              <a>Salad</a>
            </li>
            <li>
              <a>Pizza</a>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <details>
          <summary>Services</summary>
          <ul className="p-3">
            <li>
              <a>Online Orders</a>
            </li>
            <li>
              <a>Table Booking</a>
            </li>
            <li>
              <a>Order Tracking</a>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <a>Offers</a>
      </li>
    </>
  );
  return (
    <header className="container fixed top-0 left-0 right-0 z-10 mx-auto max-w-screen-2xl">
      <div
        className={`navbar xl:px-24 ${
          isSticky
            ? "shadow-lg bg-base-100 transition-all duration-300 ease-linear-out"
            : ""
        }`}
      >
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              {/* Nav Items List */} {NavItems}
            </ul>
          </div>
          <a href="/">
            <img src={logo} alt="" />
          </a>
        </div>
        <div className="hidden navbar-center lg:flex">
          <ul className="px-1 menu menu-horizontal">
            {/* Nav Items List */} {NavItems}
          </ul>
        </div>
        <div className="gap-2 py-3 navbar-end">
          {/* Search button */}
          <button className="hidden btn btn-ghost btn-circle lg:flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          {/* Cart button */}
          <Link to="/cart-page">
            {" "}
            <div
              role="button"
              className="hidden btn btn-ghost lg:flex btn-circle"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">
                  {cart.length || 0}
                </span>
              </div>
            </div>
          </Link>
          <div className="pr-8 md:pl-3">
            {/* Contact button */}
            {user ? (
              <Profile user={user} />
            ) : (
              <button
                onClick={() =>
                  document.getElementById("my_modal_5").showModal()
                }
                className="flex items-center gap-2 px-5 py-2 text-white rounded-full hover:bg-gray-300 bg-green"
              >
                <FaRegUser /> Login
              </button>
            )}
          </div>

          {/* Modal */}
          <Modal />
        </div>
      </div>
    </header>
  );
};

export default Navbar;