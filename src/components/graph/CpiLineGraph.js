import React, { useEffect, useState } from 'react';
import { Line } from '@ant-design/charts';
import axios from 'axios'
import BaseBarGraph from './StatisticBarGraph/BarBaseGraph';
import { Select } from 'antd';
import BaseLineGraph from './LineGraph/BaseLineGraph';
import '../css/LineGraph.css'
import CanvasDemo from './Canvas/CanvasDemo';

const LineGraph = (props) => {
  const [data, setData] = useState(Array.from({ length: 30 }, (x, i) => ({ year: 2000 + i, value: Math.random() })))
  const [config, setConfig] = useState({
    data: data,
    height: 300,
    xField: 'month',
    yField: 'cpi_data',
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
    title: "Biểu đồ chỉ số giá tiêu dùng"
  })
  let [responseData, setResponseData] = React.useState('');
  const fetchData = React.useCallback(() => {
    axios({
      "method": "GET",
      "url": "https://aic-group.bike/api/v1/dong-nai/cpies",
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
        let data = []
        cpi[0].val.forEach((val, index) => {
          data.push({
            month: timeline[index],
            cpi_data: parseFloat((parseFloat(val) - 100).toFixed(2))
          })
        })
        // setData(data)
        setData(data)
        let barData = {
          timeline: timeline,
          data: [
            { name: "Dữ liệu cpi", data: data.map(val => val.cpi_data) }
          ]
        }
        setConfig({ ...config, data, barData: barData })
        console.log('cpi data', data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  React.useEffect(() => {
    fetchData()
  }, [fetchData])
  const [graphType, setGraphType] = useState("line")
  return (
    <div style={{ width: "100%", textAlign: "center", display: "inline-block", }}>
      <div className="graph-area">
        <Select defaultValue={graphType} onChange={setGraphType} style={{ float: "right", margin: "5px", backgroundColor: "red" }}>
          <Select value="line" >Biểu đồ đường</Select>
          <Select value="bar" >Biểu đồ cột</Select>
        </Select>
        <div style={{ clear: 'both' }}>
          <div className="line-graph">
            {(graphType === 'line') && <Line {...config} />}
            {(graphType === 'bar') && <CanvasDemo {...config} />}
          </div>
          {/* {(graphType === 'bar') && <BaseBarGraph {...config} />} */}
        </div>
      </div>
    </div>
  )
};
export default LineGraph;