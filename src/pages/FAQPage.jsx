import React, { useState } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import styles from "../styles/styles";

import { ReactComponent as CrossIcon } from "../assets/svgIcons/Cross.svg";
import { ReactComponent as RightArrowIcon } from "../assets/svgIcons/RightArrow.svg";
import { faqs } from "../static/data";
import { AnimatePresence, motion } from "framer-motion";

const FAQPage = () => {
  return (
    <div>
      <Header activeHeading={5} />
      <Faqs />
      <Footer />
    </div>
  );
};

const Faqs = () => {
  const [activeTab, setActiveTab] = useState(1);

  const toggleTab = (tab) => {
    if (activeTab === tab) {
      setActiveTab(0);
    } else {
      setActiveTab(tab);
    }
  };

  return (
    <div className={`${styles.section} my-8`}>
      <h2 className="text-3xl font-bold text-gray-900 mb-8">FAQ</h2>
      <div className="mx-auto space-y-4">
        {/* SINGLE FAQ */}
        {faqs &&
          faqs.map((faq, index) => (
            <div className="border-b border-gray-200 pb-4" key={index}>
              <button
                className="flex items-center justify-between w-full"
                onClick={() => toggleTab(index + 1)}
              >
                <span className="text-lg font-medium text-gray-900">
                  {faq.question}
                </span>
                {activeTab === index + 1 ? (
                  <CrossIcon className="w-8 h-8" />
                ) : (
                  <RightArrowIcon className="w-8 h-8" />
                )}
              </button>
              <AnimatePresence>
                {activeTab === index + 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: "-5px" }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: "-5px" }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mt-4 w-full">
                      <p className="text-base text-gray-500">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FAQPage;
