import React, { useState, useEffect } from 'react'
import { Line } from '@ant-design/charts';
const BaseCompareGraph = (props) => {
  // const [config, setConfig] = useState({})

  const [data, setData] = useState([])
  const asyncFetch = () => {
    let tempData = props.config.data
    let newData = tempData.map((value)=>{
      return {...value, value: value.value , cat:"Cả nước", key:1}
    })
    console.log(newData)
    console.log(tempData)
    setData([...newData, ...tempData])
  };
  useEffect(()=>{
    asyncFetch()
  }, [])
  var config = {
    data: data,
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
  };
  return <Line {...config} />;
};


export default BaseCompareGraph;