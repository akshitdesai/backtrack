import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const BarChart = (props) => {

  console.log("Categories ",props.categories);
  console.log("series ", props.series);
  const [series, setSeries] = React.useState(props.series);

  const [chartData, setChartData] = useState({
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
          borderRadius: 7,
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
        categories:props.categories
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
          series={series}
          type="bar"
          height={500}
          width={"100%"}
        />
      </div>
    </div>
  );
};

export default BarChart;
