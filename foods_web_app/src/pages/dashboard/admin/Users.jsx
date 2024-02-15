import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaTrash } from "react-icons/fa";
import { FaUserShield } from "react-icons/fa6";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Users = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });
  // console.log(users);
  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      alert(`${user.name} is now admin`);
      refetch();
    });
  };

  const handleDeleteUser = (user) => {
    axiosSecure.delete(`/users/${user._id}`).then((res) => {
      alert(`${user.name} is removed from database`);
      refetch();
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mx-4 my-4 ">
        <h5>All Users</h5>
        <h5>Total Users : {users.length}</h5>
      </div>

      <div>
        <div className="overflow-x-auto">
          <table className="table md:w-[74rem] ">
            {/* head */}
            <thead className="text-white rounded-sm bg-green">
              <tr>
                <th>#</th>
                <th>Profile</th>
                <th>Name</th>
                <th>Email</th>
                <th className="pl-18">Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="avatar">
                      <div className="w-12 h-12 mask mask-squircle">
                        <img
                          src={
                            user.photoURL
                              ? user.photoURL
                              : "https://img.freepik.com/premium-vector/young-man-face-avater-vector-illustration-design_968209-15.jpg?w=740"
                          }
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </td>
                  <td className="font-medium">{user.name}</td>
                  <td className="font-medium">{user.email}</td>
                  <td className="font-medium">
                    {user.role === "admin" ? (
                      "Admin"
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="btn btn-sm btn-circle bg-indigo-500 text-white"
                      >
                        <FaUserShield />
                      </button>
                    )}
                  </td>

                  <td>
                    <button
                      className="bg-transparent border-none btn btn-sm text-red"
                      onClick={() => handleDeleteUser(user)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            {/* foot */}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
