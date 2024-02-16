import React from "react";
import useMenu from "../../../hooks/useMenu";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const ManageItems = () => {
  const [menu, refetch] = useMenu();
  const axiosSecure = useAxiosSecure();

  //   handleDeleteItem
  const handleDeleteMenuItem = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/menu/${item._id}`);
        if (res) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold my-4 ">
        Manage All <span className="text-green">Menu Item</span>
      </h2>
      <div>
        <div className="overflow-x-auto">
          <table className="table md:w-[74rem] ">
            {/* head */}
            <thead className="text-white rounded-sm bg-green mr-10">
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Item Name</th>
                <th className="ml-1">Price</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {menu.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="avatar">
                      <div className="w-12 h-12 mask mask-squircle">
                        <img
                          src={item.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </td>
                  <td className="font-medium">{item.name}</td>
                  <td className="font-medium">{item.price}</td>
                  <td>
                    <Link to={`/dashboard/update-menu/${item._id}`}>
                      <button className="btn btn-ghost btn-xs bg-orange-500 text-white">
                        <FaEdit />
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button
                      className="bg-transparent border-none btn btn-sm text-red"
                      onClick={() => handleDeleteMenuItem(item)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageItems;
