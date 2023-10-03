import { Button } from "@mui/material";
import React from "react";
import styles from "../../../styles/styles";

const ShopWithDrawMoney = () => {
  return (
    <div className="h-[75vh] flex items-center justify-center flex-col">
      <h1 className={`${styles.profileHeading} mb-4`}>
        The request will be send to the admin
      </h1>
      <Button variant="contained" color="success">
        Submit a withdrawal request
      </Button>
    </div>
  );
};

export default ShopWithDrawMoney;
