import React, { useState } from "react";
import Header from "../components/layout/Header";
import styles from "../styles/styles";
import ProfileSidebar from "../components/profile/ProfileSidebar";
import ProfileContent from "../components/profile/ProfileContent";

const ProfilePage = () => {
  const [active, setActive] = useState(1);
  return (
    <div>
      <Header />
      <div className={`${styles.section} flex bg-[#f5f5f5]  py-10 mt-12`}>
        <div className="800px:w-[335px] min-w-[56px] h-[80vh] overflow-y-scroll [&::-webkit-scrollbar]:hidden sticky top-[5.4rem]">
          <ProfileSidebar active={active} setActive={setActive} />
        </div>
        <ProfileContent active={active} />
      </div>
    </div>
  );
};

export default ProfilePage;
