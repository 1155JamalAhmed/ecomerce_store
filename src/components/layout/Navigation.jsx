import React, { useContext } from "react";
import styles from "../../styles/styles";
import { navItems } from "../../static/data";
import { Link } from "react-router-dom";
import NavigationContext from "../../context/navigation-context";

const Navigation = () => {
  // Consuming the context
  const { activeNavOption, changeActiveNavOption } =
    useContext(NavigationContext);
  return (
    <div className={`block 800px:${styles.normalFlex} `}>
      {navItems &&
        navItems.map((item, index) => (
          <div
            className="flex items-center px-4 first:mt-0 my-[16px]  800px:my-0"
            key={index}
            onClick={() => changeActiveNavOption(index + 1)}
          >
            <Link
              to={item.url}
              className={`${
                activeNavOption === index + 1
                  ? "text-[#17dd1f]"
                  : "text-black 800px:text-[#fff]"
              } font-[500] cursor-pointer block`}
            >
              {item.title}
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Navigation;
