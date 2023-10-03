import React, { useEffect, useState } from "react";
import PopupWrapper from "./PopupWrapper";
import styles from "../../styles/styles";
import { backend_url } from "../../server";
import RatingWithFeedback from "../forms/RatingWithFeedback";
import TextArea from "../forms/TextArea";
import { Button, CircularProgress } from "@mui/material";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";

const WriteProductReview = ({
  open,
  setOpen,
  order,
  reviewsOfOrder,
  setReviewsOfOrder,
}) => {
  return (
    <PopupWrapper open={open} setOpen={setOpen}>
      <h1 className={`${styles.heading}`}>Write Reviews</h1>
      <div className="space-y-4">
        {order.cart.map((item) => (
          <>
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
            <RatingAndReview
              item={item}
              orderId={order._id}
              reviewsOfOrder={reviewsOfOrder}
              setReviewsOfOrder={setReviewsOfOrder}
            />
          </>
        ))}
      </div>
    </PopupWrapper>
  );
};

const RatingAndReview = ({
  item,
  orderId,
  reviewsOfOrder,
  setReviewsOfOrder,
}) => {
  const [isReviewExists, setIsReviewExists] = useState(
    reviewsOfOrder.find((review) => review.product === item.product._id)
  );
  useEffect(() => {
    setIsReviewExists(
      reviewsOfOrder.find((review) => review.product === item.product._id)
    );
  }, [reviewsOfOrder, item]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rating, setRating] = useState(
    isReviewExists ? isReviewExists?.rating : 3
  );
  const [review, setReview] = useState("");
  const reviewSubmitHandler = async (e, productId) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await axiosInstance.post(
        "/reviews/write-review-on-product",
        {
          orderId: orderId,
          productId: productId,
          rating: rating,
          review: review,
        },
        { withCredentials: true }
      );
      setReviewsOfOrder((prevState) => {
        let flag = 0;
        const newState = prevState.map((review) => {
          if (review._id === res.data.body._id) {
            flag = 1;
            return res.data.body;
          } else {
            return review;
          }
        });
        if (flag === 0) {
          newState.push(res.data.body);
        }
        return newState;
      });
      toast.success("Review has been added");
    } catch (err) {
      toast.error(err.response.data.message);
    }
    setIsSubmitting(false);
  };

  return (
    <form
      className="space-y-3"
      onSubmit={(e) => reviewSubmitHandler(e, item.product._id)}
    >
      <div>
        <h3 className="block text-sm font-medium text-gray-700 mb-1">
          {isReviewExists ? "Rating Given" : "Give a Rating *"}
        </h3>
        <RatingWithFeedback
          value={rating}
          setValue={setRating}
          disabled={isReviewExists ? true : false}
        />
      </div>
      {isReviewExists && (
        <div>
          <p className="block text-sm font-medium text-gray-700 mb-1">
            Review:
          </p>
          <p>{isReviewExists.review}</p>
        </div>
      )}
      {!isReviewExists && (
        <>
          <TextArea
            label="Write a review"
            name={`review_${item.product._id}`}
            value={review}
            onChange={setReview}
            placeholder="How is the product ?"
          />
          <Button
            variant="contained"
            type="submit"
            fullWidth
            color="warning"
            endIcon={
              isSubmitting && <CircularProgress color="inherit" size={20} />
            }
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting Review" : "Submit Review"}
          </Button>
        </>
      )}
      {isReviewExists && (
        <Button
          variant="outlined"
          fullWidth
          color="warning"
          onClick={() => setIsReviewExists(null)}
        >
          Edit Review
        </Button>
      )}
    </form>
  );
};

export default WriteProductReview;
