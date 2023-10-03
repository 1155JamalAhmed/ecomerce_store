import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const AllOrders = () => {
  const allOrders = useSelector((state) => state.user.user.orders);

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
        return params.value === "Processing" ? "text-[#ff9900]" : "text-[#128f01]";
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
          <Link
            to={`/orders/${params.id}`}
            state={{ from: "user" }}
          >
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
    <div className="pl-8 pt-1 w-full">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        hideFooter
      />
    </div>
  );
};

export default AllOrders;
