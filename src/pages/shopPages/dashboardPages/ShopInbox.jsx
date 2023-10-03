import React, { useEffect } from "react";
import ChatMainScreen from "../../../components/chat/MainScreen";
import ChatSidebar from "../../../components/chat/ChatSidebar";
import store from "../../../redux/store";
import { loadShopChats } from "../../../redux/actions/shopChatActions";
import { useSelector } from "react-redux";
import styles from "../../../styles/styles";
// import { ntfSocket, socket } from "../../../utils/socketIO";

const ShopInbox = () => {
  const { isShopChatsLoading, shopChatsHasError } = useSelector(
    (state) => state.shopChats
  );

  useEffect(() => {
    store.dispatch(loadShopChats());
  }, []);

  // useEffect(() => {
  //   const broadCastingHandler = (data, cb) => {
  //     console.log("totalUserconnected" + data);
  //   };
  //   socket.on("broadcastTotalUser", broadCastingHandler);

  //   return () => socket.off("broadcastTotalUser", broadCastingHandler);
  // }, []);

  // useEffect(() => {
  //   const messageHandler = (data, cb) => {
  //     console.log("data", data);
  //     cb({
  //       ack: true,
  //     });
  //   };
  //   socket.on("message", messageHandler);
  //   ntfSocket.on("orderDelivered", (data) => console.log("data", data));

  //   return () => {
  //     socket.off("message");
  //   };
  // }, []);

  return (
    <div className="grid grid-cols-[240px,1fr]">
      {!isShopChatsLoading && (
        <>
          <ChatSidebar />
          <ChatMainScreen />
        </>
      )}
      {shopChatsHasError && (
        <h1 className={`${styles.error}`}>{shopChatsHasError}</h1>
      )}
    </div>
  );
};

export default ShopInbox;
