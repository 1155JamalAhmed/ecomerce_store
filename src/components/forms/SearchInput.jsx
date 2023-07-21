import ClickAwayListener from "@material-ui/core/ClickAwayListener/ClickAwayListener";
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
import { productData } from "../../static/data";
import { RxCross1 } from "react-icons/rx";

const SearchInput = ({ isMobile = false, closeMobileHeaderDrawer }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    !isMobile && setShowSearchDropdown(true);

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

  const searchedItems = (
    <div className="absolute min-h-[30vh] max-h-[70vh] bg-slate-50 shadow-sm-2 z-[9] py-4 top-11 overflow-y-auto w-full">
      {searchData?.map((item, index) => {
        const Product_name = item.name.replace(/\s+/g, "-");
        return (
          <Link
            to={`/products/${Product_name}`}
            key={index}
            onClick={isMobile ? closeMobileHeaderDrawer : () => handleSearchChange({ target: { value: "" } })}
          >
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
  );

  return (
    <>
      <ClickAwayListener
        onClickAway={() => {
          !isMobile && setShowSearchDropdown(false);
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
          {searchTerm.length === 0 && (
            <AiOutlineSearch
              size={30}
              className="absolute top-1.5 right-2 cursor-pointer"
            />
          )}
          {searchTerm.length > 0 && (
            <div
              className="absolute top-0 right-2 cursor-pointer h-full flex items-center"
              onClick={() => handleSearchChange({ target: { value: "" } })}
            >
              <RxCross1
                size={24}
                className="hover:scale-105 hover:text-[red] hover:bg-gray-100 p-1 rounded-full"
              />
            </div>
          )}
        </div>
      </ClickAwayListener>

      {/* For mobile */}
      {isMobile ? searchData && searchData.length !== 0 && searchedItems : null}

      {/* for desktop */}
      {!isMobile
        ? showSearchDropdown &&
          searchData &&
          searchData.length !== 0 &&
          searchedItems
        : null}
    </>
  );
};

export default SearchInput;
