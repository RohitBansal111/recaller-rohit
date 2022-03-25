import Chart from 'react-apexcharts'

const SMSMessageGraph = () => {

  const chartData = {
    chart: {
      type: "line",
      id: "apexchart-example"
    },
    xaxis: {
      categories: ['Sept', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May']
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 100]
        // colorStops: []
      }
    },
    legend: {
      // position: '',
      width: 400
      // position: 'top',
    },
    series: [
      {
        name: "Sent",
        type: "column",
        data: [440, 505, 414, 571, 227, 413, 201, 352, 652, 320, 257, 160]
      },
      {
        name: "Received",
        type: "column",
        data: [23, 42, 35, 27, 43, 22, 17, 31, 42, 22, 12, 16]
      }
    ]
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
  )
}

export default SMSMessageGraph