import { useSelector } from "react-redux";
import { backend_url } from "../../server";
import RecieverMessage from "./RecieverMessage";
import SenderMessage from "./SenderMessage";
import WholeMessageField from "./WholeMessageField";
import { useEffect, useState } from "react";
import store from "../../redux/store";
import { getUserMessagesForChat } from "../../redux/actions/userChatActions";
import Loader from "../layout/Loader";
import styles from "../../styles/styles";
import { AiOutlineWechat } from "react-icons/ai";

const UserChatMainScreen = () => {
  const { selectedUserChat, userChatMessages } = useSelector(
    (state) => state.userChats
  );

  const [messagesIsLoading, setMessagesIsLoading] = useState(false);
  const [messagesHasError, setMessagesHasError] = useState(null);

  useEffect(() => {
    if (!selectedUserChat?._id || userChatMessages[selectedUserChat._id]) {
      return;
    }

    setMessagesIsLoading(true);

    store
      .dispatch(getUserMessagesForChat(selectedUserChat._id))
      .catch((err) => setMessagesHasError(err.response.data.messsage))
      .finally(() => {
        setMessagesIsLoading(false);
      });
  }, [selectedUserChat, userChatMessages]);

  return (
    <div className="flex flex-col h-full justify-between">
      {selectedUserChat && (
        <>
          <div className="flex items-center space-x-2 py-2 border-b-gray-400 bg-gray-100 w-full">
            <div className="w-[50px] h-[50px] rounded-full relative">
              <img
                src={`${backend_url}/${selectedUserChat?.shop?.avatarImage}`}
                alt={`${selectedUserChat?.shop?.name}`}
                className="w-full h-full object-cover rounded-full"
              />
              <span className="block w-[10px] h-[10px] bg-green-600 absolute top-[4px] right-0 z-50 rounded-full"></span>
            </div>
            <div className="">
              <h1 className="truncate text-[16px] font-[600] text-black">
                {selectedUserChat?.shop?.name}
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
          {userChatMessages[selectedUserChat._id] && (
            <>
              <div className="h-full max-h-[56vh] overflow-y-auto flex flex-col-reverse">
                {userChatMessages[selectedUserChat._id].map((message) => (
                  <div className="mb-1 mt-1" key={message._id}>
                    {message.senderType === "User" && (
                      <SenderMessage message={message} />
                    )}
                    {message.senderType === "Shop" && (
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
      {!selectedUserChat && (
        <div className="flex flex-col items-center justify-center h-full -mt-10">
          <AiOutlineWechat className="text-blue-300 w-[70%] h-[70%]" />
          <div className="-mt-10">Please select a chat to continue</div>
        </div>
      )}
    </div>
  );
};

export default UserChatMainScreen;
