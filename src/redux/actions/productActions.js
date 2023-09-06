import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosInstance";

export const loadProductsByShop = (shopId) => async (dispatch) => {
  try {
    const res = await axiosInstance.get(
      `/products/get-all-products-shop/${shopId}`
    );
    dispatch({
      type: "ProdsLoadedSucc",
      payload: res.data.body,
    });
  } catch (err) {
    dispatch({
      type: "ProdsLoadedFailed",
      payload: err.response.data.message,
    });
  }
};

export const createProduct = (productData) => async (dispatch) => {
  try {
    const res = await axiosInstance.post(
      "/products/create-product",
      productData,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch({
      type: "CreateProduct",
      payload: res.data.body,
    });
    toast.success("Product Created Successfully 😎");
  } catch (err) {
    toast.error(err.response.data.message);
  }
};

export const deleteProduct = (productId) => async (dispatch) => {
  try {
    const res = await axiosInstance.post(
      "/products/delete-product",
      { productId },
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: "DeleteProduct",
      payload: res.data.body,
    });
    toast.success("Product Deleted Successfully 😎");
  } catch (err) {
    toast.error(err.response.data.message);
  }
};
