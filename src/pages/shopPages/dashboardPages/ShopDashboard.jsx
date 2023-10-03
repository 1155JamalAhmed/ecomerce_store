import React from "react";
import ShopDashboardHeader from "../../../components/shop/dashboard/layout/ShopDashboardHeader";
import ShopDashboardSideBar from "../../../components/shop/dashboard/layout/ShopDashboardSideBar";
import { Outlet } from "react-router-dom";
import useActiveTab from "../../../hooks/useActiveTab";
const activeTabMapping = {
  "/shops/dashboard/orders": 2,
  "/shops/dashboard/products": 3,
  "/shops/dashboard/create-product": 4,
  "/shops/dashboard/events": 5,
  "/shops/dashboard/create-event": 6,
  "/shops/dashboard/withdraw-money": 7,
  "/shops/dashboard/inbox": 8,
  "/shops/dashboard/coupon-codes": 9,
  "/shops/dashboard/settings": 10,
};

const ShopDashboard = () => {
  const activeTab = useActiveTab(activeTabMapping);
  return (
    <div className="grid grid-cols-[80px] 800px:grid-cols-[220px] repeat(11, 1fr)">
      <ShopDashboardHeader />
      <ShopDashboardSideBar active={activeTab} />
      <div className="col-span-11 overflow-hidden bg-white shadow rounded-[4px] p-3 my-0 400px:my-4 justify-self-center  w-[100%]  max-w-[1180px] 400px:w-[90%]">
        <Outlet />
      </div>
    </div>
  );
};

export default ShopDashboard;
