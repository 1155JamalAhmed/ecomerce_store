import React from "react";
import { backend_url } from "../../server";
import { useSelector } from "react-redux";
import store from "../../redux/store";
import { socketForUser } from "../../utils/socketIO";

const UserChatSidebar = () => {
  const { userChats, selectedUserChat } = useSelector(
    (state) => state.userChats
  );

  const changeActiveChatHandler = (chat) => {
    store.dispatch({
      type: "ChangeSelectedUserChat",
      payload: chat,
    });
    socketForUser.emit("join chat", chat._id);
  };

  return (
    <div className="h-[75vh] overflow-y-auto border-r-gray-200 border-r-2">
      {userChats.map((item) => (
        <div
          className={`flex items-start space-x-2  border-b last:border-none border-b-gray-400 py-3 cursor-pointer  p-2 ${
            selectedUserChat?._id === item?._id
              ? "bg-gray-100"
              : "hover:bg-gray-50"
          } `}
          key={item._id}
          onClick={() => changeActiveChatHandler(item)}
        >
          <div className="w-[50px] min-w-[50px] h-[50px] relative">
            <img
              src={`${backend_url}/${item.shop?.avatarImage}`}
              alt="to whom you are chatting"
              className="w-full h-full object-cover rounded-full"
            />
            <span className="block w-[10px] h-[10px] bg-green-600 absolute top-[4px] right-0 z-50 rounded-full"></span>
          </div>
          <div className="max-w-[calc(100%-80px)]">
            <h1 className="truncate w-[80%] text-[16px] font-[600] text-black">
              {item.shop?.name}
            </h1>
            <h2 className="truncate text-[14px] font-[400] text-gray-500">
              {item?.latestMessage?.content || "No message yet"}
            </h2>
          </div>
          <div className="w-full flex justify-end">
            <span className="flex items-center justify-center w-[18px] h-[18px] bg-gray-800 rounded-full text-white text-[14px] ">
              1
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserChatSidebar;
