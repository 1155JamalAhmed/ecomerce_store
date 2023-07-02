import ClickAwayListener from "@material-ui/core/ClickAwayListener/ClickAwayListener";
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
import { productData } from "../../static/data";

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    setShowSearchDropdown(true);

    const filteredProducts =
      productData &&
      productData.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filteredProducts);

    if (term.length === 0) {
      setSearchData(null);
    }
  };

  return (
    <>
      <ClickAwayListener
        onClickAway={(event) => {
          setShowSearchDropdown(false);
        }}
      >
        <div>
          <input
            type="text"
            placeholder="Search Product..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full h-[40px] rounded-md px-2 placeholder-gray-300 border-2 focus:border-blue-500 
            "
          />
          <AiOutlineSearch
            size={30}
            className="absolute top-1.5 right-2 cursor-pointer"
          />
        </div>
      </ClickAwayListener>
      {showSearchDropdown && searchData && searchData.length !== 0 && (
        <div className="absolute min-h-[30vh] max-h-[70vh] bg-slate-50 shadow-sm-2 z-[9] py-4 top-11 overflow-y-auto w-full">
          {searchData.map((item, index) => {
            const Product_name = item.name.replace(/\s+/g, "-");
            return (
              <Link to={`/products/${Product_name}`}>
                <div className="flex py-2 hover:bg-slate-200 px-4">
                  <img
                    src={item.image_Url[0].url}
                    alt=""
                    className="w-[40px] h-[40px] mr-[10px]"
                  />
                  <h1>{item.name}</h1>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
};

export default SearchInput;
