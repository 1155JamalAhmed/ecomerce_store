import dayjs from "dayjs";

const SenderMessage = ({ message }) => {
  return (
    <div className="bg-green-700 text-[14px] p-3 text-[white]  max-w-[max-content] w-[70%] rounded-l-md shadow-md ml-auto flex flex-col">
      <h1 className="leading-[18px] overflow-hidden break-words">
        {message.content}
      </h1>
      <h2 className="self-end leading-[18px]">
        {dayjs(message.createdAt || new Date()).format("hh:mm a, D MMM")}
      </h2>
    </div>
  );
};

export default SenderMessage;
