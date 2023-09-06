import React from "react";
import { AiOutlineGift } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { Link } from "react-router-dom";
import { BiMessageSquareDetail } from "react-icons/bi";
import { backend_url } from "../../../../server";
import { useSelector } from "react-redux";

const headerNavigationOptions = [
  {
    to: "/dashboard/coupon-codes",
    icon: AiOutlineGift,
  },
  {
    to: "/dashboard/events",
    icon: MdOutlineLocalOffer,
  },
  {
    to: "/dashboard/products",
    icon: FiShoppingBag,
  },
  {
    to: "/dashboard/coupon-codes",
    icon: AiOutlineGift,
  },
  {
    to: "/dashboard/orders",
    icon: FiPackage,
  },
  {
    to: "/dashboard/inbox",
    icon: BiMessageSquareDetail,
  },
];

const ShopDashboardHeader = () => {
  const { shop } = useSelector((state) => state.shop);

  return (
    <div className="col-span-12 h-[80px] bg-white shadow flex items-center justify-between px-4 sticky top-0 left-0 z-50">
      {/* LOGO */}
      <div>
        <Link to="/shop-dashboard">
          <img
            src="https://img.icons8.com/external-itim2101-lineal-color-itim2101/64/null/external-online-shopping-shopping-and-ecommerce-itim2101-lineal-color-itim2101-4.png"
            alt="shoping icon"
          />
        </Link>
      </div>
      {/* Navigation */}
      <div className="flex items-center">
        <div className="flex items-center">
          <div className="hidden items-center 800px:flex">
            {headerNavigationOptions.map(({ to, icon: Icon }, index) => (
              <Link to={to} key={index}>
                <Icon color="#555" size={30} className="mx-5 cursor-pointer" />
              </Link>
            ))}
          </div>
          <Link to={`/shops/${shop._id}`}>
            <img
              src={`${backend_url}/${shop.avatarImage}`}
              alt="shop avatar"
              className="w-[50px] h-[50px] rounded-full object-cover ml-5"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShopDashboardHeader;
