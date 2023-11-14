import React, { useState } from "react";
import { BsFillMicFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import { MdSettingsVoice } from "react-icons/md";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { socketForUser } from "../../utils/socketIO";
import { useSelector } from "react-redux";
import store from "../../redux/store";

const actions = [{ icon: <AddPhotoAlternateIcon />, name: "Select Image" }];

const UserWholeMessageField = () => {
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const { selectedUserChat } = useSelector((state) => state.userChats);

  const handleInputChange = (e) => {
    const input = e.target;
    input.style.height = "auto"; // Reset the height
    input.style.height = input.scrollHeight + "px"; // Set the height to match the content
    setMessage(e.target.value);
  };

  const messageSendHandler = () => {
    socketForUser.emit(
      "new message",
      {
        content: message,
        chat: selectedUserChat._id,
        senderType: "User",
        sender: selectedUserChat.user,
      },
      (savedMessage) => {
        store.dispatch({
          type: "AddNewMessageToChatMessages",
          payload: savedMessage,
        });
      }
    );

    setMessage("");
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      e.target.style.height = "44px";
      // Submit the form when Enter key is pressed without Shift key
      messageSendHandler();
    }
  };
  return (
    <form className="mt-1 relative" onSubmit={messageSendHandler}>
      <textarea
        className="leading-5 px-12 py-3 appearance-none w-full border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 resize-none overflow-y-hidden h-[min-content] block"
        rows={1}
        value={message}
        onKeyDown={handleKeyDown}
        onChange={handleInputChange}
        placeholder="Enter message to send..."
      ></textarea>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{
          position: "absolute",
          bottom: 4,
          left: -2,
          "&>button": {
            width: 34,
            height: 34,
            boxShadow: "none",
          },
        }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
      {!message && !isRecording && (
        <div
          className="absolute bottom-[3px] right-[12px] w-[40px] h-[40px] cursor-pointer hover:bg-gray-50 rounded-full flex items-center justify-center"
          onClick={() => setIsRecording(true)}
        >
          <BsFillMicFill color="black" size={20} />
        </div>
      )}
      {!message && isRecording && (
        <div
          className="absolute bottom-[3px] right-[12px] w-[40px] h-[40px] cursor-pointer hover:bg-gray-50 rounded-full flex items-center justify-center"
          onClick={() => setIsRecording(false)}
        >
          <MdSettingsVoice color="red" size={20} />
        </div>
      )}
      {message && (
        <button
          type="submit"
          className="absolute bottom-[3px] right-[12px] w-[40px] h-[40px] cursor-pointer hover:bg-gray-50 rounded-full flex items-center justify-center"
        >
          <IoMdSend color="black" size={20} />
        </button>
      )}
    </form>
  );
};

export default UserWholeMessageField;
