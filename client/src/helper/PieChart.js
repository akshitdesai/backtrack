import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const PieChart = () => {
  const [series, setSeries] = useState([70]);
  const [options, setOptions] = useState({
    chart: {
      height: 350,
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: "65%",
        },
        dataLabels: {
          show: true,
          name: {
            show: true,
            fontSize: "18px",
            fontFamily: undefined,
            fontWeight: 600,
            color: undefined,
            offsetY: -10,
          },
          value: {
            show: true,
            fontSize: "22px",
            fontFamily: "Inter",
            fontWeight: 500,
            color: undefined,
            offsetY: 16,
            formatter: function (val) {
              return val + "%";
            },
          },
        },
      },
    },

    colors: ["#352DFF"],
    labels: ["Good Posture"],
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="radialBar"
          height={250}
          width={250}
        />
      </div>
    </div>
  );
};

export default PieChart;
