import React, { useEffect, useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import axiosInstance from "../../utils/axiosInstance";
import Loader from "../layout/Loader";
import styles from "../../styles/styles";

const BarChart = () => {
  const [orderStats, setOrderStats] = useState(null);
  const [orderStatsIsLoading, setOrderStatsIsLoading] = useState(true);
  const [orderStatsHasError, setOrderStatsHasError] = useState(null);

  useEffect(() => {
    axiosInstance
      .get("/shops/get-order-stats-of-6-month-by-shop", {
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

  return (
    <>
      {orderStatsIsLoading && <Loader />}
      {orderStatsHasError && (
        <h1 className={`${styles.error}`}>{setOrderStatsHasError}</h1>
      )}
      {!orderStatsIsLoading && orderStats && (
        <ResponsiveBar
          data={orderStats}
          indexBy="month"
          keys={["totalOrders"]}
          groupMode="grouped"
          layout="vertical"
          maxValue={orderStats.length + 10}
          valueScale={{ type: "linear" }}
          indexScale={{ type: "band", round: true }}
          enableLabel={false}
          padding={0.4}
          margin={{ top: 10, right: 50, bottom: 50, left: 50 }}
          colors={{ scheme: "purpleRed_green" }}
          //   defs={[
          //     {
          //       id: "dots",
          //       type: "patternDots",
          //       background: "inherit",
          //       color: "#38bcb2",
          //       size: 4,
          //       padding: 1,
          //       stagger: true,
          //     },
          //   ]}
          //   fill={[
          //     {
          //       match: {
          //         id: "totalOrders",
          //       },
          //       id: "dots",
          //     },
          //   ]}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 30,
            legend: `Year ${"2022"}`,
            legendPosition: "middle",
            legendOffset: 38,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Orders",
            legendPosition: "middle",
            legendOffset: -40,
          }}
          theme={{
            axis: {
              domain: {
                line: {
                  stroke: "#777777",
                  strokeWidth: 2,
                },
              },
              legend: {
                text: {
                  fontSize: 14,
                  fill: "#000000",
                  outlineWidth: 0,
                  outlineColor: "transparent",
                },
              },
              ticks: {
                line: {
                  stroke: "#777777",
                  strokeWidth: 1,
                },
                text: {
                  fontSize: 12,
                  fill: "#333333",
                  outlineWidth: 0,
                  outlineColor: "transparent",
                },
              },
            },
            grid: {
              line: {
                stroke: "#dddddd",
                strokeWidth: 1,
              },
            },
            tooltip: {
              container: {
                background: "#ffffff",
                fontSize: 16,
              },
              basic: {},
              chip: {},
              table: {},
              tableCell: {},
              tableCellValue: {},
            },
          }}
        />
      )}
    </>
  );
};

export default BarChart;
