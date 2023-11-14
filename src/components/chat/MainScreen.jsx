import { useSelector } from "react-redux";
import { backend_url } from "../../server";
import RecieverMessage from "./RecieverMessage";
import SenderMessage from "./SenderMessage";
import WholeMessageField from "./WholeMessageField";
import { useEffect, useState } from "react";
import store from "../../redux/store";
import { getShopMessagesForChat } from "../../redux/actions/shopChatActions";
import styles from "../../styles/styles";
import { AiOutlineWechat } from "react-icons/ai";
import Loader from "../layout/Loader";
import { socketForShop } from "../../utils/socketIO";

const ChatMainScreen = () => {
  const { selectedShopChat, shopChatMessages } = useSelector(
    (state) => state.shopChats
  );
  const [messagesIsLoading, setMessagesIsLoading] = useState(false);
  const [messagesHasError, setMessagesHasError] = useState(null);

  useEffect(() => {
    if (!selectedShopChat?._id || shopChatMessages[selectedShopChat._id]) {
      return;
    }

    setMessagesIsLoading(true);

    store
      .dispatch(getShopMessagesForChat(selectedShopChat._id))
      .catch((err) => setMessagesHasError(err.response.data.messsage))
      .finally(() => {
        setMessagesIsLoading(false);
      });
  }, [selectedShopChat, shopChatMessages]);

  useEffect(() => {
    socketForShop.on("new message", (message) => {
      console.log("hey! shop receive this", message);
    });
  }, []);

  return (
    <div className="flex flex-col h-full justify-between">
      {selectedShopChat && (
        <>
          <div className="flex items-center space-x-2 py-2 border-b-gray-400 bg-gray-100 w-full">
            <div className="w-[50px] h-[50px] rounded-full relative">
              <img
                src={`${backend_url}/${selectedShopChat?.user?.avatarImage}`}
                alt={`${selectedShopChat?.user?.name}`}
                className="w-full h-full object-cover rounded-full"
              />
              <span className="block w-[10px] h-[10px] bg-green-600 absolute top-[4px] right-0 z-50 rounded-full"></span>
            </div>
            <div className="">
              <h1 className="truncate text-[16px] font-[600] text-black">
                {selectedShopChat?.user?.name}
              </h1>
              <h2 className="truncate text-[14px] font-[400] text-gray-500">
                Active now
              </h2>
            </div>
          </div>
          {messagesIsLoading && !messagesHasError && (
            <Loader className="!h-full" />
          )}
          {!messagesIsLoading && messagesHasError && (
            <h1 className={`${styles.error}`}>{messagesHasError}</h1>
          )}
          {shopChatMessages[selectedShopChat._id] && (
            <>
              <div className="h-full max-h-[56vh] overflow-y-auto flex flex-col-reverse w-full">
                {shopChatMessages[selectedShopChat._id].map((message) => (
                  <div className="mb-1 mt-1" key={message?._id}>
                    {message?.senderType === "Shop" && (
                      <SenderMessage message={message} />
                    )}
                    {message?.senderType === "User" && (
                      <RecieverMessage message={message} />
                    )}
                  </div>
                ))}
              </div>
              <WholeMessageField />
            </>
          )}
        </>
      )}
      {!selectedShopChat && (
        <div className="flex flex-col items-center justify-center h-full -mt-10">
          <AiOutlineWechat className="text-blue-300 w-[70%] h-[70%]" />
          <div className="-mt-10">Please select a chat to continue</div>
        </div>
      )}
    </div>
  );
};

export default ChatMainScreen;
