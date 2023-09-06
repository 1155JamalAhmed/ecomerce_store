import { Button } from "@mui/material";
import React, { useState } from "react";
import CreateEventPopup from "../../../popups/CreateCouponPopup";

const CreateCouponCode = () => {
  const [showPopup, setShowPopup] = useState(false);
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={() => setShowPopup(true)}
      >
        Create Coupon
      </Button>
      <CreateEventPopup setOpen={setShowPopup} open={showPopup} />
    </div>
  );
};

export default CreateCouponCode;
