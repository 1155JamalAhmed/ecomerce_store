import React from "react";
import { backend_url } from "../../server";
import store from "../../redux/store";
import { logoutShop } from "../../redux/actions/shopActions";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ShopInfo = ({ isOwner, shop, totalProducts }) => {
  const navigate = useNavigate();

  const logoutClickHandler = async () => {
    await store.dispatch(logoutShop());
    navigate("/shops/login-shop", { replace: true });
  };

  return (
    <div className="">
      <div className="w-full py-5">
        <div className="w-full flex items-ceter justify-center">
          <img
            src={`${backend_url}/${shop?.avatarImage}`}
            alt="shop icon"
            className="w-[150px] h-[150px] object-cover rounded-full"
          />
        </div>
        <h3 className="text-center py-2 text-[20px] ">
          {shop?.name || "Shop Name"}
        </h3>

        <p className="text-[16px] text-[#000000a6] p-[10px] flex items-center text-justify">
          {shop?.description || "Shop Description"}
        </p>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Address</h5>
        <h4 className=" text-[#000000a6]">{shop?.address || "Shop Address"}</h4>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Phone Number</h5>
        <h4 className=" text-[#000000a6]">
          {shop?.phone || "Shop phone number"}
        </h4>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Total Products</h5>
        <h4 className=" text-[#000000a6]">{totalProducts}</h4>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Shop Ratings</h5>
        <h4 className=" text-[#000000a6]">{shop?.avgRating}/5</h4>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Joined On</h5>
        <h4 className=" text-[#000000a6]">
          {Date(shop?.createdAt).slice(4, 15) || "Joining date of shop"}
        </h4>
      </div>

      {isOwner && (
        <div className="py-3 px-2 space-y-2">
          <Button variant="contained" color="tertiary" fullWidth size="large">
            Edit Shop
          </Button>
          <Button
            onClick={logoutClickHandler}
            variant="contained"
            color="error"
            fullWidth
            size="large"
          >
            Logout
          </Button>
        </div>
      )}
    </div>
  );
};

export default ShopInfo;
