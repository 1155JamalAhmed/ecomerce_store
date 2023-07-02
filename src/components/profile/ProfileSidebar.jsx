import React from "react";
import {
  AiOutlineCreditCard,
  AiOutlineLogin,
  AiOutlineMessage,
} from "react-icons/ai";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import { MdOutlineTrackChanges } from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";
import { RxPerson } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import store from "../../redux/store";
import { logoutUser } from "../../redux/actions/userActions";

const tabs = [
  {
    icon: RxPerson,
    text: "Profile",
  },
  {
    icon: HiOutlineShoppingBag,
    text: "Order",
  },
  {
    icon: HiOutlineReceiptRefund,
    text: "Refund",
  },
  {
    icon: AiOutlineMessage,
    text: "Inbox",
  },
  {
    icon: MdOutlineTrackChanges,
    text: "Track Order",
  },
  {
    icon: AiOutlineCreditCard,
    text: "Payment Methods",
  },
  {
    icon: TbAddressBook,
    text: "Address",
  },
  {
    icon: AiOutlineLogin,
    text: "Logout",
  },
];

const ProfileSidebar = ({ active, setActive }) => {
  const navigate = useNavigate();

  const logoutUserHandler = async () => {
    store.dispatch(
      logoutUser((res) => {
        navigate("/login");
        toast.success(res.data.message);
      })
    );
  };

  return (
    <div className="w-full bg-white shadow-sm rounded-[10px] p-4 pt-8">
      {tabs.map((tab, index) => (
        <div
          key={index}
          className="flex items-center cursor-pointer w-full mb-8"
          onClick={() => {
            setActive(index + 1);
            tab.text === "Inbox" && navigate("/");
            tab.text === "Logout" && logoutUserHandler();
          }}
        >
          <tab.icon size={20} color={active === index + 1 ? "red" : null} />

          <span
            className={`pl-3 ${
              active === index + 1 && "text-[red]"
            } font-[600] 800px:block hidden`}
          >
            {tab.text}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ProfileSidebar;
