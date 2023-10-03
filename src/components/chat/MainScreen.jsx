import { useSelector } from "react-redux";
import { backend_url } from "../../server";
import RecieverMessage from "./RecieverMessage";
import SenderMessage from "./SenderMessage";
import WholeMessageField from "./WholeMessageField";
import { useEffect } from "react";
// import { socket } from "../../utils/socketIO";

const ChatMainScreen = () => {
  const { shopChats, selectedShopChat } = useSelector(
    (state) => state.shopChats
  );

  // useEffect(() => {
  //   socket.on("messageResponse", (data) => {
  //     console.log("dataRes", data);
  //   });
  // }, []);

  return (
    <div className="flex flex-col-reverse h-full relative">
      <WholeMessageField />
      <div className="space-y-2 max-h-[55vh] overflow-y-scroll">
        <SenderMessage />
        <RecieverMessage />
        <SenderMessage />
        <SenderMessage />
        <RecieverMessage />
        <RecieverMessage />
        <RecieverMessage />
        <SenderMessage />
        <SenderMessage />
        <SenderMessage />
      </div>
      <div className="flex items-center space-x-2 absolute top-0 left-0 py-2 border-b-gray-400 bg-gray-100 w-full">
        <div className="w-[50px] h-[50px] rounded-full relative">
          <img
            src={`${backend_url}/userImages/photocopyMachine2-1695111168477-270366293.png`}
            alt="to whom you are talking"
            className="w-full h-full object-cover rounded-full"
          />
          <span className="block w-[10px] h-[10px] bg-green-600 absolute top-[4px] right-0 z-50 rounded-full"></span>
        </div>
        <div className="">
          <h1 className="truncate text-[16px] font-[600] text-black">
            Jamal Ahmed
          </h1>
          <h2 className="truncate text-[14px] font-[400] text-gray-500">
            Active now
          </h2>
        </div>
      </div>
    </div>
  );
};

export default ChatMainScreen;
