import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const BarChart = (props) => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "App Usage(in mins)",
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
      },
      {
        name: "Good Posture Progress(%)",
        data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "45%",
          endingShape: "rounded",
          borderRadius: 10,
        },
      },
      dataLabels: {
        enabled: true,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: [
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
        ],
      },
      //   yaxis: {
      //     title: {
      //       text: "$ (thousands)",
      //     },
      //   },
      fill: {
        opacity: 1,
      },
      colors: ["#352DFF", "rgba(53, 45, 255, 0.45)"],

      tooltip: {
        y: {
          formatter: function (val) {
            return val;
          },
        },
      },
    },
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={350}
        />
      </div>
    </div>
  );
};

export default BarChart;
