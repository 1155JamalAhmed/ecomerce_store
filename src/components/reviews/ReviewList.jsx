import { backend_url } from "../../server";
import styles from "../../styles/styles";
import RatingWithFeedback from "../forms/RatingWithFeedback";

const ReviewList = ({ reviews }) => {
  return (
    <div className="space-y-4">
      {reviews?.length === 0 && (
        <h1 className={`${styles.empty}`}>No reviews yet!</h1>
      )}
      {reviews?.length > 0 &&
        reviews.map((review) => (
          <div className="flex space-x-4 bg-white p-3 rounded-md">
            <div className="w-[60px] h-[60px] overflow-hidden rounded-full ">
              <img
                src={`${backend_url}/${review?.user?.avatarImage}`}
                alt="reviewer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h1 className="font-[600] text-[18px]">{review?.user?.name}</h1>
              <RatingWithFeedback value={review?.rating} disabled={true} />
              <p>{review?.review}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ReviewList;
