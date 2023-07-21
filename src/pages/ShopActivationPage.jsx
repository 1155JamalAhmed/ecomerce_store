import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../server";
import styles from "../styles/styles";

const ShopActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (activation_token) {
      const activationEmail = async () => {
        try {
          await axios.post(
            `${server}/shops/activation`,
            {
              activation_token: activation_token,
            },
            { withCredentials: true }
          );
          setTimeout(() => {
            window.location.replace("/");
          }, 6000);
          setIsLoading(false);
        } catch (err) {
          console.log("err", err);
          setError("Either link is expired or has been used");
          setIsLoading(false);
        }
      };

      activationEmail();
    }
  }, [activation_token]);

  return (
    <div className={`${styles.normalFlex} justify-center w-full min-h-screen`}>
      {isLoading ? null : (
        <div className="inline-block">
          {error && <p>{error}</p>}
          {!error && (
            <p>"Your account is verified, redirecting to home page..."</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ShopActivationPage;
