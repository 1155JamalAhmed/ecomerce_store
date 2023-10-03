import dayjs from "dayjs";

const RecieverMessage = ({ message }) => {
  return (
    <div className="bg-gray-700 text-[14px] p-3 text-[white] w-[70%] rounded-r-md shadow-md flex flex-col">
      <h1 className="leading-[18px]">{message.content}</h1>
      <h2 className="self-end leading-[18px]">{dayjs().format("MM / YY")}</h2>
    </div>
  );
};

export default RecieverMessage;
