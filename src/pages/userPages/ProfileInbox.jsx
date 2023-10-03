import React, { useEffect } from "react";
import UserChatMainScreen from "../../components/chat/UserChatMainScreen.jsx";
import UserChatSidebar from "../../components/chat/UserChatSidebar.jsx";
import store from "../../redux/store";
import { useSelector } from "react-redux";
import styles from "../../styles/styles";
import { loadUserChats } from "../../redux/actions/userChatActions";
import Loader from "../../components/layout/Loader.jsx";

const ProfileInbox = () => {
  const { isUserChatsLoading, userChatsHasError, userChats } = useSelector(
    (state) => state.userChats
  );

  useEffect(() => {
    store.dispatch(loadUserChats());
  }, []);

  return (
    <>
      {!isUserChatsLoading && userChats && (
        <div className="grid grid-cols-[240px,1fr] bg-white p-1 rounded-md ml-3 border-gray-100">
          <UserChatSidebar />
          <UserChatMainScreen />
        </div>
      )}

      {!isUserChatsLoading && userChatsHasError && (
        <div className="h-[60vh] flex justify-center items-center">
          <h1 className={`${styles.error}`}>{userChatsHasError}</h1>
        </div>
      )}
      {isUserChatsLoading && <Loader className="!h-full" />}
    </>
  );
};

export default ProfileInbox;
