import React from "react";
import { RxDashboard } from "react-icons/rx";
import { Link } from "react-router-dom";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { AiOutlineFolder, AiOutlineGift } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { VscNewFile } from "react-icons/vsc";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { BiMessageSquareDetail } from "react-icons/bi";

const ShopDashboardSideBar = ({ active }) => {
  const sideBarOptions = [
    { to: "/shops/dashboard/", icon: RxDashboard, label: "Dashboard" },
    { to: "/shops/dashboard/orders", icon: FiPackage, label: "All Orders" },
    {
      to: "/shops/dashboard/products",
      icon: FiShoppingBag,
      label: "All Products",
    },
    {
      to: "/shops/dashboard/create-product",
      icon: AiOutlineFolder,
      label: "Create Product",
    },
    {
      to: "/shops/dashboard/events",
      icon: MdOutlineLocalOffer,
      label: "All Events",
    },
    {
      to: "/shops/dashboard/create-event",
      icon: VscNewFile,
      label: "Create Events",
    },
    {
      to: "/shops/dashboard/withdraw-money",
      icon: CiMoneyBill,
      label: "Withdraw Money",
    },
    {
      to: "/shops/dashboard/inbox",
      icon: BiMessageSquareDetail,
      label: "Inbox",
    },
    {
      to: "/shops/dashboard/coupon-codes",
      icon: AiOutlineGift,
      label: "Discount Code",
    },
    {
      to: "/shops/dashboard/settings",
      icon: CiSettings,
      label: "Settings",
    },
  ];

  return (
    <div className="col-span-1">
      <div className="bg-white shadow-sm h-[90vh] overflow-y-auto fixed top-[80px] left-0">
        {sideBarOptions.map(({ to, icon: Icon, label }, index) => (
          <div className="w-full flex items-center p-4 last:mb-4" key={index}>
            <Link to={to} replace className="w-full flex items-center">
              <Icon
                size={30}
                color={`${active === index + 1 ? "crimson" : "#555"} `}
              />
              <h5
                className={`pl-2 text-[18px] font-[400] hidden 800px:block ${
                  active === index + 1 ? "text-[crimson]" : "text-[#555]"
                } `}
              >
                {label}
              </h5>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopDashboardSideBar;
