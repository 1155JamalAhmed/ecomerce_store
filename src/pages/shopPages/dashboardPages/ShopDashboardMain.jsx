import React from "react";
import styles from "../../../styles/styles";
import BarChart from "../../../components/charts/BarChart";
import { GrCompliance } from "react-icons/gr";
import { Link } from "react-router-dom";
import Choropleth from "../../../components/charts/Cloropleth";
import { BsCashCoin } from "react-icons/bs";
import { MdProductionQuantityLimits } from "react-icons/md";
import { SiEventstore } from "react-icons/si";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { AiOutlineArrowRight } from "react-icons/ai";

const ShopDashboardMain = () => {
  const allOrders = useSelector((state) => state.shop.shop.orders);
  const allProducts = useSelector((state) => state.products.products);
  const allEvents = useSelector((state) => state.events.events);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 100, flex: 0.7 },

    {
      field: "orderInfo",
      flex: 1,
      minWidth: 200,
      headerName: "Product Name x Quantity",
      type: "string",
      sortable: false,
      renderCell: (params) => {
        return (
          <div>
            {params.value.map((orderItem) => (
              <h2 key={orderItem._id}>
                {orderItem.product.name} x {orderItem.quantity}
              </h2>
            ))}
          </div>
        );
      },
    },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.value === "Processing"
          ? "text-[#ff9900]"
          : "text-[#128f01]";
      },
    },
    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 100,
      valueFormatter: (params) => `US$ ${params.value}`,
      flex: 0.8,
    },

    {
      field: "Details",
      flex: 1,
      minWidth: 80,
      headerName: "Details",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/orders/${params.id}`} state={{ from: "shop" }}>
            <Button>
              <AiOutlineArrowRight size={20} />
            </Button>
          </Link>
        );
      },
    },
  ];

  const row = [];
  allOrders &&
    allOrders.forEach((item) => {
      row.push({
        id: item._id,
        orderInfo: item.cart,
        total: item.totalAmount,
        status: item.status,
      });
    });

  return (
    <>
      <h1 className={`${styles.profileHeading}`}>Dashboard</h1>
      <div className="block space-y-4 800px:flex 800px:space-x-4 800px:space-y-0 my-8">
        <div className="flex-1 bg-gray-50 p-4 ">
          <div className="flex space-x-2">
            <div>
              <BsCashCoin size={24} color="#1f2937" />
            </div>
            <div>
              <h1 className="text-gray-800 font-[600] mb-1 leading-none">
                Account Balance (with 10% service charges)
              </h1>
              <h1 className="text-gray-600">$115.83</h1>
            </div>
          </div>
          <Link to="/shops/dashboard/withdraw-money" className="text-sky-700">
            Withdraw Money
          </Link>
        </div>
        <div className="flex-1 bg-gray-50 p-4 ">
          <div className="flex space-x-2 items-start">
            <div>
              <MdProductionQuantityLimits size={24} color="#1f2937" />
            </div>
            <div>
              <h1 className="text-gray-800 font-[600] mb-1 leading-none">
                Total Products
              </h1>
              <h1 className="text-gray-600">{allProducts.length}</h1>
            </div>
          </div>
          <Link to="/shops/dashboard/products" className="text-sky-700">
            All Products
          </Link>
        </div>
        <div className="flex-1 bg-gray-50 p-4 ">
          <div className="flex space-x-2 items-start">
            <div>
              <SiEventstore size={24} color="#1f2937" />
            </div>
            <div>
              <h1 className="text-gray-800 font-[600] mb-1 leading-none">
                All Events
              </h1>
              <h1 className="text-gray-600">{allEvents.length}</h1>
            </div>
          </div>
          <Link to="/shops/dashboard/events" className="text-sky-700">
            All Events
          </Link>
        </div>
      </div>
      <div className="flex justify-between flex-col 1000px:flex-row">
        <div className="w-full 1000px:w-[40%]">
          <div className="flex flex-col">
            <div className="flex items-center space-x-1">
              <GrCompliance size={20} color="blue" />
              <h2 className="font-[500] text-gray-600">All Orders</h2>
              <h2 className="font-[400] text-gray-500">{allOrders.length}</h2>
            </div>
            <Link
              to="/shops/dashboard/orders"
              className="text-sky-600 text-[14px] mt-1"
            >
              View Orders
            </Link>
          </div>
          <div className="w-[360px] m-auto 1000px:w-full h-[250px] mt-4">
            <BarChart />
          </div>
        </div>
        <div className="w-full 1000px:w-[460px]">
          <div className="flex flex-col">
            <div className="flex items-center space-x-1">
              <GrCompliance size={20} color="blue" />
              <h2 className="font-[500] text-gray-600">
                Orders Distribution Per District
              </h2>
            </div>
            <Link
              to="/shops/dashboard/create-product"
              className="text-sky-600 text-[14px] mt-1"
            >
              Create new product
            </Link>
          </div>
          <div className="w-[360px] m-auto 1000px:w-full h-[250px] mt-4">
            <Choropleth />
          </div>
        </div>
      </div>
      <h1 className="text-gray-800 font-[600] mt-8 mb-2">Recent Orders</h1>
      <div className="w-full bg-[#f1f1f1ce] mb-8">
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          hideFooter
        />
      </div>
    </>
  );
};

export default ShopDashboardMain;
