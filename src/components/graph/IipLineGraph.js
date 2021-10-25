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
  const [barData, setBarData] = useState()
  const [subData, setSubData] = useState([])
  const [checkList, setCheckList] = useState([])
  const title = "Chỉ số sản xuất toàn ngành công nghiệp"

  const [config, setConfig] = useState({
    data,
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
    title: "Biểu đồ chỉ số sản xuất công nghiệp"
  })
  let [responseData, setResponseData] = React.useState('');
  const fetchData = React.useCallback(() => {
    axios({
      "method": "GET",
      // "url": "https://aic-group.bike/api/v1/dong-nai/iips",
      "url": `${process.env.REACT_APP_API_URL}/iips`,
      "headers": {
        "content-type": "application/json",
      }, "params": {
        "language_code": "en"
      }
    })
      .then((response) => {
        setResponseData(response.data)
        const d = response.data
        const { iip, timeline, subs } = d.data
        const subData = [{
          name: "Chỉ số sản xuất toàn ngành công nghiệp",
          val: iip
        }]
        subs.forEach((val, id) => {
          subData.push({
            name: val.name,
            val: val.value
          })
        })
        setSubData(subData)
        let checkList = (Array.from({ length: subs.length }, i => false))
        checkList = [true, ...checkList]
        setCheckList(checkList)

        let data = []
        iip.forEach((val, index) => {
          data.push({
            month: timeline[index],
            value: parseFloat(val),
            cat: title,
            key: 0
          })
        })

        subs.forEach((sub, idx) => {
          sub.value.forEach((val, id) => {
            data.push({
              month: timeline[id],
              value: parseFloat(val),
              cat: sub.name,
              key: idx + 1
            })
          })
        })
        setData(data)
        let barData = {
          timeline: timeline,
          // data: [
          //   { name: "Chỉ số iip", data: data.map(val => val.value) }
          // ]
          data: [
            {
              name: title,
              data: iip,
              key: 0

            }
          ]
        }

        subs.forEach((sub, idx) => {
          barData.data.push({
            name: sub.name,
            data: sub.value,
            key: idx + 1
          })
        })
        setBarData(barData)

        // set default data
        const defaultData = data.filter((val) => val.key === 0)
        const defaultBarData = barData.data.filter((val) => val.key === 0)
        setConfig({ ...config, data: defaultData, barData: { ...barData, data: defaultBarData } })
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  React.useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    // <div style={{ width: "100%", textAlign: "center" }}>
    //   <div className="graph-area" >

    //     <Select defaultValue={graphType} onChange={setGraphType} style={{ float: "right", margin: "5px" }}>
    //       <Select value="line">Biểu đồ đường</Select>
    //       <Select value="bar">Biểu đồ cột</Select>
    //     </Select>
    //     <div style={{ clear: 'both' }}>
    //       {/* {(graphType === 'line') && <BaseLineGraph {...config} />} */}
    //       {/* {(graphType === 'bar') && <BaseBarGraph {...config} />} */}
    //       <div className="line-graph">
    //         {(graphType === 'line') && <Line {...config} />}
    //         {(graphType === 'bar') && <CanvasDemo {...config} />}
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <BaseLineGraph
      title="Chỉ số sản xuất công nghiệp"
      subData={subData}
      config={config}
      setConfig={setConfig}
      data={data}
      barData={barData}
      checkList={checkList}
      setCheckList={setCheckList}
      compareConfig={config}
    />
  )
};
export default IipLineGraph;