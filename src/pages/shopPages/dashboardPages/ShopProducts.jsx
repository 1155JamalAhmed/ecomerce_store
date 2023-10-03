import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { deleteProduct } from "../../../redux/actions/productActions";
import Store from "../../../redux/store";
import ActionPopup from "../../../components/popups/ActionPopup";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const ShopProducts = () => {
  const { products, isProductsLoading, productsError } = useSelector(
    (state) => state.products
  );

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [productToBeDeleted, setProductToBeDeleted] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteIconClickHadler = async (productId) => {
    setOpen(true);
    setProductToBeDeleted(productId);
  };

  const onDeletionConfirmHandler = async (productId) => {
    setIsDeleting(true);
    await Store.dispatch(deleteProduct(productId));
    setProductToBeDeleted("");
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
        field: "price",
        headerName: "Price",
        valueFormatter: (params) => {
          return "US " + params.value + "$";
        },
        type: "number",
        minWidth: 100,
        flex: 0.6,
      },
      {
        field: "stock",
        headerName: "Stock",
        type: "number",
        minWidth: 140,
        flex: 0.5,
      },
      {
        field: "sold",
        headerName: "Sold out",
        type: "number",
        minWidth: 130,
        flex: 0.6,
      },
      {
        field: "preview",
        headerName: "Preview",
        flex: 0.8,
        minWidth: 100,
        type: "number",
        sortable: false,
        renderCell: (params) => {
          return (
            <Link
              to={`/products/${params.value}`}
              className="block w-full h-full"
            >
              <Button sx={{ width: "100%", height: "100%" }}>
                <AiOutlineEye size={20} color="#1976d2" />
              </Button>
            </Link>
          );
        },
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
  products?.forEach((product) =>
    rows.push({
      id: product._id,
      name: product.name,
      price: product.discountPrice,
      stock: product.stock,
      sold: product.sold_out,
      preview: product.slug,
    })
  );

  return (
    <>
      <h1 className="text-[18px] font-[600] mb-2 text-gray-500">
        All Products
      </h1>
      {!productsError && (
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
            loading={isProductsLoading}
            slots={{
              toolbar: CustomToolbar,
            }}
          />
        </div>
      )}

      {!isProductsLoading && productsError && <h1>{productsError}</h1>}
      <ActionPopup
        open={open}
        setOpen={setOpen}
        message="Are you sure you want to delete this product ?"
        executeAction={onDeletionConfirmHandler}
        productToBeDeleted={productToBeDeleted}
        isDeleting={isDeleting}
        setIsDeleting={isDeleting}
      />
    </>
  );
};

export default ShopProducts;
