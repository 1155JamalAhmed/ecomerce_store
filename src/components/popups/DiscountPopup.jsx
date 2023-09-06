import React, { useMemo } from "react";
import PopupWrapper from "./PopupWrapper";

import { DataGrid } from "@mui/x-data-grid";
import styles from "../../styles/styles";
import { Box } from "@mui/material";

const baseColumnOptions = {
  sortable: false,
  pinnable: false,
  hideable: false,
};

const getCellClassName = ({ row, field }) => {
  if (row.name === "Total Discount") {
    if (field === "name" || field === "discountPrice") {
      return "bold";
    }
  }
  return "";
};

const DiscountPopup = ({ open, setOpen, discountData }) => {
  const columns = useMemo(
    () => [
      {
        field: "name",
        headerName: "Name",
        minWidth: 140,
        flex: 1.4,
        ...baseColumnOptions,
        colSpan: ({ row }) => {
          if (row.name === "Total Discount") {
            return 4;
          }
          return undefined;
        },
      },
      {
        field: "price",
        headerName: "Price",
        ...baseColumnOptions,
        valueFormatter: (params) => {
          return "US " + params.value + "$";
        },
        type: "number",
        minWidth: 120,
        flex: 1,
      },
      {
        field: "quantity",
        headerName: "Quantity",
        ...baseColumnOptions,
        type: "number",
        minWidth: 120,
        flex: 1,
      },
      {
        field: "totalPrice",
        headerName: "Total Price",
        ...baseColumnOptions,
        valueFormatter: (params) => {
          return "US " + params.value + "$";
        },
        type: "number",
        minWidth: 120,
        flex: 1,
      },
      {
        field: "discountPrice",
        ...baseColumnOptions,
        headerName: "Discount Price",
        valueFormatter: (params) => {
          return "US " + params.value.toFixed(2) + "$";
        },
        type: "number",
        minWidth: 120,
        flex: 2,
      },
    ],
    []
  );

  const rows = [];
  discountData.discountAvailableOn.forEach((item) =>
    rows.push({
      id: item._id,
      name: item.product.name,
      price: item.product.discountPrice,
      quantity: item.quantity,
      totalPrice: item.product.discountPrice * item.quantity,
      discountPrice:
        (item.product.discountPrice *
          item.quantity *
          discountData.disParcentage) /
        100,
    })
  );

  rows.push({
    id: "total",
    name: "Total Discount",
    discountPrice: discountData.totalDiscount,
  });

  return (
    <PopupWrapper open={open} setOpen={setOpen}>
      <h1 className={`${styles.heading}`}>Discount Details</h1>
      <Box
        sx={{
          width: "100%",
          "& .bold": {
            fontWeight: 600,
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          autoHeight
          disableColumnFilter
          disableRowSelectionOnClick
          hideFooter
          showCellVerticalBorder
          showColumnVerticalBorder
          getCellClassName={getCellClassName}
        />
      </Box>
    </PopupWrapper>
  );
};

export default DiscountPopup;
