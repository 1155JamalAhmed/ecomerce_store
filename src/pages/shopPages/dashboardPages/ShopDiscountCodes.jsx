import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { AiOutlineDelete } from "react-icons/ai";
import Store from "../../../redux/store";
import ActionPopup from "../../../components/popups/ActionPopup";
import { deleteCoupon } from "../../../redux/actions/couponActions";

import dayjs from "dayjs";
import CreateCouponCode from "../../../components/shop/dashboard/CouponCode/CreateCouponCode";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const ShopDiscountCodes = () => {
  const { coupons, isCouponsLoading, couponsError } = useSelector(
    (state) => state.coupons
  );

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [couponToBeDeleted, setCouponToBeDeleted] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteIconClickHadler = async (eventId) => {
    setOpen(true);
    setCouponToBeDeleted(eventId);
  };

  const onDeletionConfirmHandler = async (couponId) => {
    setIsDeleting(true);
    await Store.dispatch(deleteCoupon(couponId));
    setCouponToBeDeleted("");
    setIsDeleting(false);
    setOpen(false);
  };

  const columns = useMemo(
    () => [
      { field: "id", headerName: "Id", minWidth: 100, flex: 0.7 },
      {
        field: "name",
        headerName: "Name",
        minWidth: 140,
        flex: 1.4,
      },
      {
        field: "dateTimeRange",
        headerName: "Coupon Duration",
        minWidth: 350,
        flex: 1,
      },
      {
        field: "disPercentage",
        headerName: "Discount %",
        valueFormatter: (params) => {
          return params.value + "%";
        },
        type: "number",
        minWidth: 100,
        flex: 1,
      },
      {
        field: "minAmount",
        headerName: "Min Amount",
        valueFormatter: (params) => {
          return params.value ? "US " + params.value + "$": "--";
        },
        type: "number",
        minWidth: 100,
        flex: 0.6,
      },
      {
        field: "maxAmount",
        headerName: "Max Amount",
        valueFormatter: (params) => {
          return params.value ? "US " + params.value + "$": "--";
        },
        type: "number",
        minWidth: 100,
        flex: 0.6,
      },
      {
        field: "delete",
        headerName: "Delete",
        flex: 0.8,
        minWidth: 100,
        type: "number",
        sortable: false,
        renderCell: (params) => {
          return (
            <Button
              sx={{ width: "100%", height: "100%" }}
              onClick={() => deleteIconClickHadler(params.row.id)}
            >
              <AiOutlineDelete size={20} color="#1976d2" />
            </Button>
          );
        },
      },
    ],
    []
  );

  const rows = [];
  coupons?.forEach((coupon) =>
    rows.push({
      id: coupon._id,
      name: coupon.name,
      disPercentage: coupon.disPercentage,
      minAmount: coupon.minAmount,
      maxAmount: coupon.maxAmount,
      dateTimeRange: `${dayjs(coupon.startDate).format(
        "ddd MMM YY hh:mm A"
      )} -- ${dayjs(coupon.endDate).format("ddd MMM YY hh:mm A")}`,
    })
  );

  return (
    <>
      <div className="flex justify-between items-center pb-3">
        <h1 className="text-[18px] font-[600] mb-2 text-gray-500">
          All Coupons
        </h1>
        <CreateCouponCode />
      </div>
      {!couponsError && (
        <div className="w-full bg-[#f1f1f1ce] h-[72vh]">
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { pageSize: rowsPerPage },
              },
            }}
            onPageSizeChange={(newPageSize) => setRowsPerPage(newPageSize)}
            pageSizeOptions={[5, 10, 20, 40, 60, 100]}
            disableRowSelectionOnClick
            loading={isCouponsLoading}
            slots={{
              toolbar: CustomToolbar,
            }}
          />
        </div>
      )}

      {!isCouponsLoading && couponsError && <h1>{couponsError}</h1>}
      <ActionPopup
        open={open}
        setOpen={setOpen}
        message="Are you sure you want to delete this product ?"
        executeAction={onDeletionConfirmHandler}
        productToBeDeleted={couponToBeDeleted}
        isDeleting={isDeleting}
        setIsDeleting={setIsDeleting}
      />
    </>
  );
};

export default ShopDiscountCodes;
