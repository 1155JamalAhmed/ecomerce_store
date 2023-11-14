import dayjs from "dayjs";

const RecieverMessage = ({ message }) => {
  return (
    <div className="bg-gray-700 text-[14px] p-3 text-[white] max-w-[max-content] w-[70%] rounded-r-md shadow-md flex flex-col">
      <h1 className="leading-[18px] overflow-hidden break-words">
        {message.content}
      </h1>
      <h2 className="self-end leading-[18px] mt-1">
        {dayjs(message.createdAt || new Date()).format("hh:mm a, D MMM")}
      </h2>
    </div>
  );
};

export default RecieverMessage;
