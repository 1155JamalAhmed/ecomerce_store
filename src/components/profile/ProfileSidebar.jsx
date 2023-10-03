import React from "react";
import { AiOutlineLogin, AiOutlineMessage } from "react-icons/ai";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { MdSecurity } from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";
import { RxPerson } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
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
    icon: AiOutlineMessage,
    text: "Inbox",
  },
  {
    icon: MdSecurity,
    text: "Security",
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
    await store.dispatch(logoutUser());
    navigate("/users/login", { replace: true });
  };

  return (
    <div className="w-full bg-white shadow-sm rounded-[10px] p-4 pt-8">
      {tabs.map((tab, index) => (
        <div
          key={index}
          className="flex items-center cursor-pointer w-full mb-8"
          onClick={() => {
            setActive(index + 1);
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
