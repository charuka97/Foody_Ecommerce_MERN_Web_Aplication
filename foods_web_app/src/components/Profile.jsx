import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import Dashboard from "./../pages/dashboard/admin/Dashboard";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
const Profile = ({ user }) => {
  const { logOut } = useContext(AuthContext);

  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/users`);
      return res.json();
    },
  });

  const handleLogOut = () => {
    logOut()
      .then(() => {
        // Sign-out successful.
        alert("Log Out!");
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <div>
      <div className="drawer drawer-end z-50">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-4"
            className="drawer-button btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              {user.photoURL ? (
                <img alt="Tailwind CSS Navbar component" src={user.photoURL} />
              ) : (
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              )}
            </div>
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <li>
              <a href="/update-profile">Profile</a>
            </li>
            <li>
              <a>Order</a>
            </li>
            <li>
              <a>Setting</a>
            </li>
            {/* {user.role === "admin" && (
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
            )} */}
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>

            <li>
              <a onClick={handleLogOut}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
