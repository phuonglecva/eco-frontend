import React, { useEffect, useState } from 'react';
import { Line } from '@ant-design/charts';
import axios from 'axios'
import BaseBarGraph from './StatisticBarGraph/BarBaseGraph';
import { Button, Radio, Select } from 'antd';
import BaseLineGraph from './LineGraph/BaseLineGraph';
import '../css/LineGraph.css'
import CanvasDemo from './Canvas/CanvasDemo';
import { Modal } from 'antd'
import { configConsumerProps } from 'antd/lib/config-provider';

const generateCompareConfig = (data) => {
  let newData = data.map((value) => {
    return { ...value, value: parseFloat(value.value + Math.random() *3), cat: "Cả nước", key: 1 }
  })

  return {
    data: [...data, ...newData],
    xField: "month",
    yField: "value",
    seriesField: "cat",
    yAxis: {
      label: {
        formatter: function formatter(v) {
          return ''.concat(v).replace(/\d{1,3}(?=(\d{3})+$)/g, function (s) {
            return ''.concat(s, ',');
          });
        },
      },
    },
    color: ['#1979C9', '#D62A0D', '#FAA219'],
    slider: {}
  }
}

const LineGraph = (props) => {
  const [data, setData] = useState(Array.from({ length: 30 }, (x, i) => ({ year: 2000 + i, value: Math.random() })))
  const [barData, setBarData] = useState()
  const [subData, setSubData] = useState([])
  const [checkList, setCheckList] = useState([])
  const [compareConfig, setCompareConfig] = useState([])

  const [config, setConfig] = useState({
    data: data,
    height: 300,
    xField: 'month',
    yField: 'value',
    seriesField: "cat",
    point: {
      size: 3,
      shape: 'diamond',
      style: {
        fill: 'white',
        stroke: '#5B8FF9',
        lineWidth: 2,
      },
    },
    xAxis: {
      grid: {
        line: {
          style: {
            stroke: '#ddd',
            lineDash: [4, 2],
          },
        },
        alternateColor: 'rgba(0,0,0,0.05)',
      },
      title: {
        text: "Tháng",
        style: { fontSize: 10 },
      }
    },
    yAxis: {
      grid: {
        line: {
          style: {
            stroke: '#ddd',
            lineDash: [4, 2],
          },
        },
        alternateColor: 'rgba(0,0,0,0.05)',
      },
      title: {
        text: "Giá trị (%)",
        style: { fontSize: 12 },
      }
    },
    slider: {},
    label: true,
    barData: {
      timeline: [],
      data: []
    },
    title: "Biểu đồ chỉ số giá tiêu dùng",
    tooltip: {
      // showCrosshairs:true
    }
  })
  let [responseData, setResponseData] = React.useState(null);
  const fetchData = React.useCallback(() => {
    axios({
      "method": "GET",
      // "url": "https://aic-group.bike/api/v1/dong-nai/cpies",
      "url": `${process.env.REACT_APP_API_URL}/cpies`,
      "headers": {
        "content-type": "application/json",
      }, "params": {
        "language_code": "en"
      }
    })
      .then((response) => {
        setResponseData(response.data)
        const d = response.data
        const { cpi, timeline } = d.data
        setSubData(cpi)
        let checkList = (Array.from({ length: cpi.length }, i => false))
        checkList[0] = true
        setCheckList(checkList)
        let data = []

        for (let idx = 0; idx < cpi.length; idx++) {

          let tempData = cpi[idx]
          let cat_name = tempData.name
          let val = tempData.val
          for (let i = 0; i < timeline.length; i++) {
            let ti = timeline[i]
            data.push({
              month: ti,
              cat: cat_name,
              value: parseFloat((parseFloat(val[i]) - 100).toFixed(2)),
              key: idx
            })
          }
        }
        setData(data)
        let barData = {
          timeline: timeline,
          // data: [
          //   { name: "Dữ liệu cpi", data: data.map(val => val.cpi_data) },
          // ]
          data: cpi.map((value, index) => ({
            name: value.name,
            data: value.val.map((val) => parseFloat((parseFloat(val) - 100).toFixed(2))),
            key: index
          }))
        }
        setBarData(barData)
        const defaultData = data.filter((val) => val.key === 0)
        const defaultBarData = barData.data.filter((val) => val.key === 0)
        // setCheckList(checkList.map((_, id)=> id == 0))
        setConfig({ ...config, data: defaultData, barData: { ...barData, data: defaultBarData } })

        // set compare config for data
        let compareConfig = generateCompareConfig(defaultData)
        setCompareConfig(compareConfig)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])


  React.useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <BaseLineGraph
      title="Chỉ số giá tiêu dùng"
      subData={subData}
      config={config}
      setConfig={setConfig}
      data={data}
      barData={barData}
      checkList={checkList}
      setCheckList={setCheckList}
      compareConfig={compareConfig}
    />
  )
};
export default LineGraph;