import React, { useEffect, useState } from 'react';
import { Line } from '@ant-design/charts';
import axios from 'axios'
import { Select } from 'antd';
import BaseBarGraph from './StatisticBarGraph/BarBaseGraph';
import BaseLineGraph from './LineGraph/BaseLineGraph';
import CanvasDemo from './Canvas/CanvasDemo';

const ImportLineGraph = (props) => {
  const [data, setData] = useState(Array.from({ length: 30 }, (x, i) => ({ year: 2000 + i, value: Math.random() })))
  const [config, setConfig] = useState({
    data,
    height: 300,
    xField: 'month',
    yField: 'value',
    label: false,
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
        style: { fontSize: 16 },
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
        text: "Giá trị (tỷ đồng)",
        style: { fontSize: 16 },
      }
    },
    slider: {},
    barData: {
      timeline: [],
      data: []
    },
    title: props.title
  })
  let [responseData, setResponseData] = React.useState('');
  const fetchData = React.useCallback(() => {
    axios({
      "method": "GET",
      "url": "https://aic-group.bike/api/v1/dong-nai/import",
      "headers": {
        "content-type": "application/json",
      }, "params": {
        "language_code": "en"
      }
    })
      .then((response) => {
        setResponseData(response.data)
        const d = response.data
        const { timeline, total_import } = d.data
        let data = []
        total_import.value.forEach((value, index) => {
          data.push({
            month: timeline[index],
            value: value
          })
        })
        setData(data)
        let barData = {
          timeline,
          data: [
            { name: "Kim ngạch nhập khẩu", data: data.map((val) => val.value) }
          ]
        }
        setConfig({ ...config, data, barData })
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
      <div className="graph-area">
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
export default ImportLineGraph;