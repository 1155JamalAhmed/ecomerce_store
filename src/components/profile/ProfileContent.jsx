import React from "react";
import AllOrders from "./AllOrders";
import AllRefundOrders from "./AllRefundOrders";
import TrackOrders from "./TrackOrders";
import ProfileUpdation from "./ProfileUpdation";
import Security from "./Security";
import AllAddresses from "./AllAddresses";

const ProfileContent = ({ active }) => {
  return (
    <div className="w-full">
      {/* Profile tab */}
      {active === 1 && <ProfileUpdation />}

      {/* Order tab */}
      {active === 2 && (
        <div>
          <AllOrders />
        </div>
      )}

      {/* Refund tab */}
      {active === 3 && (
        <div>
          <AllRefundOrders />
        </div>
      )}

      {/* Track orders tab */}
      {active === 5 && (
        <div>
          <TrackOrders />
        </div>
      )}

      {/* Track order tab */}
      {active === 6 && (
        <div>
          <Security />
        </div>
      )}
      {/* Track order tab */}
      {active === 7 && (
        <div>
          <AllAddresses />
        </div>
      )}
    </div>
  );
};

export default ProfileContent;
