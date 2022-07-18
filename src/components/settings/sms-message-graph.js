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
          props.messageData && props.messageData.January,
          props.messageData && props.messageData.February,
          props.messageData && props.messageData.March,
          props.messageData && props.messageData.April,
          props.messageData && props.messageData.may,
          props.messageData && props.messageData.June,
          props.messageData && props.messageData.july,
          props.messageData && props.messageData.August,
          props.messageData && props.messageData.September,
          props.messageData && props.messageData.October,
          props.messageData && props.messageData.November,
          props.messageData && props.messageData.December,
        ],
      },
      {
        name: "Received",
        type: "column",
        data: [],
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
