import React from "react";

const Banner = () => {
  return (
    <div className="section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
      <div className="py-24 flex flex-col md:flex-row-reverse justify-between items-center gap-8">
        {/* Right */}
        <div className="md:w-1/2">
          <img className="pr-12" src="/images/home/banner.png" alt="" />
          <div className="flex flex-col md:flex-row items-center justify-around md:pl-20 gap-20 md:-mt-14 -mt-8">
            <div className="flex bg-white py-2 px-3 rounded-2xl items-center gap-3 shadow-lg w-64">
              <img
                className="rounded-2xl"
                src="/images/home/b-food1.png"
                alt=""
              />
              <div>
                <h5 className="font-medium mb-1 space-y-1">spicy Noodles</h5>
                <div className="rating rating-sm">
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                    checked
                    readOnly

                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                    readOnly

                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                    readOnly

                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                    readOnly

                  />
                </div>
                <p>
                  <span className="text-red text-sm">$</span>18.00
                </p>
              </div>
            </div>
            <div className="md:flex hidden bg-white py-2 px-3 rounded-2xl items-center gap-3 shadow-lg w-64">
              <img
                className="rounded-2xl"
                src="/images/home/image 13.png"
                alt=""
              />
              <div>
                <h5 className="font-medium mb-1 space-y-1">Vegetarian salad</h5>
                <div className="rating rating-sm ">
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                    readOnly

                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                    readOnly

                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                    readOnly

                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                    checked
                    readOnly

                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                    readOnly

                  />
                </div>
                <p>
                  <span className="text-red text-sm">$</span>18.00
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Left */}
        <div className="md:w-1/2 space-y-8 px-4">
          <h1 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
            Dive into Delights Of Delectable{" "}
            <span className="text-green">Food</span>
          </h1>
          <div className="md:w-2/3">
            <p className="text-base-600 text-[#4A4A4A]">
              Where Each Plate Weaves a Story of Culinary Mastery and Passionate
              Craftsmanship
            </p>
          </div>

          <button className="btn bg-green rounded-full px-8 py-2 font-semibold text-white">
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
