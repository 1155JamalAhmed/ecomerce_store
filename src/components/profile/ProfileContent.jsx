import React from "react";
import AllOrders from "./AllOrders";
import ProfileUpdation from "./ProfileUpdation";
import Security from "./Security";
import AllAddresses from "./AllAddresses";
import ProfileInbox from "../../pages/userPages/ProfileInbox";

const ProfileContent = ({ active }) => {
  return (
    <div className="w-full">
      {/* Profile tab */}
      {active === 1 && <ProfileUpdation />}

      {/* Order tab */}
      {active === 2 && <AllOrders />}
      {active === 3 && <ProfileInbox />}

      {/* Track order tab */}
      {active === 4 && (
        <div>
          <Security />
        </div>
      )}
      {/* Track order tab */}
      {active === 5 && (
        <div>
          <AllAddresses />
        </div>
      )}
    </div>
  );
};

export default ProfileContent;
