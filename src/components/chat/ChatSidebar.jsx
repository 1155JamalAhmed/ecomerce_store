import { selectedShopChatHandler } from "../../redux/actions/shopChatActions";
import store from "../../redux/store";
import { backend_url } from "../../server";
import { useSelector } from "react-redux";

const ChatSidebar = () => {
  const { shopChats, selectedShopChat } = useSelector(
    (state) => state.shopChats
  );

  const selectChangeClickHandler = (item) => {
    store.dispatch(selectedShopChatHandler(item));
  };

  return (
    <div className="h-[75vh] overflow-y-auto border-r-gray-200 border-r-2">
      {shopChats.map((item) => (
        <div
          className={`flex items-center space-x-2  border-b last:border-none border-b-gray-400 p-2 rounded-l-sm cursor-pointer hover:bg-gray-50 ${
            selectedShopChat?._id === item?._id && "bg-gray-100"
          }`}
          onClick={() => selectChangeClickHandler(item)}
          key={item._id}
        >
          <div className="w-[50px] min-w-[50px] h-[50px]  relative">
            <img
              src={`${backend_url}/${item.user.avatarImage}`}
              alt="to whom you are chatting"
              className="w-full h-full object-cover rounded-full"
            />
            <span className="block w-[10px] h-[10px] bg-green-600 absolute top-[4px] right-0 z-50 rounded-full"></span>
          </div>
          <div className="max-w-[calc(100%-80px)] relative">
            <h1 className="truncate w-[80%] text-[16px] font-[600] text-black">
              {item.user.name}
            </h1>
            <h2 className="truncate text-[14px] font-[400] text-gray-500">
              I would love to go on this is the best i have done so far
            </h2>
            <span className="flex items-center justify-center w-[18px] h-[18px] bg-gray-800 absolute top-[4px] right-0 z-50 rounded-full text-white text-[14px]">
              1
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatSidebar;
