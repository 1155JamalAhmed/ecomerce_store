import React from "react";
import styles from "../../styles/styles";
import { navItems } from "../../static/data";
import { Link } from "react-router-dom";
import useActiveTab from "../../hooks/useActiveTab";

const activeTabMapping = {
  "/": 1,
  "/best-selling": 2,
  "/products": 3,
  "/events": 4,
  "/faq": 5,
};

const Navigation = () => {
  const activeTab = useActiveTab(activeTabMapping);

  return (
    <div className={`block 800px:${styles.normalFlex} `}>
      {navItems &&
        navItems.map((item, index) => (
          <div
            className="flex items-center px-4 first:mt-0 my-[16px]  800px:my-0"
            key={index}
          >
            <Link
              to={item.url}
              className={`${
                activeTab === index + 1
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
