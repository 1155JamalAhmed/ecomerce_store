import styles from "../../styles/styles";
import { AiOutlineDelete } from "react-icons/ai";

const AllAddresses = () => {
  return (
    <div className="w-full px-5">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
          My Addresses
        </h1>
        <div className={`${styles.button} !rounded-md`}>
          <span className="text-[#fff]">Add New</span>
        </div>
      </div>

      <div className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10">
        <h5 className="pl-5 font-[600]">Default</h5>
        <div className="pl-8 flex items-center">
          <h6 className="max-w-[300px] overflow-hidden">Future Colony, Landhi Karachi no#22, near norani masjid</h6>
        </div>
        <div className="pl-8 flex items-center">
          <h6>+92 3499591483</h6>
        </div>
        <div className="min-w-[10%] flex items-center justify-between pl-8">
          <AiOutlineDelete size={25} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default AllAddresses;
