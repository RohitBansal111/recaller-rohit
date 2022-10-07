import React, { useState, useEffect } from "react";
import { GetSubscriptionData } from "../../api/plans";
import { getSMSStatus } from "../../api/subscription";
import ReactApexChart from "react-apexcharts";
import { VoiceSMSGraph } from "../../api/graph";
import { BsChevronRight } from "react-icons/bs";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ChatBoot = (props) => {
  const [subData, setSubData] = useState({});
  const [mainData, setMainData] = useState([]);
  const [typeSelect, setTypeSelect] = useState("sms");
  const [substatus, setSubstatus] = useState({});
  const [dataseries, setDataSeries] = useState([]);
  const [dataOption, setDataOption] = useState([]);
  const [check, setCheck] = useState(false);
  const [typeCheck, setTypeCheck] = useState("sms");

  const series = [
    {
      name: "Text",
      data: [10, 100, 31, 65, 35, 55, 32, 50, 45],
    },
    {
      name: "MMS",
      data: [10, 100, 31, 65, 35, 55, 32, 50, 45],
    },
  ];

  const seriesvoice = [
    {
      name: "Voice",
      data: [10, 100, 31, 65, 35, 55, 32, 50, 45],
    },
  ];

  const options = {
    colors: ["#28dcbf", "#f7b924"],
    chart: {
      type: "bar",
      height: 650,
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      data: [
        {
          x: 1,
          y: 10000,
        },
        {
          x: 2,
          y: 10000,
        },
        {
          x: 3,
          y: 329,
        },
        {
          x: 4,
          y: 342,
        },
        {
          x: 5,
          y: 348,
        },
        {
          x: 6,
          y: 334,
        },
        {
          x: 7,
          y: 325,
        },
        {
          x: 8,
          y: 316,
        },
        {
          x: 9,
          y: 318,
        },
        {
          x: 10,
          y: 330,
        },
        {
          x: 11,
          y: 355,
        },
        {
          x: 12,
          y: 366,
        },
        {
          x: 13,
          y: 337,
        },
        {
          x: 14,
          y: 352,
        },
        {
          x: 15,
          y: 377,
        },
        {
          x: 16,
          y: 383,
        },
        {
          x: 17,
          y: 344,
        },
        {
          x: 18,
          y: 366,
        },
        {
          x: 19,
          y: 389,
        },
        {
          x: 20,
          y: 334,
        },
      ],
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  };

  const handleSubData = async () => {
    let res = await GetSubscriptionData();
    if (res && res.data && res.status == 200) {
      setSubData(res?.data?.data);
    }
  };
  function percentage(partialValue, totalValue) {
    return (100 * partialValue) / totalValue;
  }
  const handleSubDataSMS = async () => {
    let res = await getSMSStatus();

    if (res && res.data && res.status == 200) {
      let smsTotel =
        Number(res?.data.massage?.deliver) +
        Number(res?.data.massage?.failed) +
        Number(res?.data.massage?.queued);
      let smsdeleverd = Number(res?.data.massage?.deliver);
      let smsFaild =
        Number(res?.data.massage?.failed) + Number(res?.data.massage?.queued);

      let mmsTotel =
        Number(res?.data.mms?.deliver) +
        Number(res?.data.mms?.failed) +
        Number(res?.data.mms?.queued);
      let mmsdeleverd = Number(res?.data.mms?.deliver);
      let mmsFaild =
        Number(res?.data.mms?.failed) + Number(res?.data.mms?.queued);
      // setSubData(res?.data?.data);
      setSubstatus({
        ...substatus,
        sms: {
          deliver: percentage(smsdeleverd, smsTotel).toFixed(1),
          failed: percentage(smsFaild, smsTotel).toFixed(1),
        },
        mms: {
          deliver: percentage(mmsdeleverd, mmsTotel).toFixed(1),
          failed: percentage(mmsFaild, mmsTotel).toFixed(1),
        },
      });
    }
  };
  const handleGetData = async () => {
    let res = await VoiceSMSGraph();
    if (res && res.data && res.data.status == 200) {
      setMainData(res.data);

      if (window.location.pathname == "/text") {
        const smsSeriess = [
          {
            name: "Text",
            data: res?.data?.smsData?.series || [0],
          },
          {
            name: "MMS",
            data: res?.data?.mmsData?.series || [0],
          },
        ];

        options.xaxis.data = res?.data?.smsData?.option;
        setDataOption(options);
        setDataSeries(smsSeriess);
        setCheck(true);
      } else {
        const smsSeriess = [
          {
            name: "Voice",
            data: res?.data?.voiceData?.series || [0],
          },
        ];
        options.xaxis.data = res.data?.smsData?.option;
        setDataOption(options);
        setDataSeries(smsSeriess);
        setCheck(true);
      }
    }
  };

  useEffect(() => {
    if (window.location.pathname == "/voice") {
      setTypeCheck("voice");
    }
    handleGetData();
    handleSubData();
    handleSubDataSMS();
  }, []);

  const handeChangedata = (type) => {
    if (type == "voice") {
      const smsSeriess = [
        {
          name: "Voice",
          data: mainData?.voiceData?.series || [0],
        },
      ];

      options.xaxis.data = mainData?.smsData?.option;
      setDataOption(options);
      setDataSeries(smsSeriess);
      setCheck(true);
    } else {
      const smsSeriess = [
        {
          name: "Text",
          data: mainData?.smsData?.series || [0],
        },
        {
          name: "MMS",
          data: mainData?.mmsData?.series || [0],
        },
      ];

      options.xaxis.data = mainData?.smsData?.option;
      setDataOption(options);
      setDataSeries(smsSeriess);
      setCheck(true);
    }
  };
  return (
    <>
      {/* Monthly credit usage column start */}
      <div className="monthly-credit-use">
        <h1>
          {typeCheck == "sms" ? "Text And MMS" : "Voice"} Credits Deployed
          <div
            style={{
              color: "#797979",
              fontSize: "16px",
              marginRight: "30%",
            }}
          >
            {typeCheck == "sms"
              ? Number(subData?.sms_cridit) + Number(subData?.sms_topup_val) ||
                0
              : Number(subData?.voice_cridit) +
                  Number(subData?.voice_topup_val) || 0}
          </div>{" "}
          <button
            className="downarrow"
            onClick={() => {
              if (typeCheck == "sms") {
                setTypeCheck("voice");
                handeChangedata("voice");
              } else {
                setTypeCheck("sms");
                handeChangedata("sms");
              }
            }}
          >
            <BsChevronRight />
          </button>
        </h1>

        <div className="monthly-set" style={{ width: "140%" }}>
          <div className="monthly-graph">
            {
              // <Chart options={options} series={series} type="area" />
            }
            {/* check */}
            {check ? (
              <ReactApexChart
                options={dataOption}
                series={dataseries}
                type="area"
                height={350}
              />
            ) : (
              <ReactApexChart
                options={options}
                series={
                  window.location.pathname == "/text" ? series : seriesvoice
                }
                type="area"
                height={350}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBoot;
