import dayjs from "dayjs";

const SenderMessage = ({ message }) => {
  return (
    <div className="bg-green-700 text-[14px] p-3 text-[white] w-[70%] rounded-l-md shadow-md ml-auto flex flex-col">
      <h1 className="leading-[18px]">{message.content}</h1>
      <h2 className="self-end leading-[18px]">{dayjs().format("MM / YY")}</h2>
    </div>
  );
};

export default SenderMessage;
