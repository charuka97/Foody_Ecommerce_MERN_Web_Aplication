import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

const Cards = ({ item }) => {
  const [isHeartFileted, setIsHeartFileted] = useState(false);

  const handleHeartClick = () => {
    setIsHeartFileted(!isHeartFileted);
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div
        className={`rating gap-1 absolute right-2 top-2 p-3 heartStar bg-green ${
          isHeartFileted ? "text-rose-600" : "text-white"
        }`}
        onClick={handleHeartClick}
      >
        <FaHeart className="h-5 w-5 cursor-pointer" />
      </div>
      <Link to={`/menu/${item.id}`}>
        <figure>
          <img
            src={item.image}
            alt=""
            className="hover:scale-105 transition-all duration-200 md:h-72"
          />
        </figure>
      </Link>
      <div className="card-body">
        <Link to={`/menu/${item.id}`}>
          <h2 className="card-title">{item.name}</h2>
        </Link>
        <p>Description on the items</p>
        <div className="card-actions justify-between items-center mt-2">
          <h5 className="text-semibold">
            <span className="text-red text-sm text-semibold">$</span>
            {item.price}
          </h5>
          <button className="btn bg-green text-white">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
