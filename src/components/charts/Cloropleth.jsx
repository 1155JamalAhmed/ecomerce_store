import { ResponsiveChoropleth } from "@nivo/geo";
import worldCountries from "./data.json";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import Loader from "../layout/Loader";
import styles from "../../styles/styles";

const Choropleth = () => {
  const [orderStats, setOrderStats] = useState(null);
  const [orderStatsIsLoading, setOrderStatsIsLoading] = useState(true);
  const [orderStatsHasError, setOrderStatsHasError] = useState(null);

  useEffect(() => {
    axiosInstance
      .get("/shops/get-orders-on-city-by-shop", {
        withCredentials: true,
      })
      .then((res) => {
        setOrderStats(res.data.body);
      })
      .catch((err) => {
        setOrderStatsHasError(err.response.data.messsage);
      })
      .finally(() => {
        setOrderStatsIsLoading(false);
      });
  }, []);

  const smallWidth = useMediaQuery({
    maxWidth: 1050,
  });
  return (
    <>
      {orderStatsIsLoading && <Loader />}
      {orderStatsHasError && (
        <h1 className={`${styles.error}`}>{setOrderStatsHasError}</h1>
      )}
      {!orderStatsIsLoading && orderStats && (
        <ResponsiveChoropleth
          data={orderStats}
          features={worldCountries}
          margin={{ top: 40, right: 0, bottom: 50, left: 0 }}
          colors="nivo"
          domain={[0, 100]}
          unknownColor="#666666"
          label="properties.districts"
          valueFormat=".2s"
          projectionScale={800}
          projectionTranslation={[smallWidth ? -2 : -1.5, 2.2]}
          projectionRotation={[0, 0, 0]}
          enableGraticule={true}
          graticuleLineColor="#dddddd"
          borderWidth={0.5}
          borderColor="#152538"
          defs={[
            {
              id: "dots",
              type: "patternDots",
              background: "inherit",
              color: "#38bcb2",
              size: 4,
              padding: 1,
              stagger: true,
            },
            {
              id: "lines",
              type: "patternLines",
              background: "inherit",
              color: "#eed312",
              rotation: -45,
              lineWidth: 6,
              spacing: 10,
            },
            {
              id: "gradient",
              type: "linearGradient",
              colors: [
                {
                  offset: 0,
                  color: "#000",
                },
                {
                  offset: 100,
                  color: "inherit",
                },
              ],
            },
          ]}
          fill={[
            {
              match: {
                id: "Karachi",
              },
              id: "dots",
            },
            {
              match: {
                id: "Lahore",
              },
              id: "lines",
            },
            {
              match: {
                id: "Islamabad",
              },
              id: "gradient",
            },
          ]}
          legends={[
            {
              anchor: "bottom-left",
              direction: "column",
              justify: true,
              translateX: 20,
              translateY: -120,
              itemsSpacing: 0,
              itemWidth: 94,
              itemHeight: 18,
              itemDirection: "left-to-right",
              itemTextColor: "#444444",
              itemOpacity: 0.85,
              symbolSize: 18,
              effects: [
                {
                  on: "hover",
                  style: {
                    itemTextColor: "#000000",
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      )}
    </>
  );
};

export default Choropleth;
