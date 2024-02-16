import React from "react";
import usePayments from "../../hooks/usePayments";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Order = () => {
  const [orders, refetch] = usePayments();

  // formate dat type as standard
  const formatDate = (createdAt) => {
    const createdDate = new Date(createdAt).toLocaleDateString("en-US");
    return createdDate;
  };

  return (
    <div className="container px-4 py-20 mx-auto max-w-screen-2xl xl:px-24">
      <h2 className="pb-5 my-4 text-5xl font-semibold text-center">
        Track Your All <span className="text-green">Orders</span>
      </h2>
      <div>
        <div className="overflow-x-auto">
          <table className="table md:w-full ">
            {/* head */}
            <thead className="mr-10 text-white rounded-sm bg-green">
              <tr>
                <th>#</th>
                <th>Order Date</th>
                <th className="ml-1">TransactionId</th>
                <th>Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td className="font-medium">{formatDate(item.createdAt)}</td>
                  <td className="font-medium">{item.transactionId}</td>
                  <td className="font-medium">{item.price}</td>
                  <td className="font-medium">{item.status}</td>
                  <td>
                    <button className="bg-transparent border-none btn btn-sm text-red">
                      Connect
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

export default Order;
