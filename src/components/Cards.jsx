import React, { useContext, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import Swal from "sweetalert2";

const Cards = ({ item }) => {
  const { name, image, price, recipe, _id } = item;
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const { user } = useContext(AuthContext);

  //Redirecting to home page or specific page
  const location = useLocation();
  const navigate = useNavigate();

  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  // Add to cart button
  const handleAddToCart = (item) => {
    if (user && user?.email) {
      const cartItem = {
        menuItemId: _id,
        name,
        quantity: 1,
        image,
        price,
        email: user.email,
      };

      //implement add item to cart function here
    } else {
      Swal.fire({
        title: "Need to Login?",
        text: "Sorry, Without an account you can't able to add product!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Signup Now!",
      }).then((result) => {
        if (result.isConfirmed) {
          //Navigate to signup page
          navigate('/signup', {state:{from : location}});
        }
      });
    }
  };
  return (
    <div
      to={`/menu/${item._id}`}
      className="relative mr-5 shadow-xl card md:my-5"
    >
      <div
        className={`rating gap-1 absolute right-2 top-2 p-3.5 heartStar bg-green ${
          isHeartFilled ? "text-rose-500" : "text-white"
        }`}
        onClick={handleHeartClick}
      >
        <FaHeart className="w-3 h-3 cursor-pointer" />
      </div>
      <Link to={`/menu/${item._id}`}>
        <figure>
          <img
            src={item.image}
            alt=""
            className="transition-all duration-300 hover:scale-105 md:h-45"
          />
        </figure>
      </Link>
      <div className="card-body">
        <Link to={`/menu/${item._id}`}>
          <h2 className="card-title">{item.name}!</h2>
        </Link>
        <p>Description of the item</p>
        <div className="items-center justify-between mt-2 card-actions">
          <h5 className="font-semibold">
            <span className="text-sm text-red">$ </span> {item.price}
          </h5>
          <button
            className="text-white btn bg-green"
            onClick={() => handleAddToCart(item)}
          >
            Add to Cart{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
