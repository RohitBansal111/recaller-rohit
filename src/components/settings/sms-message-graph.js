import Chart from "react-apexcharts";

const SMSMessageGraph = (props) => {
  const chartData = {
    chart: {
      type: "line",
      id: "apexchart-example",
    },
    xaxis: {
      categories: [
        "jan",
        "feb",
        "mar",
        "apr",
        "may",
        "jun",
        "july",
        "aug",
        "sep",
        "oct",
        "nov",
        "dec",
      ],
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: undefined,
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 100],
      },
    },
    legend: {
      width: 400,
    },
    series: [
      {
        name: "Sent",
        type: "column",
        data: [
          props.messageData && props.messageData.sentMessageCount,
          40,
          60,
          59,
          93,
          290,
          400,
        ],
      },
      {
        name: "Received",
        type: "column",
        data: [
          props.messageData && props.messageData.recieveMessageCount,
          40,
          65,
          120,
          260,
        ],
      },
    ],
  };

  return (
    <div className="common-graph-section">
      <Chart
        options={chartData}
        series={chartData.series}
        type="bar"
        height={320}
      />
    </div>
  );
};

export default SMSMessageGraph;
