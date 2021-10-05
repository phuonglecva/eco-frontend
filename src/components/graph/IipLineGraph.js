import React, { useEffect, useState } from 'react';
import { Line } from '@ant-design/charts';
import axios from 'axios'
import { Select } from 'antd'
import BaseBarGraph from './StatisticBarGraph/BarBaseGraph';
import BaseLineGraph from './LineGraph/BaseLineGraph';
import '../css/LineGraph.css';
import CanvasDemo from './Canvas/CanvasDemo';

const IipLineGraph = (props) => {
  const [data, setData] = useState(Array.from({ length: 30 }, (x, i) => ({ year: 2000 + i, value: Math.random() })))
  const [config, setConfig] = useState({
    data,
    height: 300,
    xField: 'month',
    yField: 'iip_data',
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
    title: "Biểu đồ chỉ số sản xuất công nghiệp"
  })
  let [responseData, setResponseData] = React.useState('');
  const fetchData = React.useCallback(() => {
    axios({
      "method": "GET",
      "url": "https://aic-group.bike/api/v1/dong-nai/iips",
      "headers": {
        "content-type": "application/json",
      }, "params": {
        "language_code": "en"
      }
    })
      .then((response) => {
        setResponseData(response.data)
        const d = response.data
        const { iip, timeline } = d.data
        let data = []
        iip.forEach((val, index) => {
          data.push({
            month: timeline[index],
            iip_data: parseFloat(val)
          })
        })
        // setData(data)
        setData(data)
        let barData = {
          timeline: timeline,
          data: [
            { name: "Chỉ số iip", data: data.map(val => val.iip_data) }
          ]
        }
        setConfig({ ...config, data, barData })
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
    <div style={{ width: "100%", textAlign: "center" }}>
      <div className="graph-area" >

        <Select defaultValue={graphType} onChange={setGraphType} style={{ float: "right", margin: "5px" }}>
          <Select value="line">Biểu đồ đường</Select>
          <Select value="bar">Biểu đồ cột</Select>
        </Select>
        <div style={{ clear: 'both' }}>
          {/* {(graphType === 'line') && <BaseLineGraph {...config} />} */}
          {/* {(graphType === 'bar') && <BaseBarGraph {...config} />} */}
          <div className="line-graph">
            {(graphType === 'line') && <Line {...config} />}
            {(graphType === 'bar') && <CanvasDemo {...config} />}
          </div>
        </div>
      </div>
    </div>
  )
};
export default IipLineGraph;