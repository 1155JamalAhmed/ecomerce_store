import { ClickAwayListener } from "@mui/material";
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import axiosInstance from "../../utils/axiosInstance";
import { backend_url } from "../../server";
import Loader from "../layout/Loader";
import styles from "../../styles/styles";

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [searchDataIsLoading, setSearchDataIsLoading] = useState(false);
  const [searchDataHasError, setSearchDataHasError] = useState(null);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  const handleSearchChange = async (e) => {
    const term = e.target.value.trim();
    setSearchTerm(term);
    setShowSearchDropdown(true);
    if (term.length !== 0) {
      try {
        setSearchDataIsLoading(true);
        const res = await axiosInstance.get(
          `/products/search-products-by-name?productName=${term}`
        );
        setSearchData(res.data.body);
        setSearchDataHasError(null);
      } catch (err) {
        setSearchDataHasError(err.response.data.message);
      } finally {
        setSearchDataIsLoading(false);
      }
    } else {
      setSearchData(null);
      setSearchDataHasError(null);
      setShowSearchDropdown(false);
    }
  };

  return (
    <>
      <ClickAwayListener onClickAway={() => setShowSearchDropdown(false)}>
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

      {/* for desktop */}
      {showSearchDropdown && (
        <div
          className={`absolute min-h-[37vh] max-h-[70vh] bg-slate-50 shadow-sm z-[9] py-4 top-11 overflow-y-auto w-full`}
        >
          {searchDataIsLoading && !searchDataHasError && (
            <Loader className="max-h-[35vh]" />
          )}
          {!searchDataIsLoading && searchDataHasError && (
            <h1 className={`${styles.error}`}>{searchDataHasError}</h1>
          )}
          {!searchDataIsLoading && searchData && searchData.length === 0 && (
            <h1 className={`${styles.error}`}>
              No product found with this product name
            </h1>
          )}
          {searchData &&
            searchData?.map((item, index) => {
              return (
                <Link
                  to={`/products/${item.slug}`}
                  key={index}
                  onClick={() => handleSearchChange({ target: { value: "" } })}
                >
                  <div className="flex py-2 hover:bg-slate-200 px-4">
                    <img
                      src={`${backend_url}/${item.images[0]}`}
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
