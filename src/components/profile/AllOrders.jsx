import { DataGrid } from "@mui/x-data-grid";
import Button from '@mui/material/Button';
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";

const AllOrders = () => {
  const orders = [
    {
      _id: "0900ysajdiaueklas",
      orderItems: [
        {
          name: "Iphone 14 pro max",
        },
        {
          name: "2 kg potato",
        },
      ],
      totalPrice: 120,
      orderStatus: "Processing",
    },
    {
      _id: "0900ysajdiaueklat",
      orderItems: [
        {
          name: "Iphone 14 pro max",
        },
        {
          name: "2 kg potato",
        },
      ],
      totalPrice: 120,
      orderStatus: "Processing",
    },
    {
      _id: "0900ysajdiaueklah",
      orderItems: [
        {
          name: "Iphone 14 pro max",
        },
        {
          name: "2 kg potato",
        },
      ],
      totalPrice: 120,
      orderStatus: "Processing",
    },
  ];

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/user/order/${params.id}`}>
            <Button>
              <AiOutlineArrowRight size={20} />
            </Button>
          </Link>
        );
      },
    },
  ];

  const row = [];
  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: `US$ ${item.totalPrice}`,
        status: item.orderStatus,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

export default AllOrders;
