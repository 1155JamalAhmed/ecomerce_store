import { Button, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BsFillBucketFill } from "react-icons/bs";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styles from "../../styles/styles";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { backend_url } from "../../server";
import Select from "../../components/forms/Select";
import store from "../../redux/store";
import { updateOrderStatusByShop } from "../../redux/actions/shopActions";
import WriteProductReview from "../../components/popups/WriteProductReview";
import axiosInstance from "../../utils/axiosInstance";

const OrderDetailPage = () => {
  const { orderId } = useParams();
  const { from } = useLocation().state;
  const navigate = useNavigate();
  const [orderStatus, setOrderStatus] = useState("");
  const [isUpdatingOrderStatus, setIsUpdatingOrderStatus] = useState(false);
  const [openPopupToReview, setOpenPopupToReview] = useState(false);
  const [reviewsOfOrder, setReviewsOfOrder] = useState([]);
  const allOrders = useSelector((state) => {
    if (from === "user") {
      return state.user.user.orders;
    }
    if (from === "shop") {
      return state.shop.shop.orders;
    }
    return [];
  });

  const order = allOrders.find((order) => order._id === orderId);

  const updateOrderStatusHandler = async (e) => {
    e.preventDefault();
    setIsUpdatingOrderStatus(true);

    await store.dispatch(
      updateOrderStatusByShop({ orderId, newStatus: orderStatus })
    );

    setOrderStatus("");
    setIsUpdatingOrderStatus(false);
  };

  useEffect(() => {
    if (from === "user" && order.status === "Delivered") {
      axiosInstance
        .get(`/reviews/get-reviews-by-order/${order._id}`, {
          withCredentials: true,
        })
        .then((res) => setReviewsOfOrder(res.data.body));
    }
  }, [order._id, order.status, from]);

  return (
    <>
      <Header />
      <div className={`${styles.section} py-6`}>
        {/* Main Heading */}
        <div className="flex items-center">
          <BsFillBucketFill size={34} color="red" />
          <h1 className="text-[28px] font-semibold ml-2 font-Roboto">
            Order Details
          </h1>
          {from === "shop" && (
            <div className="ml-auto">
              <Button
                variant="contained"
                color="warning"
                onClick={() => {
                  navigate("/shops/dashboard/orders");
                }}
              >
                All Orders
              </Button>
            </div>
          )}
        </div>
        {/* OrderId and Placed on */}
        <div className="flex items-center justify-between text-gray-700 my-6">
          <h4 className="text-[16px]">Order ID: #{order._id.slice(0, 12)}</h4>
          <h4 className="text-[16px]">
            Placed on: {dayjs(order.placedOn).format("YYYY-MM-DD")}
          </h4>
        </div>

        <div className="mb-4 flex justify-between">
          <div className="space-y-4">
            {order.cart.map((item) => (
              <div className="flex item-center" key={item._id}>
                <div className="w-[60px] h-[60px] overflow-hidden mr-3">
                  <img
                    src={`${backend_url}/${item.product.images[0]}`}
                    alt="product"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center font-[600]">
                  <h2 className="">{item.product.name}</h2>
                  <h2 className="text-gray-400">
                    US${item.product.discountPrice} x {item.quantity}
                  </h2>
                </div>
              </div>
            ))}
          </div>
          {from === "user" && order.status === "Delivered" && (
            <>
              <Button
                variant="outlined"
                size="large"
                color="warning"
                className="self-start"
                onClick={() => setOpenPopupToReview(true)}
              >
                Write Review
              </Button>
              <WriteProductReview
                open={openPopupToReview}
                setOpen={setOpenPopupToReview}
                order={order}
                setReviewsOfOrder={setReviewsOfOrder}
                reviewsOfOrder={reviewsOfOrder}
              />
            </>
          )}
        </div>
        <div className="border-t border-t-gray-300 flex justify-end pt-2">
          <h3 className="font-[500]">Total Price: USD${order.totalAmount}</h3>
        </div>
        <div className="grid grid-cols-1 800px:grid-cols-2 mt-8 space-y-8">
          <div>
            <h3 className="text-[18px] font-[600] mb-4 ">Shipping address</h3>
            <div>
              {Object.keys(order.shippingAddress)
                .map((key) => ({
                  key: key,
                  value: order.shippingAddress[key],
                }))
                .map((field) => (
                  <div key={field.key}>
                    <span className="font-[500]">{field.key}:</span>{" "}
                    <span className="text-gray-600">{field.value}</span>
                  </div>
                ))}
            </div>
          </div>
          <div>
            <h3 className="text-[18px] font-[600] mb-4 ">
              Payment Information
            </h3>
            <div>
              <span className="font-[500]">Status:</span>{" "}
              <span className="text-gray-600">{order.paymentInfo.status}</span>
            </div>
            <div>
              <span className="font-[500]">Payment Type:</span>
              <span className="text-gray-600">
                {order.paymentInfo.paymentType}
              </span>
            </div>
          </div>
        </div>
        {from === "shop" && order.status !== "Delivered" && (
          <form
            className="mt-6 w-[30%] min-w-[250px] space-y-4"
            onSubmit={updateOrderStatusHandler}
          >
            <Select
              label="Order Status"
              name="orderStatus"
              onChange={setOrderStatus}
              value={orderStatus}
              options={[
                { title: "Processing" },
                { title: "Handed to delivery partner" },
                { title: "Recieved at Wearhouse" },
                { title: "Delivering to customer" },
                { title: "Delivered" },
              ].slice(
                [
                  { title: "Processing" },
                  { title: "Handed to delivery partner" },
                  { title: "Recieved at Wearhouse" },
                  { title: "Delivering to customer" },
                  { title: "Delivered" },
                ].findIndex((item) => item.title === order.status) + 1
              )}
            />
            <Button
              variant="contained"
              color="warning"
              size="large"
              type="Submit"
              endIcon={
                isUpdatingOrderStatus && (
                  <CircularProgress color="inherit" size={20} />
                )
              }
              disabled={isUpdatingOrderStatus}
            >
              {isUpdatingOrderStatus ? "Updating Status" : "Update Status"}
            </Button>
          </form>
        )}
      </div>
      <Footer />
    </>
  );
};

export default OrderDetailPage;
