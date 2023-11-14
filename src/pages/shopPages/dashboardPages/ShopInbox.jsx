import React, { useEffect } from "react";
import ChatMainScreen from "../../../components/chat/MainScreen";
import ChatSidebar from "../../../components/chat/ChatSidebar";
import store from "../../../redux/store";
import { loadShopChats } from "../../../redux/actions/shopChatActions";
import { useSelector } from "react-redux";
import styles from "../../../styles/styles";
import Loader from "../../../components/layout/Loader";

const ShopInbox = () => {
  const { isShopChatsLoading, shopChatsHasError, shopChats } = useSelector(
    (state) => state.shopChats
  );

  useEffect(() => {
    store.dispatch(loadShopChats());
  }, []);

  return (
    <>
      {!isShopChatsLoading && shopChats && (
        <div className="grid grid-cols-[240px,1fr]">
          <ChatSidebar />
          <ChatMainScreen />
        </div>
      )}

      {!isShopChatsLoading && shopChatsHasError && (
        <div className="h-[60vh] flex justify-center items-center">
          <h1 className={`${styles.error}`}>{shopChatsHasError}</h1>
        </div>
      )}
      {isShopChatsLoading && <Loader className="!h-full" />}
    </>
  );
};

export default ShopInbox;
