import React, { useEffect, useState } from "react";
import Cards from "../../components/Cards";
import { FaFilter } from "react-icons/fa";

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  useEffect(() => {
    const fetchedData = async () => {
      try {
        const res = await fetch("http://localhost:5000/menu");
        const data = await res.json();
        setMenu(data);
        setFilteredItems(data);
      } catch (e) {
        console.log("Error fetching data : ", e);
      }
    };
    fetchedData();
  }, []);

  //   set filter
  const filterItems = (category) => {
    const filtered =
      category === "all"
        ? menu
        : menu.filter((item) => item.category === category);

    setFilteredItems(filtered);
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  // set show all
  const showAll = () => {
    setFilteredItems(menu);
    setSelectedCategory("all");
    setCurrentPage(1);
  };

  //Shorting function
  const handleSortChange = (option) => {
    setSortOption(option);

    // Logic for sorting based on the selected option
    let sortedItems = [...filteredItems];

    switch (option) {
      case "A-Z":
        sortedItems.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z-A":
        sortedItems.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "low-to-high":
        sortedItems.sort((a, b) => a.price - b.price);
        break;
      case "high-to-low":
        sortedItems.sort((a, b) => b.price - a.price);
        break;
      default:
        // Do nothing for the "default" case
        break;
    }

    setFilteredItems(sortedItems);
    setCurrentPage(1);
  };

  //   Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="section-container">
      {/* Menu Banner */}
      <div className="section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
        <div className="flex flex-col items-center justify-center py-48">
          <div className="px-4 space-y-8 text-center">
            <h2 className="text-4xl font-bold leading-snug md:text-5xl md:leading-snug">
              Dive into Delights Of Delectable{" "}
              <span className="text-green">Food</span>
            </h2>

            <p className="text-base-600 text-[#4A4A4A] text-xl md:w-4/5 mx-auto">
              Where Each Plate Weaves a Story of Culinary Mastery and Passionate
              Craftsmanship
            </p>

            <button className="px-8 py-2 font-semibold text-white rounded-full btn bg-green">
              Order Now
            </button>
          </div>
        </div>
      </div>

      {/* Menu shop */}
      <div className="section-container">
        {/* filtering and shorting */}
        <div className="flex flex-col flex-wrap items-center mb-8 space-y-3 md:flex-row md:justify-between">
          {/* buttons */}
          <div className="flex flex-row flex-wrap justify-start gap-4 md:items-center md:gap-8">
            <button
              onClick={showAll}
              className={selectedCategory === "all" ? "active" : ""}
            >
              All
            </button>
            <button
              onClick={() => filterItems("salad")}
              className={selectedCategory === "salad" ? "active" : ""}
            >
              Salad
            </button>
            <button
              onClick={() => filterItems("pizza")}
              className={selectedCategory === "pizza" ? "active" : ""}
            >
              Pizza
            </button>
            <button
              onClick={() => filterItems("soup")}
              className={selectedCategory === "soup" ? "active" : ""}
            >
              Soups
            </button>
            <button
              onClick={() => filterItems("dessert")}
              className={selectedCategory === "dessert" ? "active" : ""}
            >
              Desserts
            </button>
            <button
              onClick={() => filterItems("drinks")}
              className={selectedCategory === "drinks" ? "active" : ""}
            >
              Drinks
            </button>
          </div>

          {/* shorting */}
          <div className="flex justify-end mb-4 rounded-md">
            <div className="p-2 bg-black ">
              <FaFilter className="w-4 h-4 text-white" />
            </div>
            <select
              name="sort"
              id="sort"
              onChange={(e) => handleSortChange(e.target.value)}
              value={sortOption}
              className="px-2 py-1 text-white bg-black rounded-sm"
            >
              <option value="default">Default</option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
              <option value="low-to-high">Low-to-High</option>
              <option value="high-to-low">High-to-Low</option>
            </select>
          </div>
        </div>

        {/* Products Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4 sm:grid-cols-2">
          {currentItems.map((item) => (
            <Cards key={item._id} item={item} />
          ))}
        </div>
      </div>

      {/* Pagination section */}
      <div className="flex justify-center my-8">
        {Array.from({
          length: Math.ceil(filteredItems.length / itemsPerPage),
        }).map((_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 rounded-full ${
              currentPage === index + 1 ? "bg-green text-white" : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Menu;
