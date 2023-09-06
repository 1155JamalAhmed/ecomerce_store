import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import DiscountPopup from "../popups/DiscountPopup";
import { Button, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Input } from "../forms/Input";

const CartData = () => {
  const { grandTotal: subtotal } = useSelector((state) => state.cart);
  const [couponCode, setCouponCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const shippingCost = subtotal * 0.01;
  const [grandTotal, setGrandTotal] = useState(subtotal + shippingCost);
  const [discountDetail, setDiscountDetail] = useState(null);
  const [showDiscountDetails, setShowDiscountDetails] = useState(false);

  // if user referesh on this same page
  useEffect(() => {
    setGrandTotal(subtotal + shippingCost);
  }, [subtotal, shippingCost, setGrandTotal]);

  const onCouponCodeApplyHandler = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    axiosInstance
      .get(`/coupons/get-discount-by-coupon-code/${couponCode}`, {
        withCredentials: true,
      })
      .then((res) => {
        setDiscountDetail(res.data.body);
        setGrandTotal(subtotal + shippingCost - res.data.body.totalDiscount);
        setCouponCode("");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="w-full bg-[#fff] rounded-md p-5">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4] ">subtotal:</h3>
        <h5 className="text-[18px] font-[600]">${subtotal}.00</h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4] ">shipping:</h3>
        <h5 className="text-[18px] font-[600]">${shippingCost.toFixed(2)}</h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4] ">discount:</h3>
        <h5 className="text-[18px] font-[600]">
          - {discountDetail && `${discountDetail.totalDiscount.toFixed(2)}`}
        </h5>
      </div>
      <div className="flex justify-between pt-3 border-t-2 border-gray-200 mt-4">
        <h3 className="text-[16px] text-[#000000a4] font-bold ">
          Grand Total:
        </h3>
        <h5 className="text-[18px] font-[600]">${grandTotal.toFixed(2)}</h5>
      </div>
      <br />
      <form className="space-y-4" onSubmit={onCouponCodeApplyHandler}>
        <Input
          label=""
          name=""
          type="text"
          isRequired={true}
          value={couponCode}
          onChange={setCouponCode}
          placeholder="Enter Coupon Code..."
        />

        <Button
          variant="outlined"
          type="submit"
          fullWidth
          color="secondary"
          endIcon={
            isSubmitting && <CircularProgress color="inherit" size={20} />
          }
          disabled={isSubmitting}
        >
          {isSubmitting ? "Applying Code" : "Apply Code"}
        </Button>
      </form>
      {discountDetail && (
        <div className="flex justify-end mt-2">
          <Button
            variant="text"
            color="secondary"
            onClick={() => setShowDiscountDetails(true)}
          >
            Show Discount Details
          </Button>
          <DiscountPopup
            open={showDiscountDetails}
            setOpen={setShowDiscountDetails}
            discountData={discountDetail}
          />
        </div>
      )}
    </div>
  );
};

export default CartData;
